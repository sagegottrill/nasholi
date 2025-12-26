import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
}

interface Order {
  id: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: any;
  notes: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

interface OrderItem {
  id: string;
  product_id: number;
  product_title: string;
  product_image: string | null;
  quantity: number;
  price_per_unit: number;
  total: number;
}

interface PaymentMethod {
  id: string;
  card_brand: string;
  last_four: string;
  exp_month: number;
  exp_year: number;
  cardholder_name: string | null;
  is_default: boolean;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }
    return { data, error };
  };

  const getOrders = async (): Promise<Order[]> => {
    if (!user) return [];

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return orders || [];
  };

  const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (error) {
      console.error('Error fetching payment methods:', error);
      return [];
    }
    return data || [];
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('payment_methods')
      .insert({ ...method, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const deletePaymentMethod = async (id: string) => {
    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', id);

    return { error };
  };

  const setDefaultPaymentMethod = async (id: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    // First, unset all defaults
    await supabase
      .from('payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);

    // Then set the new default
    const { error } = await supabase
      .from('payment_methods')
      .update({ is_default: true })
      .eq('id', id);

    return { error };
  };

  const saveCart = async (items: CartItem[]) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('saved_carts')
      .upsert({
        user_id: user.id,
        items: items,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })
      .select()
      .single();

    return { data, error };
  };

  const loadCart = async (): Promise<CartItem[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('saved_carts')
      .select('items')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return [];
    return data.items as CartItem[];
  };

  const createOrder = async (
    items: CartItem[],
    shippingAddress: any,
    notes?: string
  ) => {
    if (!user) return { error: new Error('Not authenticated') };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 500 ? 0 : 25;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        status: 'pending',
        subtotal,
        shipping,
        tax,
        total,
        shipping_address: shippingAddress,
        notes
      })
      .select()
      .single();

    if (orderError || !order) {
      return { error: orderError };
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_title: item.title,
      product_image: item.image,
      quantity: item.quantity,
      price_per_unit: item.price,
      total: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return { error: itemsError };
    }

    // Clear saved cart
    await supabase
      .from('saved_carts')
      .delete()
      .eq('user_id', user.id);

    return { data: order, error: null };
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    getOrders,
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    saveCart,
    loadCart,
    createOrder,
    refreshProfile: () => user && fetchProfile(user.id)
  };
}

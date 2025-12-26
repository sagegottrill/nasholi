import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Package,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Phone,
  Building,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Star,
  Plus,
  Eye
} from 'lucide-react';

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

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  updateProfile: (updates: Partial<Profile>) => Promise<any>;
  getOrders: () => Promise<Order[]>;
  getPaymentMethods: () => Promise<PaymentMethod[]>;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<any>;
  deletePaymentMethod: (id: string) => Promise<any>;
  setDefaultPaymentMethod: (id: string) => Promise<any>;
  signOut: () => Promise<any>;
}

type Tab = 'profile' | 'orders' | 'payments';

const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose,
  profile,
  updateProfile,
  getOrders,
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  signOut
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);

  // Profile form state
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'USA'
  });

  // New card form state
  const [cardForm, setCardForm] = useState({
    card_brand: 'Visa',
    last_four: '',
    exp_month: 1,
    exp_year: new Date().getFullYear() + 1,
    cardholder_name: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip_code: profile.zip_code || '',
        country: profile.country || 'USA'
      });
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen && activeTab === 'orders') {
      loadOrders();
    } else if (isOpen && activeTab === 'payments') {
      loadPaymentMethods();
    }
  }, [isOpen, activeTab]);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const loadPaymentMethods = async () => {
    setLoading(true);
    const data = await getPaymentMethods();
    setPaymentMethods(data);
    setLoading(false);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await updateProfile(formData);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
    setSaving(false);
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await addPaymentMethod({
      ...cardForm,
      is_default: paymentMethods.length === 0
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setShowAddCard(false);
      setCardForm({
        card_brand: 'Visa',
        last_four: '',
        exp_month: 1,
        exp_year: new Date().getFullYear() + 1,
        cardholder_name: ''
      });
      loadPaymentMethods();
      setMessage({ type: 'success', text: 'Card added successfully!' });
    }
    setSaving(false);
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Are you sure you want to remove this card?')) return;

    const { error } = await deletePaymentMethod(id);
    if (!error) {
      loadPaymentMethods();
    }
  };

  const handleSetDefault = async (id: string) => {
    const { error } = await setDefaultPaymentMethod(id);
    if (!error) {
      loadPaymentMethods();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCardIcon = (brand: string) => {
    return <CreditCard className="w-8 h-8 text-gray-400" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">{profile?.full_name || 'My Account'}</h2>
              <p className="text-sm text-gray-500">{profile?.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 border-r border-gray-100 p-4 flex flex-col">
            <nav className="space-y-1 flex-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Payment</span>
              </button>
            </nav>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Message */}
            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-xl text-sm mb-4 ${
                message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        value={formData.zip_code}
                        onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </form>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order History</h3>
                
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No orders yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your order history will appear here</p>
                  </div>
                ) : selectedOrder ? (
                  <div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Back to Orders
                    </button>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order #{selectedOrder.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        {selectedOrder.order_items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-lg">
                            {item.product_image && (
                              <img src={item.product_image} alt={item.product_title} className="w-12 h-12 rounded-lg object-cover" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.product_title}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price_per_unit.toFixed(2)}</p>
                            </div>
                            <p className="font-medium text-gray-900">${item.total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="text-gray-900">${selectedOrder.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Shipping</span>
                          <span className="text-gray-900">${selectedOrder.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tax</span>
                          <span className="text-gray-900">${selectedOrder.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Card
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  </div>
                ) : showAddCard ? (
                  <form onSubmit={handleAddCard} className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Add New Card</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Brand</label>
                        <select
                          value={cardForm.card_brand}
                          onChange={(e) => setCardForm({ ...cardForm, card_brand: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Visa">Visa</option>
                          <option value="Mastercard">Mastercard</option>
                          <option value="Amex">American Express</option>
                          <option value="Discover">Discover</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Last 4 Digits</label>
                        <input
                          type="text"
                          maxLength={4}
                          value={cardForm.last_four}
                          onChange={(e) => setCardForm({ ...cardForm, last_four: e.target.value.replace(/\D/g, '') })}
                          placeholder="1234"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Month</label>
                        <select
                          value={cardForm.exp_month}
                          onChange={(e) => setCardForm({ ...cardForm, exp_month: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Year</label>
                        <select
                          value={cardForm.exp_year}
                          onChange={(e) => setCardForm({ ...cardForm, exp_year: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardForm.cardholder_name}
                          onChange={(e) => setCardForm({ ...cardForm, cardholder_name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                        Save Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCard(false)}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : paymentMethods.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No payment methods saved</p>
                    <p className="text-sm text-gray-400 mt-1">Add a card for faster checkout</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
                      >
                        {getCardIcon(method.card_brand)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                              {method.card_brand} •••• {method.last_four}
                            </p>
                            {method.is_default && (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Expires {String(method.exp_month).padStart(2, '0')}/{method.exp_year}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.is_default && (
                            <button
                              onClick={() => handleSetDefault(method.id)}
                              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Set as default"
                            >
                              <Star className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCard(method.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove card"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

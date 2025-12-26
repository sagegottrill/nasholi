import React from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartDropdownProps {
    cartItems: CartItem[];
    user: any;
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onCheckout: () => void;
    onSignIn: () => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({
    cartItems,
    user,
    onUpdateQuantity,
    onRemove,
    onCheckout,
    onSignIn
}) => {
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Your Cart</h3>
            </div>
            {cartItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="max-h-64 overflow-y-auto">
                        {cartItems.map(item => (
                            <div key={item.id} className="p-4 flex items-center gap-3 border-b border-gray-50">
                                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                    <p className="text-sm text-gray-500">₦{item.price.toLocaleString()} each</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50">
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-600">Total</span>
                            <span className="font-bold text-gray-900">₦{cartTotal.toLocaleString()}</span>
                        </div>
                        {user ? (
                            <button
                                onClick={onCheckout}
                                className="w-full py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-semibold rounded-xl transition-colors"
                            >
                                Checkout
                            </button>
                        ) : (
                            <button
                                onClick={onSignIn}
                                className="w-full py-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-semibold rounded-xl transition-colors"
                            >
                                Sign In to Checkout
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

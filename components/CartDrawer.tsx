import React from 'react';
import { CartItem, ShippingMethod } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingMethod: ShippingMethod;
  setShippingMethod: (method: ShippingMethod) => void;
  canFreeShip: boolean;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  step: 'cart' | 'checkout' | 'success';
  onStartCheckout: () => void;
  onBackToCart: () => void;
  onPlaceOrder: () => void;
  orderNumber?: string;
  lastOrderItems?: CartItem[];
  lastOrderSummary?: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cartCount,
  subtotal,
  tax,
  shipping,
  total,
  shippingMethod,
  setShippingMethod,
  canFreeShip,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  step,
  onStartCheckout,
  onBackToCart,
  onPlaceOrder,
  orderNumber,
  lastOrderItems,
  lastOrderSummary,
}) => {
  const renderItems = (list: CartItem[]) => (
    <div className="space-y-4">
      {list.map((item) => (
        <div
          key={item.product.id}
          className="flex gap-4 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
        >
          <div className="h-20 w-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex-shrink-0">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 line-clamp-2">
              {item.product.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{item.product.category}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {formatPrice(item.product.price)}
              </span>
              {step !== 'success' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="h-8 w-8 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-gray-800 dark:text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="h-8 w-8 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={() => onRemoveItem(item.product.id)}
              className="text-gray-400 hover:text-rose-500 transition-colors"
              aria-label="Remove item"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );

  const summary = step === 'success' && lastOrderSummary
    ? lastOrderSummary
    : { subtotal, tax, shipping, total };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-lg bg-slate-50 dark:bg-slate-950 border-l border-gray-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {step === 'checkout' ? 'Checkout' : step === 'success' ? 'Order Confirmed' : 'Your Cart'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {step === 'success'
                  ? `Order ${orderNumber ?? ''}`
                  : `${cartCount} item${cartCount === 1 ? '' : 's'} in your cart`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-900 transition-all"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {step === 'success' ? (
              <div className="flex flex-col items-center text-center py-12">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <svg
                      className="h-10 w-10 text-emerald-500 animate-bounce-in"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-pulse" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                  Order placed successfully
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 max-w-xs">
                  We sent a confirmation email with your order details.
                </p>
                {orderNumber && (
                  <div className="mt-4 rounded-full border border-emerald-200 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-950/30 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    Order {orderNumber}
                  </div>
                )}
              </div>
            ) : items.length > 0 ? (
              renderItems(items)
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-slate-900 flex items-center justify-center mb-4">
                  <span className="text-2xl">Cart</span>
                </div>
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  Your cart is empty. Add something you love.
                </p>
              </div>
            )}

            {step === 'checkout' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                    placeholder="First name"
                  />
                  <input
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                    placeholder="Last name"
                  />
                </div>
                <input
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                  placeholder="Email"
                />
                <input
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                  placeholder="Shipping address"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                    placeholder="City"
                  />
                  <input
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                    placeholder="ZIP"
                  />
                  <select className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100">
                    <option>USA</option>
                    <option>Canada</option>
                    <option>UK</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">
                    Payment
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                      placeholder="Card number"
                    />
                    <input
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                      placeholder="Name on card"
                    />
                    <input
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                      placeholder="MM/YY"
                    />
                    <input
                      className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(summary.shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
                <span>Tax</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(summary.tax)}</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-slate-800" />
              <div className="flex items-center justify-between text-base font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>{formatPrice(summary.total)}</span>
              </div>
            </div>

            {step !== 'success' && (
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">
                  Shipping options
                </p>
                <div className="space-y-2">
                  {(['Standard', 'Express', 'Free'] as ShippingMethod[]).map((option) => {
                    const isDisabled = option === 'Free' && !canFreeShip;
                    return (
                      <label
                        key={option}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                          isDisabled
                            ? 'border-gray-100 dark:border-slate-800 text-gray-400 dark:text-slate-600'
                            : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:border-indigo-400 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            className="h-4 w-4 text-indigo-600"
                            checked={shippingMethod === option}
                            onChange={() => !isDisabled && setShippingMethod(option)}
                            disabled={isDisabled}
                          />
                          <span>{option}</span>
                        </div>
                        <span className="font-semibold">
                          {option === 'Standard' && '$6.99'}
                          {option === 'Express' && '$14.99'}
                          {option === 'Free' && 'Free'}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {!canFreeShip && (
                  <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
                    Free shipping unlocks when your subtotal is over $200.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="px-6 py-5 border-t border-gray-200 dark:border-slate-800 space-y-3">
            {step === 'cart' && (
              <>
                <button
                  onClick={onStartCheckout}
                  disabled={items.length === 0}
                  className="w-full rounded-2xl bg-gray-900 dark:bg-indigo-600 text-white font-semibold py-3.5 shadow-lg shadow-gray-900/10 dark:shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Checkout
                </button>
                <button
                  onClick={onClearCart}
                  disabled={items.length === 0}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3 text-sm font-semibold hover:border-rose-400 hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Cart
                </button>
              </>
            )}

            {step === 'checkout' && (
              <>
                <button
                  onClick={onPlaceOrder}
                  disabled={items.length === 0}
                  className="w-full rounded-2xl bg-emerald-500 text-white font-semibold py-3.5 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Place Order
                </button>
                <button
                  onClick={onBackToCart}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3 text-sm font-semibold hover:border-indigo-400"
                >
                  Back to Cart
                </button>
              </>
            )}

            {step === 'success' && (
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-gray-900 dark:bg-indigo-600 text-white font-semibold py-3.5 shadow-lg shadow-gray-900/10 dark:shadow-indigo-500/20"
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;

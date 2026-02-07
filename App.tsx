import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { MOCK_PRODUCTS } from './constants';
import { CartItem, Category, Product, ShippingMethod } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('Standard');
  const [orderNumber, setOrderNumber] = useState<string | undefined>(undefined);
  const [lastOrderItems, setLastOrderItems] = useState<CartItem[] | undefined>(undefined);
  const [lastOrderSummary, setLastOrderSummary] = useState<{
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  } | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const canFreeShip = subtotal >= 200;

  useEffect(() => {
    if (!canFreeShip && shippingMethod === 'Free') {
      setShippingMethod('Standard');
    }
  }, [canFreeShip, shippingMethod]);

  const shippingCost = useMemo(() => {
    if (shippingMethod === 'Free') return 0;
    if (shippingMethod === 'Express') return 14.99;
    return 6.99;
  }, [shippingMethod]);

  const tax = useMemo(() => subtotal * 0.085, [subtotal]);
  const total = useMemo(() => subtotal + shippingCost + tax, [subtotal, shippingCost, tax]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesWishlist = !showWishlistOnly || wishlist.includes(product.id);
      return matchesSearch && matchesCategory && matchesWishlist;
    });
  }, [searchQuery, selectedCategory, showWishlistOnly, wishlist]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-indigo-500/30">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        wishlistCount={wishlist.length}
        showWishlistOnly={showWishlistOnly}
        setShowWishlistOnly={setShowWishlistOnly}
        cartCount={cartCount}
        onOpenCart={() => {
          setCheckoutStep('cart');
          setIsCartOpen(true);
        }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <ProductGrid 
          products={filteredProducts} 
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          isWishlistMode={showWishlistOnly}
          onAddToCart={addToCart}
        />
      </main>

      <footer className="mt-20 border-t border-gray-200 dark:border-slate-900 bg-white dark:bg-slate-950/50 backdrop-blur-sm py-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">L</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white tracking-tight">LuxeStore</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} LuxeStore. Designed for the modern web.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm font-semibold">{social}</a>
            ))}
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        cartCount={cartCount}
        subtotal={subtotal}
        tax={tax}
        shipping={shippingCost}
        total={total}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        canFreeShip={canFreeShip}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        step={checkoutStep}
        onStartCheckout={() => setCheckoutStep('checkout')}
        onBackToCart={() => setCheckoutStep('cart')}
        onPlaceOrder={() => {
          if (cartItems.length === 0) return;
          const finalShippingMethod: ShippingMethod =
            !canFreeShip && shippingMethod === 'Free' ? 'Standard' : shippingMethod;
          const finalShippingCost =
            finalShippingMethod === 'Free' ? 0 : finalShippingMethod === 'Express' ? 14.99 : 6.99;
          if (finalShippingMethod !== shippingMethod) {
            setShippingMethod(finalShippingMethod);
          }
          const newOrder = `LS-${Date.now().toString().slice(-8)}`;
          setOrderNumber(newOrder);
          setLastOrderItems(cartItems);
          setLastOrderSummary({
            subtotal,
            tax,
            shipping: finalShippingCost,
            total: subtotal + finalShippingCost + tax,
          });
          setCartItems([]);
          setCheckoutStep('success');
        }}
        orderNumber={orderNumber}
        lastOrderItems={lastOrderItems}
        lastOrderSummary={lastOrderSummary}
      />
    </div>
  );
};

export default App;

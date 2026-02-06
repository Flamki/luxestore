import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, onToggleWishlist }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-[1/1] overflow-hidden bg-gray-50 dark:bg-slate-800/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
           <button 
            onClick={onToggleWishlist}
            className={`p-2.5 rounded-full shadow-sm transition-all duration-300 backdrop-blur-md active:scale-90 ${
              isWishlisted 
                ? 'bg-rose-500 text-white shadow-rose-500/20' 
                : 'bg-white/80 dark:bg-slate-900/80 text-gray-400 hover:text-rose-500'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
           >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? 'animate-bounce-in' : ''}`} 
                fill={isWishlisted ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            {product.category}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-slate-100 mb-1 line-clamp-2 min-h-[3rem] leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{formattedPrice}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-sm transition-all duration-300 transform active:scale-95 ${
            isAdded 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
              : 'bg-gray-900 dark:bg-indigo-600 text-white hover:bg-gray-800 dark:hover:bg-indigo-500 shadow-lg shadow-gray-900/10 dark:shadow-indigo-500/20'
          }`}
        >
          {isAdded ? (
            <>
              <svg className="w-5 h-5 animate-bounce-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Added!</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
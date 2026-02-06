import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlistMode: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  wishlist, 
  toggleWishlist, 
  isWishlistMode 
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-gray-100 dark:bg-slate-800 rounded-full p-6 mb-4">
          <svg className="h-12 w-12 text-gray-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
          {isWishlistMode ? 'Your wishlist is empty' : 'No products found'}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-slate-400 max-w-xs">
          {isWishlistMode 
            ? 'Start adding items you love to see them here!' 
            : 'Try adjusting your search or category filter to find what you\'re looking for.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 pb-20">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={() => toggleWishlist(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
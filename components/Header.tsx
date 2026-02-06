import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  wishlistCount: number;
  showWishlistOnly: boolean;
  setShowWishlistOnly: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  wishlistCount, 
  showWishlistOnly, 
  setShowWishlistOnly 
}) => {
  return (
    <header className="pt-10 pb-6 mb-8 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
            {showWishlistOnly ? 'My Wishlist' : 'Products'}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            {showWishlistOnly 
              ? `You have ${wishlistCount} item${wishlistCount === 1 ? '' : 's'} in your wishlist.`
              : 'Browse our collection of high-quality products curated just for you.'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            className={`relative p-2.5 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500 group ${
              showWishlistOnly 
                ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400' 
                : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm'
            }`}
            aria-label="View Wishlist"
          >
            <svg className={`w-5 h-5 transition-transform duration-300 ${showWishlistOnly ? 'scale-110' : 'group-hover:scale-110'}`} fill={showWishlistOnly ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950 animate-bounce-in">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, isRTL }) {
  if (totalPages <= 1) return null;

  const pages = [];
  // Simple logic: show all pages if <= 5. If > 5, show 1, 2 ... last.
  // For simplicity given the scope, let's just show standard list or a limited window.
  // We'll stick to a simple loop for now as we likely don't have many pages yet.
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-16 flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 font-bold border border-gray-200 dark:border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
      >
         <span className={`material-symbols-outlined text-sm ${isRTL ? 'rotate-180' : ''}`}>chevron_left</span>
      </button>

      {/* Pages */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full font-bold transition-all transform hover:scale-110 ${
            currentPage === page
              ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
              : 'bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-600 dark:text-gray-300 font-bold border border-gray-200 dark:border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
      >
        <span className={`material-symbols-outlined text-sm ${isRTL ? 'rotate-180' : ''}`}>chevron_right</span>
      </button>
    </div>
  );
}


import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.75.75v3.546a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zM12.75 8.663a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06-1.06l-2.25-2.25zM10.735 15.97a.75.75 0 00-1.06-1.06l-2.25 2.25a.75.75 0 101.06 1.06l2.25-2.25zM15 9.75a.75.75 0 01.75-.75h3.546a.75.75 0 010 1.5H15.75a.75.75 0 01-.75-.75zM14.03 13.735a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06-1.06l-2.25-2.25zM17.03 6.97a.75.75 0 00-1.06-1.06l-2.25 2.25a.75.75 0 001.06 1.06l2.25-2.25zM4.5 15a.75.75 0 01.75-.75h3.546a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75zM6.97 8.03a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06-1.06l-2.25-2.25z"
      clipRule="evenodd"
    />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center">
             <SparklesIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="ml-3 text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
              AI Product Replacement
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};


import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

const ButtonSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

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

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-transform transform hover:scale-105 duration-300"
    >
      {loading ? (
        <>
          <ButtonSpinner />
          Generating...
        </>
      ) : (
        <>
          <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
          Generate Image
        </>
      )}
    </button>
  );
};

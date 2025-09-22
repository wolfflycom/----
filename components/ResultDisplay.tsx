
import React from 'react';

const Spinner: React.FC = () => (
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto"></div>
);

const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


interface ResultDisplayProps {
  resultImage: string | null;
  loading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, loading }) => {
  return (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Result</h2>
        <div className="w-full max-w-2xl mx-auto aspect-square bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center justify-center">
            <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                {loading ? (
                <div className="flex flex-col items-center">
                    <Spinner />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">AI is generating your image...</p>
                </div>
                ) : resultImage ? (
                <img src={resultImage} alt="Generated result" className="max-w-full max-h-full object-contain rounded-md" />
                ) : (
                <div className="text-center text-gray-400 dark:text-gray-500">
                    <ImageIcon className="w-24 h-24 mx-auto" />
                    <p className="mt-4">Your generated image will appear here</p>
                </div>
                )}
            </div>
        </div>
    </div>
  );
};

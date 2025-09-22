
import React, { useState, useRef, useCallback } from 'react';

interface ImageUploaderProps {
  id: string;
  title: string;
  subtitle: string;
  onImageUpload: (base64: string) => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, subtitle, onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImage(base64);
        onImageUpload(base64);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const borderStyle = isDragging ? 'border-indigo-500' : 'border-gray-300 dark:border-gray-600';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>
      
      <label
        htmlFor={id}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full h-64 border-2 border-dashed ${borderStyle} rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out bg-gray-50 dark:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {image ? (
          <img src={image} alt={title} className="max-w-full max-h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-400 dark:text-gray-500">
            <UploadIcon className="w-12 h-12 mx-auto" />
            <p className="mt-2">Click or drag & drop an image</p>
          </div>
        )}
      </label>
    </div>
  );
};

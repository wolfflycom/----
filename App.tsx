
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { GenerateButton } from './components/GenerateButton';
import { editImage } from './services/geminiService';

const App: React.FC = () => {
  const [sceneImage, setSceneImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!sceneImage || !productImage) {
      setError('Please upload both a scene image and a product image.');
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const prompt = "将第二张图片里的饮料产品直接替换到第一张图片里的饮料图片。并保持第一种呈现的形式，包括角度等所有细节保持不变。";
      const generatedImage = await editImage(sceneImage, productImage, prompt);
      setResultImage(generatedImage);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [sceneImage, productImage]);
  
  const handleSceneImageUpload = (base64: string) => setSceneImage(base64);
  const handleProductImageUpload = (base64: string) => setProductImage(base64);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload a scene image and a product image. The AI will replace the product in the scene with your product, matching the angle, lighting, and style.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader 
              id="scene-image" 
              title="Scene Image" 
              subtitle="The background and context"
              onImageUpload={handleSceneImageUpload} 
            />
            <ImageUploader 
              id="product-image" 
              title="Product Image" 
              subtitle="The new product to insert"
              onImageUpload={handleProductImageUpload} 
            />
          </div>

          <div className="text-center mb-8">
            <GenerateButton
              onClick={handleGenerate}
              loading={loading}
              disabled={!sceneImage || !productImage}
            />
          </div>

          {error && (
            <div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <ResultDisplay 
            resultImage={resultImage}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

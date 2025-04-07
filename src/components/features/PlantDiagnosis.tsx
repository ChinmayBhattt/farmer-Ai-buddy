import { useState, useRef } from 'react';
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline';

const PlantDiagnosis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzePlant(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const analyzePlant = async (file: File) => {
    setIsAnalyzing(true);
    // TODO: Implement ML model integration
    // For now, we'll simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="flex justify-between items-center p-4 text-white">
        <button className="p-2">←</button>
        <div className="text-center">
          <h2>Take a picture</h2>
          <p className="text-sm opacity-80">Fit the crop damage within the frame</p>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {image ? (
          <img src={image} alt="Captured plant" className="max-w-full max-h-full object-contain" />
        ) : (
          <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <CameraIcon className="h-12 w-12 mx-auto mb-2" />
              <p>Tap to take a photo</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black">
        <div className="flex justify-around items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 text-white flex flex-col items-center"
          >
            <PhotoIcon className="h-8 w-8 mb-1" />
            <span className="text-sm">Gallery</span>
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 text-white"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full" />
            </div>
          </button>
          
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="hidden"
      />

      {isAnalyzing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-plantix-primary border-t-transparent" />
            <p className="mt-4 text-center">Analyzing your plant...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDiagnosis; 
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PestDisease {
  id: number;
  name: string;
  crop: string;
  image: string;
  symptoms: string;
  treatment: string;
}

const pestsData: PestDisease[] = [
  {
    id: 1,
    name: "Rice Blast",
    crop: "Rice",
    image: "🦠",
    symptoms: "Diamond-shaped lesions on leaves with dark borders",
    treatment: "Use resistant varieties, apply fungicides, maintain proper water management"
  },
  {
    id: 2,
    name: "Tomato Blight",
    crop: "Tomato",
    image: "🍅",
    symptoms: "Dark brown spots on leaves, fruits rot",
    treatment: "Rotate crops, remove infected plants, use copper-based fungicides"
  },
  {
    id: 3,
    name: "Aphids",
    crop: "Multiple",
    image: "🐛",
    symptoms: "Curled leaves, stunted growth, sticky residue",
    treatment: "Use insecticidal soap, introduce natural predators, neem oil spray"
  },
  {
    id: 4,
    name: "Wheat Rust",
    crop: "Wheat",
    image: "🌾",
    symptoms: "Orange-brown pustules on stems and leaves",
    treatment: "Plant resistant varieties, early sowing, fungicide application"
  },
  {
    id: 5,
    name: "Cotton Bollworm",
    crop: "Cotton",
    image: "🌿",
    symptoms: "Holes in bolls, damaged flowers",
    treatment: "Integrated pest management, biological control, proper timing of insecticides"
  }
];

const PestsAndDiseases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const filteredPests = pestsData.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || pest.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  const uniqueCrops = ['All', ...new Set(pestsData.map(pest => pest.crop))];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Pests & Diseases
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search pests or diseases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {uniqueCrops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        {/* Pests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredPests.map(pest => (
            <motion.div
              key={pest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{pest.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{pest.name}</h3>
                  <div className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm mb-2">
                    {pest.crop}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">Symptoms:</span> {pest.symptoms}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Treatment:</span> {pest.treatment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No pests or diseases found matching your search.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PestsAndDiseases; 
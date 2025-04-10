import { useState } from 'react';
import { motion } from 'framer-motion';

interface CropNPK {
  name: string;
  N: number;
  P: number;
  K: number;
}

const crops: CropNPK[] = [
  { name: 'Tomato', N: 120, P: 60, K: 80 },
  { name: 'Wheat', N: 120, P: 60, K: 40 },
  { name: 'Rice', N: 100, P: 50, K: 50 },
  { name: 'Cotton', N: 150, P: 70, K: 70 },
  { name: 'Potato', N: 140, P: 55, K: 95 },
  { name: 'Maize', N: 135, P: 65, K: 45 },
];

interface FertilizerResult {
  urea: number;
  dap: number;
  mop: number;
}

const FertilizerCalculator = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>(crops[0].name);
  const [fieldSize, setFieldSize] = useState<string>('');
  const [soilN, setSoilN] = useState<string>('');
  const [soilP, setSoilP] = useState<string>('');
  const [soilK, setSoilK] = useState<string>('');
  const [result, setResult] = useState<FertilizerResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateFertilizers = () => {
    setIsCalculating(true);

    // Get selected crop's NPK requirements
    const crop = crops.find(c => c.name === selectedCrop)!;
    const acres = parseFloat(fieldSize);

    if (!acres || isNaN(acres)) {
      alert('Please enter a valid field size');
      setIsCalculating(false);
      return;
    }

    // Calculate total NPK requirements
    let totalN = crop.N * acres;
    let totalP = crop.P * acres;
    let totalK = crop.K * acres;

    // Subtract soil nutrients if provided
    if (soilN) totalN = Math.max(0, totalN - parseFloat(soilN));
    if (soilP) totalP = Math.max(0, totalP - parseFloat(soilP));
    if (soilK) totalK = Math.max(0, totalK - parseFloat(soilK));

    // Calculate fertilizers based on their nutrient content
    // DAP first (since it contains both N and P)
    const dap = (totalP / 0.46); // DAP has 46% P
    const nFromDap = dap * 0.18; // DAP provides 18% N
    const urea = (totalN - nFromDap) / 0.46; // Remaining N from Urea (46% N)
    const mop = totalK / 0.60; // MOP has 60% K

    setResult({
      urea: Math.max(0, Math.round(urea)),
      dap: Math.max(0, Math.round(dap)),
      mop: Math.max(0, Math.round(mop))
    });

    setTimeout(() => setIsCalculating(false), 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Fertilizer Calculator
        </h2>

        <div className="space-y-4">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {crops.map(crop => (
                <option key={crop.name} value={crop.name}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Field Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Size (acres)
            </label>
            <input
              type="number"
              value={fieldSize}
              onChange={(e) => setFieldSize(e.target.value)}
              placeholder="Enter field size"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Optional Soil Values */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                N (optional)
              </label>
              <input
                type="number"
                value={soilN}
                onChange={(e) => setSoilN(e.target.value)}
                placeholder="Soil N"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                P (optional)
              </label>
              <input
                type="number"
                value={soilP}
                onChange={(e) => setSoilP(e.target.value)}
                placeholder="Soil P"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                K (optional)
              </label>
              <input
                type="number"
                value={soilK}
                onChange={(e) => setSoilK(e.target.value)}
                placeholder="Soil K"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateFertilizers}
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {isCalculating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="ml-2">Calculating...</span>
              </div>
            ) : (
              'Calculate Recommendation'
            )}
          </motion.button>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recommended Fertilizers
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-between min-h-[120px]">
                  <div className="text-base text-gray-600">Urea</div>
                  <div className="text-base font-semibold text-gray-800 break-all text-center w-full px-2">
                    {result.urea.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">kg</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-between min-h-[120px]">
                  <div className="text-base text-gray-600">DAP</div>
                  <div className="text-base font-semibold text-gray-800 break-all text-center w-full px-2">
                    {result.dap.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">kg</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-between min-h-[120px]">
                  <div className="text-base text-gray-600">MOP</div>
                  <div className="text-base font-semibold text-gray-800 break-all text-center w-full px-2">
                    {result.mop.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">kg</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FertilizerCalculator; 
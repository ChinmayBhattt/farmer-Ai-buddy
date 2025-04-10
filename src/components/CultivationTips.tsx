import { useState } from 'react';
import { motion } from 'framer-motion';

interface CropStage {
  stage: string;
  icon: string;
  tips: string[];
}

interface CropTips {
  name: string;
  stages: CropStage[];
}

const cropsData: CropTips[] = [
  {
    name: "Rice",
    stages: [
      {
        stage: "Pre-sowing",
        icon: "🌱",
        tips: [
          "Select high-quality seeds",
          "Prepare land 2-3 weeks before sowing",
          "Ensure proper drainage system"
        ]
      },
      {
        stage: "Sowing",
        icon: "🌾",
        tips: [
          "Maintain proper spacing (20x15 cm)",
          "Sow seeds at 2-3 cm depth",
          "Maintain proper water level"
        ]
      },
      {
        stage: "Fertilizer management",
        icon: "💧",
        tips: [
          "Apply base fertilizer before transplanting",
          "Top dress with nitrogen at tillering",
          "Use balanced NPK ratio"
        ]
      },
      {
        stage: "Pest control",
        icon: "🐛",
        tips: [
          "Monitor regularly for pests",
          "Use integrated pest management",
          "Apply pesticides only when necessary"
        ]
      },
      {
        stage: "Harvesting",
        icon: "🌾",
        tips: [
          "Harvest when 80% grains are mature",
          "Cut at proper height",
          "Dry properly before storage"
        ]
      }
    ]
  },
  {
    name: "Wheat",
    stages: [
      {
        stage: "Pre-sowing",
        icon: "🌱",
        tips: [
          "Deep plowing recommended",
          "Test soil pH (ideal 6.5-7.5)",
          "Level the field properly"
        ]
      },
      {
        stage: "Sowing",
        icon: "🌾",
        tips: [
          "Sow at optimal time (region specific)",
          "Use proper seed rate",
          "Maintain row spacing"
        ]
      },
      {
        stage: "Fertilizer management",
        icon: "💧",
        tips: [
          "Apply NPK before sowing",
          "Split nitrogen application",
          "Consider micronutrients"
        ]
      },
      {
        stage: "Pest control",
        icon: "🐛",
        tips: [
          "Watch for rust and smut",
          "Control weeds early",
          "Monitor insect damage"
        ]
      },
      {
        stage: "Harvesting",
        icon: "🌾",
        tips: [
          "Harvest at proper moisture",
          "Avoid grain shattering",
          "Store in dry conditions"
        ]
      }
    ]
  },
  {
    name: "Tomato",
    stages: [
      {
        stage: "Pre-sowing",
        icon: "🌱",
        tips: [
          "Prepare raised beds",
          "Add organic matter",
          "Ensure good drainage"
        ]
      },
      {
        stage: "Sowing",
        icon: "🍅",
        tips: [
          "Use disease-free seedlings",
          "Space plants properly",
          "Provide support/stakes"
        ]
      },
      {
        stage: "Fertilizer management",
        icon: "💧",
        tips: [
          "Regular feeding schedule",
          "Balance calcium levels",
          "Avoid excess nitrogen"
        ]
      },
      {
        stage: "Pest control",
        icon: "🐛",
        tips: [
          "Monitor for blight",
          "Check for hornworms",
          "Use preventive measures"
        ]
      },
      {
        stage: "Harvesting",
        icon: "🍅",
        tips: [
          "Pick when fully colored",
          "Harvest regularly",
          "Handle fruits carefully"
        ]
      }
    ]
  }
];

const CultivationTips = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>(cropsData[0].name);

  const currentCrop = cropsData.find(crop => crop.name === selectedCrop)!;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Cultivation Tips
        </h2>

        {/* Crop Selection */}
        <div className="mb-8">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            {cropsData.map(crop => (
              <option key={crop.name} value={crop.name}>
                {crop.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCrop.stages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{stage.icon}</span>
                <h3 className="font-semibold text-gray-800">{stage.stage}</h3>
              </div>
              <ul className="space-y-2">
                {stage.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CultivationTips; 
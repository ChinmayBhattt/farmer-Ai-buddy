import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface Problem {
  id: number;
  name: string;
  category: number;
  icon: string;
  description: string;
  impact: string[];
  solutions: string[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  problems: Problem[];
}

const allCategories: Category[] = [
  {
    id: 1,
    name: "Main Global Problems",
    icon: "🌍",
    color: "bg-red-100",
    description: "Critical global challenges that affect our planet and humanity as a whole.",
    problems: [
      {
        id: 1,
        name: "Global Warming",
        category: 1,
        icon: "🌡️",
        description: "Rising global temperatures due to greenhouse gas emissions",
        impact: ["Melting ice caps", "Rising sea levels", "Extreme weather events"],
        solutions: ["Reduce carbon emissions", "Switch to renewable energy", "Improve energy efficiency"]
      },
      {
        id: 2,
        name: "Glacial Melting",
        category: 1,
        icon: "❄️",
        description: "Accelerated melting of Earth's glaciers and ice sheets",
        impact: ["Sea level rise", "Loss of freshwater sources", "Ecosystem damage"],
        solutions: ["Reduce greenhouse gases", "Protect glacial environments", "Support affected communities"]
      },
      {
        id: 3,
        name: "Climate Change",
        category: 1,
        icon: "🌪️",
        description: "Long-term alteration of global weather patterns",
        impact: ["Ecosystem disruption", "Agricultural challenges", "Extreme weather"],
        solutions: ["Carbon reduction", "Renewable energy", "Climate adaptation"]
      },
      {
        id: 4,
        name: "Ozone Layer Depletion",
        category: 1,
        icon: "☀️",
        description: "Thinning of Earth's protective ozone layer",
        impact: ["UV radiation increase", "Health risks", "Ecosystem damage"],
        solutions: ["Ban harmful chemicals", "Alternative technologies", "International cooperation"]
      },
      {
        id: 5,
        name: "Sea Level Rise",
        category: 1,
        icon: "🌊",
        description: "Increasing ocean levels due to melting ice",
        impact: ["Coastal flooding", "Population displacement", "Infrastructure damage"],
        solutions: ["Emissions reduction", "Coastal protection", "Community relocation"]
      },
      {
        id: 6,
        name: "Desertification",
        category: 1,
        icon: "🏜️",
        description: "Degradation of fertile land into desert",
        impact: ["Loss of arable land", "Food insecurity", "Biodiversity loss"],
        solutions: ["Sustainable land use", "Drought-resistant crops", "Soil conservation"]
      },
      {
        id: 7,
        name: "Coral Reef Destruction",
        category: 1,
        icon: "🐠",
        description: "Loss of coral reef ecosystems worldwide",
        impact: ["Marine biodiversity loss", "Coastal protection loss", "Economic impact"],
        solutions: ["Ocean protection", "Climate action", "Sustainable tourism"]
      },
      {
        id: 8,
        name: "Loss of Biodiversity",
        category: 1,
        icon: "🦋",
        description: "Rapid decline in species diversity globally",
        impact: ["Ecosystem instability", "Food security threats", "Loss of resources"],
        solutions: ["Habitat protection", "Species conservation", "Sustainable practices"]
      },
      {
        id: 9,
        name: "E-waste Mismanagement",
        category: 1,
        icon: "🔌",
        description: "Improper disposal of electronic waste",
        impact: ["Toxic pollution", "Health hazards", "Resource waste"],
        solutions: ["Recycling programs", "Responsible disposal", "Extended producer responsibility"]
      },
      {
        id: 10,
        name: "Refugee Crisis",
        category: 1,
        icon: "🏃",
        description: "Large-scale displacement of populations",
        impact: ["Humanitarian crisis", "Social strain", "Resource pressure"],
        solutions: ["International cooperation", "Aid programs", "Conflict resolution"]
      }
    ]
  },
  {
    id: 2,
    name: "Climate & Atmosphere",
    icon: "🔥",
    color: "bg-orange-100",
    description: "Issues related to climate change and atmospheric conditions",
    problems: [
      {
        id: 11,
        name: "Frequent Heatwaves",
        category: 2,
        icon: "🌡️",
        description: "Increasing frequency of heat waves",
        impact: ["Health risks", "Agricultural damage", "Infrastructure strain"],
        solutions: ["Urban cooling", "Early warning systems", "Community support"]
      },
      {
        id: 12,
        name: "Changing Rainfall Patterns",
        category: 2,
        icon: "🌧️",
        description: "Disruption of normal precipitation patterns",
        impact: ["Agricultural disruption", "Water scarcity", "Flooding risks"],
        solutions: ["Climate adaptation", "Water management", "Resilient agriculture"]
      },
      {
        id: 13,
        name: "Extreme Weather Events",
        category: 2,
        icon: "⛈️",
        description: "Increased frequency of severe storms",
        impact: ["Infrastructure damage", "Loss of life", "Economic losses"],
        solutions: ["Early warning systems", "Infrastructure resilience", "Emergency preparedness"]
      },
      {
        id: 14,
        name: "Sudden Flash Floods",
        category: 2,
        icon: "🌊",
        description: "Rapid flooding events in vulnerable areas",
        impact: ["Property damage", "Loss of life", "Infrastructure destruction"],
        solutions: ["Flood prevention", "Early warning", "Urban planning"]
      },
      {
        id: 15,
        name: "Extended Drought Periods",
        category: 2,
        icon: "☀️",
        description: "Prolonged periods without adequate rainfall",
        impact: ["Water scarcity", "Crop failure", "Ecosystem stress"],
        solutions: ["Water conservation", "Drought-resistant agriculture", "Resource management"]
      },
      {
        id: 16,
        name: "Air Pollution",
        category: 2,
        icon: "💨",
        description: "Contamination of air by harmful substances",
        impact: ["Respiratory diseases", "Global warming", "Acid rain"],
        solutions: ["Clean energy", "Emission controls", "Public transport"]
      }
    ]
  },
  {
    id: 3,
    name: "Oceans & Water",
    icon: "🌊",
    color: "bg-blue-100",
    description: "Challenges affecting oceans and marine ecosystems",
    problems: [
      {
        id: 16,
        name: "Dead Zones in Oceans",
        category: 3,
        icon: "🐟",
        description: "Areas with too little oxygen to support life",
        impact: ["Marine life death", "Ecosystem collapse", "Fishery impacts"],
        solutions: ["Reduce pollution", "Protect marine areas", "Sustainable fishing"]
      },
      {
        id: 17,
        name: "Ocean Acidification",
        category: 3,
        icon: "🧪",
        description: "Decreasing pH levels in oceans",
        impact: ["Coral reef death", "Marine life threats", "Ecosystem disruption"],
        solutions: ["Reduce CO2 emissions", "Marine protection", "Research support"]
      },
      {
        id: 18,
        name: "Mangrove Forest Destruction",
        category: 3,
        icon: "🌴",
        description: "Loss of crucial coastal ecosystems",
        impact: ["Coastal erosion", "Habitat loss", "Carbon release"],
        solutions: ["Protection laws", "Restoration projects", "Community involvement"]
      },
      {
        id: 19,
        name: "Thermal Pollution",
        category: 3,
        icon: "🌡️",
        description: "Artificial heating of water bodies",
        impact: ["Aquatic life stress", "Oxygen depletion", "Ecosystem changes"],
        solutions: ["Cooling technologies", "Discharge regulations", "Alternative methods"]
      },
      {
        id: 20,
        name: "Red Tides",
        category: 3,
        icon: "🌊",
        description: "Harmful algal blooms in coastal waters",
        impact: ["Marine life death", "Human health risks", "Economic losses"],
        solutions: ["Pollution control", "Monitoring systems", "Public awareness"]
      },
      {
        id: 21,
        name: "Plastic Pollution",
        category: 3,
        icon: "🗑️",
        description: "Accumulation of plastic waste in oceans",
        impact: ["Wildlife harm", "Food chain contamination", "Beach pollution"],
        solutions: ["Reduce plastic use", "Better recycling", "Ocean cleanup"]
      }
    ]
  },
  {
    id: 4,
    name: "Forest & Agriculture",
    icon: "🌱",
    color: "bg-green-100",
    description: "Problems impacting forests and agricultural lands",
    problems: [
      {
        id: 21,
        name: "Deforestation",
        category: 4,
        icon: "🌳",
        description: "Large-scale forest removal",
        impact: ["Habitat loss", "Climate change", "Soil erosion"],
        solutions: ["Sustainable forestry", "Protected areas", "Reforestation"]
      },
      {
        id: 22,
        name: "Soil Degradation",
        category: 4,
        icon: "🌱",
        description: "Loss of soil quality and fertility",
        impact: ["Reduced crops", "Land degradation", "Food security"],
        solutions: ["Better farming", "Soil conservation", "Natural fertilizers"]
      },
      {
        id: 23,
        name: "Agricultural Pollution",
        category: 4,
        icon: "🚜",
        description: "Pollution from farming activities",
        impact: ["Water pollution", "Soil contamination", "Wildlife harm"],
        solutions: ["Organic farming", "Better practices", "Reduced chemicals"]
      },
      {
        id: 24,
        name: "Slash and Burn Agriculture",
        category: 4,
        icon: "🔥",
        description: "Destructive farming practice causing deforestation",
        impact: ["Forest loss", "Soil degradation", "Biodiversity decline"],
        solutions: ["Sustainable farming", "Alternative methods", "Community education"]
      },
      {
        id: 25,
        name: "Illegal Logging",
        category: 4,
        icon: "🪓",
        description: "Unauthorized timber harvesting",
        impact: ["Habitat destruction", "Species loss", "Community impact"],
        solutions: ["Law enforcement", "Sustainable forestry", "Community monitoring"]
      },
      {
        id: 26,
        name: "Monoculture Farming",
        category: 4,
        icon: "🌾",
        description: "Single-crop agricultural practice",
        impact: ["Soil depletion", "Pest vulnerability", "Biodiversity loss"],
        solutions: ["Crop rotation", "Diversification", "Sustainable practices"]
      },
      {
        id: 27,
        name: "Overgrazing",
        category: 4,
        icon: "🐄",
        description: "Excessive livestock grazing on land",
        impact: ["Soil erosion", "Vegetation loss", "Land degradation"],
        solutions: ["Rotational grazing", "Carrying capacity", "Land management"]
      },
      {
        id: 28,
        name: "Pesticide Overuse",
        category: 4,
        icon: "☠️",
        description: "Excessive use of agricultural chemicals",
        impact: ["Soil contamination", "Wildlife harm", "Health risks"],
        solutions: ["Integrated pest management", "Organic farming", "Better regulation"]
      }
    ]
  },
  {
    id: 5,
    name: "Wildlife & Biodiversity",
    icon: "🐘",
    color: "bg-yellow-100",
    description: "Threats to wildlife and biodiversity conservation",
    problems: [
      {
        id: 26,
        name: "Species Extinction",
        category: 5,
        icon: "🦕",
        description: "Loss of plant and animal species",
        impact: ["Biodiversity loss", "Ecosystem damage", "Genetic loss"],
        solutions: ["Protection laws", "Conservation", "Habitat preservation"]
      },
      {
        id: 27,
        name: "Wildlife Trafficking",
        category: 5,
        icon: "🦁",
        description: "Illegal trade of endangered species",
        impact: ["Species decline", "Extinction risk", "Ecosystem damage"],
        solutions: ["Law enforcement", "Trade bans", "Public awareness"]
      },
      {
        id: 28,
        name: "Habitat Loss",
        category: 5,
        icon: "🏗️",
        description: "Destruction of natural habitats",
        impact: ["Wildlife displacement", "Species decline", "Ecosystem loss"],
        solutions: ["Protected areas", "Urban planning", "Restoration"]
      },
      {
        id: 29,
        name: "Invasive Species",
        category: 5,
        icon: "🦀",
        description: "Non-native species threatening ecosystems",
        impact: ["Native species decline", "Habitat alteration", "Economic damage"],
        solutions: ["Prevention measures", "Early detection systems", "Control programs"]
      },
      {
        id: 30,
        name: "Migration Disruption",
        category: 5,
        icon: "🦅",
        description: "Interference with animal migration patterns",
        impact: ["Population decline", "Breeding disruption", "Ecosystem imbalance"],
        solutions: ["Protected corridors", "Habitat conservation", "Development planning"]
      },
      {
        id: 31,
        name: "Pollinator Decline",
        category: 5,
        icon: "🐝",
        description: "Decreasing populations of pollinating insects",
        impact: ["Crop failure", "Ecosystem disruption", "Food security threats"],
        solutions: ["Pesticide reduction", "Habitat protection", "Garden diversity"]
      }
    ]
  }
];

const problems: Problem[] = [
  {
    id: 101,
    name: "Global Warming",
    category: 1,
    icon: "🌡️",
    description: "Rising global temperatures due to greenhouse gases",
    impact: ["Sea level rise", "Extreme weather", "Ecosystem disruption"],
    solutions: ["Renewable energy", "Carbon reduction", "Energy efficiency"]
  },
  {
    id: 102,
    name: "Air Pollution",
    category: 1,
    icon: "🏭",
    description: "Contamination of air by harmful substances",
    impact: ["Health issues", "Environmental damage", "Climate change"],
    solutions: ["Clean energy", "Emission controls", "Public transport"]
  },
  {
    id: 103,
    name: "Glacial Melting",
    icon: "❄️",
    category: 1,
    description: "Rapid melting of glaciers and ice sheets worldwide",
    impact: ["Sea level rise", "Water scarcity", "Ecosystem disruption"],
    solutions: ["Reduce emissions", "Protect ice habitats", "Monitor glacier health"]
  },
  {
    id: 104,
    name: "Extreme Weather Events",
    icon: "🌪️",
    category: 1,
    description: "Increased frequency and intensity of extreme weather phenomena",
    impact: ["Infrastructure damage", "Loss of life", "Economic disruption"],
    solutions: ["Early warning systems", "Climate resilient infrastructure", "Disaster preparedness"]
  },
  {
    id: 105,
    name: "Ocean Acidification",
    icon: "🌊",
    category: 2,
    description: "Decreasing pH levels in oceans due to CO2 absorption",
    impact: ["Marine ecosystem damage", "Coral reef death", "Fish population decline"],
    solutions: ["Reduce CO2 emissions", "Marine protected areas", "Sustainable fishing"]
  },
  {
    id: 106,
    name: "Deforestation",
    icon: "🌳",
    category: 3,
    description: "Large-scale forest loss and degradation",
    impact: ["Biodiversity loss", "Carbon emissions", "Soil erosion"],
    solutions: ["Sustainable forestry", "Protected areas", "Reforestation programs"]
  },
  {
    id: 107,
    name: "Soil Degradation",
    icon: "🌱",
    category: 3,
    description: "Loss of soil quality and fertility",
    impact: ["Food insecurity", "Reduced crop yields", "Ecosystem damage"],
    solutions: ["Sustainable agriculture", "Soil conservation", "Crop rotation"]
  },
  {
    id: 108,
    name: "Species Extinction",
    icon: "🐾",
    category: 4,
    description: "Accelerated loss of plant and animal species",
    impact: ["Ecosystem collapse", "Loss of biodiversity", "Food chain disruption"],
    solutions: ["Habitat protection", "Conservation programs", "Anti-poaching measures"]
  },
  {
    id: 109,
    name: "Habitat Loss",
    icon: "🏗️",
    category: 4,
    description: "Destruction of natural habitats due to human activities",
    impact: ["Wildlife displacement", "Biodiversity reduction", "Ecosystem imbalance"],
    solutions: ["Protected areas", "Sustainable development", "Habitat restoration"]
  },
  {
    id: 110,
    name: "Plastic Pollution",
    icon: "🗑️",
    category: 2,
    description: "Accumulation of plastic waste in ecosystems",
    impact: ["Marine life harm", "Food chain contamination", "Ecosystem damage"],
    solutions: ["Reduce plastic use", "Recycling programs", "Ocean cleanup"]
  }
];

const GlobalProblems: React.FC = () => {
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handlePlusClick = () => {
    setShowModal(true);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleProblemClick = (problem: Problem) => {
    if (!selectedProblems.some(p => p.id === problem.id)) {
      setSelectedProblems([...selectedProblems, problem]);
    }
    setShowModal(false);
    setSelectedCategory(null);
  };

  const handleProblemDetailsClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowProblemDetails(true);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Selected Problems */}
      <div className="bg-transparent">
        <h1 className="text-2xl font-bold px-4 pt-4 text-gray-800">Global Issues Tracker</h1>
        <div className="flex gap-4 overflow-x-auto p-3 scrollbar-hide">
          {selectedProblems.map((problem) => (
            <motion.button
              key={problem.id}
              onClick={() => handleProblemDetailsClick(problem)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md hover:shadow-lg transition-all border-2 border-gray-100"
            >
              {problem.icon}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </motion.button>
          ))}
          <button
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl hover:shadow-md transition-all"
          >
            +
          </button>
        </div>
      </div>

      {/* Categories and Problems Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] shadow-lg relative border border-gray-200 flex flex-col"
            >
              <div className="sticky top-0 bg-white p-6 pb-4 border-b z-50 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedCategory ? selectedCategory.name : 'Select Category'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedCategory ? 'Choose a problem to track' : 'Select a category to view problems'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedCategory) {
                        setSelectedCategory(null);
                      } else {
                        setShowModal(false);
                      }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    {selectedCategory ? '←' : '×'}
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-2 bg-white">
                {!selectedCategory ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allCategories.map((category) => (
                      <motion.div
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                        whileHover={{ scale: 1.02 }}
                        className={`${category.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-4xl bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">{category.icon}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                            <span className="text-sm text-gray-600">{category.problems.length} problems</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.problems.map((problem) => (
                      <motion.div
                        key={problem.id}
                        onClick={() => handleProblemClick(problem)}
                        whileHover={{ scale: 1.02 }}
                        className="group bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:border-green-200"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-all">{problem.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-800">{problem.name}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{problem.description}</p>
                        <div className="flex items-center text-sm text-green-600 group-hover:text-green-700 transition-all">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add to tracker
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Problem Details Modal */}
      <AnimatePresence>
        {showProblemDetails && selectedProblem && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center shadow-sm">{selectedProblem.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{selectedProblem.name}</h2>
                    <p className="text-sm text-gray-500">Category: {
                      selectedProblem.category === 1 ? "Main Global Problems" :
                      selectedProblem.category === 2 ? "Climate & Atmosphere" :
                      selectedProblem.category === 3 ? "Oceans & Water" :
                      selectedProblem.category === 4 ? "Forest & Agriculture" :
                      "Wildlife & Biodiversity"
                    }</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProblemDetails(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Description
                  </h3>
                  <p className="text-gray-600">{selectedProblem.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Impact
                  </h3>
                  <ul className="space-y-2">
                    {selectedProblem.impact.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Solutions
                  </h3>
                  <ul className="space-y-2">
                    {selectedProblem.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowProblemDetails(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalProblems; 
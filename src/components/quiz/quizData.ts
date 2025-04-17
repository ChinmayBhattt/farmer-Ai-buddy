export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  totalQuestions: number;
  topics: string[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'climate',
    title: 'Climate & Atmosphere',
    description: 'Test your knowledge about global warming, climate change, and atmospheric phenomena.',
    icon: '🌡️',
    totalQuestions: 10,
    topics: [
      'Global Warming',
      'Glacial Melting',
      'Climate Change',
      'Ozone Layer Depletion',
      'Sea Level Rise',
      'Desertification',
      'Coral Reef Destruction',
      'Biodiversity Loss',
      'Refugee Crisis',
      'Permafrost Thawing',
      'Antarctica Melting'
    ]
  },
  {
    id: 'oceans',
    title: 'Oceans & Marine Life',
    description: 'Explore the challenges facing our oceans and marine ecosystems.',
    icon: '🌊',
    totalQuestions: 10,
    topics: [
      'Oceanic Dead Zones',
      'Tsunami Threats',
      'Mangrove Destruction',
      'Sea Ice Loss',
      'Underwater Mining Impact',
      'Thermal Pollution',
      'Algal Blooms',
      'Shellfish Disruption',
      'Dead Coral Reefs',
      'Disappearing Wetlands'
    ]
  },
  {
    id: 'forest',
    title: 'Forest & Agriculture',
    description: 'Learn about deforestation, sustainable farming, and soil health.',
    icon: '🌳',
    totalQuestions: 10,
    topics: [
      'Slash and Burn',
      'Illegal Logging',
      'Monoculture Farming',
      'Overgrazing',
      'Soil Erosion',
      'Pesticide Overuse',
      'GMO Effects',
      'Pollinator Decline',
      'Topsoil Depletion',
      'Agricultural Runoff'
    ]
  },
  {
    id: 'wildlife',
    title: 'Wildlife & Biodiversity',
    description: 'Understand the threats to wildlife and biodiversity conservation.',
    icon: '🦁',
    totalQuestions: 10,
    topics: [
      'Poaching',
      'Habitat Fragmentation',
      'Invasive Species',
      'Migration Path Disruption',
      'Predator Loss Effects',
      'Net Entanglement',
      'Pollination Loss',
      'Disappearing Amphibians',
      'Island Species Extinction',
      'Tundra Collapse'
    ]
  },
  {
    id: 'pollution',
    title: 'Pollution & Waste',
    description: 'Test your knowledge about various types of pollution and waste management.',
    icon: '🏭',
    totalQuestions: 10,
    topics: [
      'Toxic Waste Dumping',
      'Medicine in Water',
      'Light Pollution',
      'PM2.5/PM10 Air Pollution',
      'Heavy Metal Contamination',
      'Noise Pollution',
      'Stubble Burning',
      'Fast Fashion Waste',
      'Battery/Lithium Pollution',
      'Construction Waste'
    ]
  }
];

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Sample questions for the Climate & Atmosphere category
export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the primary greenhouse gas responsible for global warming?',
    options: [
      'Carbon Dioxide (CO₂)',
      'Methane (CH₄)',
      'Water Vapor (H₂O)',
      'Nitrous Oxide (N₂O)'
    ],
    correctAnswer: 0,
    explanation: 'CO₂ is the primary greenhouse gas contributing to global warming through human activities.'
  },
  {
    id: 'q2',
    text: 'Which phenomenon is causing sea levels to rise?',
    options: [
      'Increased rainfall',
      'Thermal expansion of water and melting ice',
      'Tectonic plate movement',
      'Ocean acidification'
    ],
    correctAnswer: 1,
    explanation: 'Sea levels are rising due to thermal expansion of warming water and melting ice from glaciers and ice sheets.'
  }
]; 
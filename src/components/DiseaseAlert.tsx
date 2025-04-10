import { useState } from 'react';
import { motion } from 'framer-motion';

interface Alert {
  id: number;
  pest: string;
  crop: string;
  area: string;
  severity: 'Low' | 'Moderate' | 'High';
  action: string;
}

const alertsData: Alert[] = [
  {
    id: 1,
    pest: "Rice Blast",
    crop: "Rice",
    area: "Northern Region",
    severity: "High",
    action: "Immediate fungicide application recommended. Monitor closely for symptoms."
  },
  {
    id: 2,
    pest: "Aphids",
    crop: "Wheat",
    area: "Central Region",
    severity: "Moderate",
    action: "Consider applying insecticide if population increases. Check natural predators."
  },
  {
    id: 3,
    pest: "Late Blight",
    crop: "Tomato",
    area: "Southern Region",
    severity: "Low",
    action: "Monitor plants regularly. Ensure proper air circulation."
  }
];

const DiseaseAlert = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const crops = [...new Set(alertsData.map(alert => alert.crop))];

  const checkAlerts = () => {
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      const filteredAlerts = alertsData.filter(
        alert => (!selectedCrop || alert.crop === selectedCrop) &&
                (!location || alert.area.toLowerCase().includes(location.toLowerCase()))
      );
      setAlerts(filteredAlerts);
      setIsChecking(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High':
        return '⚠️';
      case 'Moderate':
        return '⚡';
      case 'Low':
        return '✓';
      default:
        return '•';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          Pests & Disease Alerts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Crop Selection */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          >
            <option value="">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          {/* Location Input */}
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Check Alerts Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={checkAlerts}
          disabled={isChecking}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 mb-6"
        >
          {isChecking ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="ml-2">Checking alerts...</span>
            </div>
          ) : (
            'Check for Alerts'
          )}
        </motion.button>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{alert.pest}</h3>
                  <p className="text-sm text-gray-600">{alert.area}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getSeverityColor(alert.severity)}`}>
                  {getSeverityIcon(alert.severity)} {alert.severity}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Crop:</span>
                <span className="text-sm text-gray-800">{alert.crop}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Recommended Action:</span> {alert.action}
              </p>
            </motion.div>
          ))}

          {alerts.length === 0 && !isChecking && (
            <div className="text-center py-8 text-gray-500">
              No alerts found for the selected criteria.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DiseaseAlert; 
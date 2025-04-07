import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigation from './components/layout/BottomNavigation';
import Home from './pages/Home';
import Community from './pages/Community';
import Dukaan from './pages/Dukaan';
import Profile from './pages/Profile';
import PlantDiagnosis from './components/features/PlantDiagnosis';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dukaan" element={<Dukaan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diagnosis" element={<PlantDiagnosis />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App; 
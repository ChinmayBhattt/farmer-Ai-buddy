import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigation from './components/layout/BottomNavigation';
import Home from './pages/Home';
import Events from './pages/Events';
import Community from './pages/Community';
import Profile from './pages/Profile';
import PlantDiagnosis from './components/features/PlantDiagnosis';
import GlobalIssues from './components/GlobalIssues';
import QuizZone from './components/quiz/QuizZone';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diagnosis" element={<PlantDiagnosis />} />
          <Route path="/global-issues" element={<GlobalIssues />} />
          <Route path="/quiz-zone" element={<QuizZone />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
};

export default App; 
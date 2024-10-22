import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SocialMediaAnalysis from './pages/SocialMediaAnalysis';
import ResumeAnalyzer from './pages/ResumeAnalyzer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/social-media-analysis" element={<SocialMediaAnalysis />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
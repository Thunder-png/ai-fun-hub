import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to AI Fun Hub</h1>
      <p className="text-xl mb-8">Discover the power of AI with our fun and engaging tools!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/social-media-analysis" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <Twitter className="text-blue-400" size={48} />
            <Linkedin className="text-blue-600" size={48} />
            <Instagram className="text-pink-500" size={48} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Social Media Parody Analysis</h2>
          <p className="text-gray-600">Get hilarious insights about your social media profiles!</p>
        </Link>
        <Link to="/resume-analyzer" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <FileText className="text-green-500" size={48} />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Resume Analyzer</h2>
          <p className="text-gray-600">Get serious advice or hilarious takes on your resume!</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
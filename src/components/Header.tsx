import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
          <Sparkles size={32} />
          <span>AI Fun Hub</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link></li>
            <li><Link to="/social-media-analysis" className="text-gray-600 hover:text-indigo-600">Social Media Analysis</Link></li>
            <li><Link to="/resume-analyzer" className="text-gray-600 hover:text-indigo-600">Resume Analyzer</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
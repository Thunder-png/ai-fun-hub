import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram, Send } from 'lucide-react';

const SocialMediaAnalysis: React.FC = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement API call to OpenAI for analysis
    // For now, we'll use a mock response
    setTimeout(() => {
      setAnalysis("Wow, your profile screams 'I'm trying way too hard to look professional!' It's like LinkedIn and a comedy club had a baby. Your bio says 'Thought Leader,' but your posts say 'I just discovered hashtags.' Keep it up, champ! You're one motivational quote away from world domination.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Social Media Parody Analysis</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your social media profile URL:
          </label>
          <input
            type="url"
            id="profileUrl"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select platform:</label>
          <div className="flex space-x-4">
            {['Twitter', 'LinkedIn', 'Instagram'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  platform === p ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {p === 'Twitter' && <Twitter size={20} />}
                {p === 'LinkedIn' && <Linkedin size={20} />}
                {p === 'Instagram' && <Instagram size={20} />}
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            'Analyzing...'
          ) : (
            <>
              <Send size={20} className="mr-2" />
              Get Hilarious Analysis
            </>
          )}
        </button>
      </form>
      {analysis && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Parody Analysis:</h2>
          <p className="text-lg text-gray-700">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaAnalysis;
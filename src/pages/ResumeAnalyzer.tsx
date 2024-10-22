import React, { useState } from 'react';
import { Upload, FileText, Zap, Coffee } from 'lucide-react';

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'serious' | 'fun'>('serious');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const prompt = mode === 'serious'
            ? `Analyze the following resume and provide professional feedback and suggestions for improvement:\n\n${text}`
            : `Analyze the following resume and provide a humorous, light-hearted critique:\n\n${text}`;

          const url = 'https://open-ai21.p.rapidapi.com/chatgpt';
          const options = {
            method: 'POST',
            headers: {
              'x-rapidapi-key': '3bed43c0c9msh97bb63d9e642ad4p13abd6jsn1cc92e23cade',
              'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [
                {
                  role: 'user',
                  content: prompt
                }
              ],
              web_access: false
            })
          };

          const response = await fetch(url, options);
          const result = await response.json();

          if (response.ok) {
            if (result && result.result) {
              setAnalysis(result.result);
            } else {
              throw new Error("Unexpected response format");
            }
          } else {
            throw new Error(result.message || 'Failed to analyze resume');
          }
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      setAnalysis("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Analyzer</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-2">
            Upload your resume (PDF or TXT):
          </label>
          <input
            type="file"
            id="resumeFile"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Mode:</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setMode('serious')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                mode === 'serious' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <FileText size={20} />
              <span>Serious</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('fun')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                mode === 'fun' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Coffee size={20} />
              <span>Fun</span>
            </button>
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
              <Zap size={20} className="mr-2" />
              Analyze Resume
            </>
          )}
        </button>
      </form>
      {analysis && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Analysis Result:</h2>
          <p className="text-lg text-gray-700">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
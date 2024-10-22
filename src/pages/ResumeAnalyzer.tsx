import React, { useState } from 'react';

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'serious' | 'fun'>('serious'); // Mod state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('No file selected');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode); // Mod bilgisini ekliyoruz

    try {
      const response = await fetch('http://localhost:3001/analyze-screenshot', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze screenshot');
      }

      const result = await response.json();

      const parsedAnalysis = JSON.parse(result.analysis);
      const adviceContent = parsedAnalysis?.choices?.[0]?.message?.content || 'No advice found.';
      console.log('Extracted Advice Content:', adviceContent);

      setAnalysis(adviceContent);
    } catch (error) {
      console.error('Error during analysis:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">WhatsApp Screenshot Analyzer</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="screenshotFile" className="block text-sm font-medium text-gray-700 mb-2">
            Upload WhatsApp Screenshot (JPG, PNG):
          </label>
          <input
            type="file"
            id="screenshotFile"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Mode:</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setMode('serious')}
              className={`px-4 py-2 rounded-md ${
                mode === 'serious' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Serious
            </button>
            <button
              type="button"
              onClick={() => setMode('fun')}
              className={`px-4 py-2 rounded-md ${
                mode === 'fun' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Fun
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Screenshot'}
        </button>
      </form>

      {analysis && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Relationship Advice:</h2>
          <p className="text-lg text-gray-700 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

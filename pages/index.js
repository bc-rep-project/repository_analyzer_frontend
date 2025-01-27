import { useState } from 'react';
import { SparklesIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { analyzeContent } from '../services/analysisService';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await analyzeContent(input);
      setResult(data);
    } catch (error) {
      console.error('Analysis error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Content Analysis
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent ml-2">
              AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your content strategy with advanced AI-powered text analysis and insights.
          </p>
          
          {/* Input Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to analyze..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ChartBarIcon className="w-5 h-5 mr-2" />
                    Analyze Content
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <SparklesIcon className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600">Advanced natural language processing to uncover hidden patterns and trends.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CpuChipIcon className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-gray-600">Instant processing with detailed metrics and actionable recommendations.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <ChartBarIcon className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visual Reports</h3>
            <p className="text-gray-600">Interactive charts and graphs to visualize your content performance.</p>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in-up bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Result cards would go here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
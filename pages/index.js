import { useState } from 'react';
import { SparklesIcon, ChartBarIcon, CpuChipIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-8">
            Content Analysis
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Transform your content strategy with advanced AI-powered text analysis and insights.
            Get detailed metrics and actionable recommendations in real-time.
          </p>
          
          {/* Input Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/80 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your content to analyze..."
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all text-gray-700 placeholder-gray-400 text-lg"
                  rows="5"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Analyze Content
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-indigo-100 rounded-xl p-3 w-fit mb-6">
              <SparklesIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Insights</h3>
            <p className="text-gray-600 leading-relaxed">Advanced natural language processing to uncover hidden patterns and trends in your content.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-blue-100 rounded-xl p-3 w-fit mb-6">
              <CpuChipIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Analysis</h3>
            <p className="text-gray-600 leading-relaxed">Get instant processing with detailed metrics and actionable recommendations.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="bg-indigo-100 rounded-xl p-3 w-fit mb-6">
              <ChartBarIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visual Reports</h3>
            <p className="text-gray-600 leading-relaxed">Interactive charts and graphs to visualize your content performance metrics.</p>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl p-8 mt-12 max-w-6xl mx-auto border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Analysis Results</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Result cards would go here */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">Content Score</h3>
                <p className="text-3xl font-bold text-indigo-600">
                  {typeof result.score === 'number' ? `${result.score}%` : 'N/A'}
                </p>
              </div>
              {/* Add more result cards based on your data structure */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
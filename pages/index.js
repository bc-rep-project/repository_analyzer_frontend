import { useState, useEffect } from 'react';
import RepositoryInput from '../components/RepositoryInput';
import AnalysisResults from '../components/AnalysisResults';
import LanguageSelector from '../components/LanguageSelector';
import { analyzeRepository, getAnalysisResults, getAnalysisStatus } from '../services/analysisService';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [analysisId, setAnalysisId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (url) => {
    try {
      setIsLoading(true);
      setError(null);
      const { id } = await analyzeRepository(url);
      setAnalysisId(id);
    } catch (err) {
      setError('Failed to analyze repository - please check the URL and try again');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!analysisId) return;
    let pollInterval;

    const fetchData = async () => {
      try {
        const status = await getAnalysisStatus(analysisId);
        
        if (status.state === 'processing') {
          pollInterval = setInterval(async () => {
            const currentStatus = await getAnalysisStatus(analysisId);
            if (currentStatus.state === 'completed') {
              clearInterval(pollInterval);
              fetchResults();
            }
          }, 5000);
          return;
        }

        const data = await getAnalysisResults(analysisId, selectedLanguage);
        setAnalysisData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch results - analysis may still be processing');
      }
      setIsLoading(false);
    };

    const fetchResults = async () => {
      try {
        const data = await getAnalysisResults(analysisId, selectedLanguage);
        setAnalysisData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch analysis results');
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [analysisId, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-2 mb-8">
              <SparklesIcon className="h-5 w-5 text-primary" />
              <span className="text-slate-300 text-sm">AI-Powered Code Insights</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Code Complexity Analyzer
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Uncover hidden patterns, optimize code structure, and improve maintainability through intelligent analysis
            </p>
          </div>

          <div className="glass-container bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="controls flex flex-col gap-6">
              <RepositoryInput onAnalyze={handleAnalyze} />
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-3 bg-red-900/30 px-4 py-3 rounded-lg border border-red-800/50">
                <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            )}

            {isLoading && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="spinner animate-spin h-12 w-12 border-[3px] border-primary border-t-transparent rounded-full"></div>
                  <div className="absolute inset-0 border-[3px] border-transparent rounded-full border-t-primary animate-ping"></div>
                </div>
                <span className="text-slate-300 font-medium tracking-wide">
                  Analyzing repository structure...
                </span>
              </div>
            )}
          </div>
        </div>

        {analysisData && (
          <AnalysisResults data={analysisData} />
        )}
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-96 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 floating-shape"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-20 floating-shape" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
} 
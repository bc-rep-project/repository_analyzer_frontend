import { useState, useEffect } from 'react';
import RepositoryInput from '../components/RepositoryInput';
import AnalysisResults from '../components/AnalysisResults';
import LanguageSelector from '../components/LanguageSelector';
import { analyzeRepository, getAnalysisResults, getAnalysisStatus } from '../services/analysisService';
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Code Analysis Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Gain deep insights into your codebase with AI-powered complexity analysis and dependency visualization
          </p>

          <div className="glass-container bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <div className="controls flex flex-col gap-6">
              <RepositoryInput onAnalyze={handleAnalyze} />
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-3 bg-red-900/30 px-4 py-3 rounded-lg">
                <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
                <span className="text-red-200">{error}</span>
              </div>
            )}

            {isLoading && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="spinner animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
                <span className="text-slate-300 font-medium">
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
    </div>
  );
} 
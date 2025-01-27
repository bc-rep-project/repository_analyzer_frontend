import { useState, useEffect } from 'react';
import RepositoryInput from '../components/RepositoryInput';
import AnalysisResults from '../components/AnalysisResults';
import LanguageSelector from '../components/LanguageSelector';
import { analyzeRepository, getAnalysisResults, getAnalysisStatus } from '../services/analysisService';

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
    <div className="container">
      <h1>Code Analysis Platform</h1>
      
      <div className="controls">
        <RepositoryInput onAnalyze={handleAnalyze} />
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onSelect={setSelectedLanguage}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {isLoading && (
        <div className="loading-indicator">
          Analyzing...
          <div className="progress-bar">
            <div className="progress" />
          </div>
        </div>
      )}

      {analysisData && (
        <AnalysisResults data={analysisData} />
      )}
    </div>
  );
} 
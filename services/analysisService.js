const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const analyzeRepository = async (url) => {
  try {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
};

export const getAnalysisResults = async (analysisId, language) => {
  const response = await fetch(
    `${API_BASE}/analysis/${analysisId}/${language}`
  );
  return response.json();
};

export const getAnalysisStatus = async (analysisId) => {
  const response = await fetch(`${API_BASE}/analysis/${analysisId}/status`);
  return response.json();
}; 
import { useState } from 'react';

export default function RepositoryInput({ onAnalyze }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="repo-input">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter repository URL"
        required
      />
      <button type="submit">Analyze</button>
    </form>
  );
} 
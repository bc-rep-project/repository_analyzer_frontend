import { useState, useEffect } from 'react';

export default function LanguageSelector({ selectedLanguage, onSelect }) {
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select Language:</label>
      <select 
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onSelect(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
} 
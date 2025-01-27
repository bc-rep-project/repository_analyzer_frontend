import D3Graph from './D3Graph';
import ComplexityMetrics from './ComplexityMetrics';
import CodeViewer from './CodeViewer';
import { useState } from 'react';

export default function AnalysisResults({ data }) {
  const [selectedFunction, setSelectedFunction] = useState(null);

  if (!data) return null;

  return (
    <div className="analysis-results">
      <div className="graph-section">
        <D3Graph 
          data={data.callGraph} 
          onNodeClick={setSelectedFunction} 
        />
      </div>
      <div className="metrics-section">
        <ComplexityMetrics metrics={data.metrics} />
      </div>
      <div className="code-section">
        <CodeViewer functionData={selectedFunction} />
      </div>
    </div>
  );
} 
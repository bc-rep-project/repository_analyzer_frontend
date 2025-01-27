import D3Graph from './D3Graph';
import ComplexityMetrics from './ComplexityMetrics';
import CodeViewer from './CodeViewer';
import { useState } from 'react';

export default function AnalysisResults({ data }) {
  const [selectedFunction, setSelectedFunction] = useState(null);

  if (!data) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Analysis Results
      </h2>
      
      <ComplexityMetrics metrics={data.metrics} />
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Call Graph</h3>
        <D3Graph data={data.call_graph} />
      </div>
    </div>
  );
} 
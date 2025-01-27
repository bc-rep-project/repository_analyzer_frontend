import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeViewer({ functionData }) {
  if (!functionData) return <div className="code-viewer">Select a function to view code</div>;

  return (
    <div className="code-viewer">
      <h4>{functionData.name}</h4>
      <SyntaxHighlighter
        language={functionData.language}
        style={vscDarkPlus}
        showLineNumbers
      >
        {functionData.code}
      </SyntaxHighlighter>
    </div>
  );
} 
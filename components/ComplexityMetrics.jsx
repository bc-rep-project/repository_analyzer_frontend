export default function ComplexityMetrics({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="complexity-metrics">
      <h3>Code Complexity Metrics</h3>
      <table>
        <tbody>
          {Object.entries(metrics).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{typeof value === 'number' ? value.toFixed(2) : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
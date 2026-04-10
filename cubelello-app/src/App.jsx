import { useState } from 'react';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import { parseCSV } from './utils/parser';
import { processData, generateSummary, generateStuckReason } from './utils/processor';
import { REQUIRED_COLUMNS } from './utils/constants';

export default function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        throw new Error('No data found in CSV file');
      }

      const data = processData(rows);

      // Add stuck reasons to unresolved tickets
      data.unresolvedTickets = data.unresolvedTickets.map(ticket => ({
        ...ticket,
        stuckReason: generateStuckReason(ticket.Category)
      }));

      // Merge summary data into the main data object
      const summary = generateSummary(data);
      const finalStats = {
        ...data,
        ...summary
      };

      setStats(finalStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setStats(null);
    setError(null);
  };

  return (
    <div className="container">
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <h3>Processing CSV...</h3>
          <p>Analyzing your support data</p>
        </div>
      )}

      {error && (
        <div className="error">
          <h3>❌ Error Processing File</h3>
          <p>{error}</p>
          <button className="btn" onClick={resetData}>
            Try Again
          </button>
        </div>
      )}

      {!stats && !loading && !error && <Upload onFile={handleFile} />}

      {stats && !loading && (
        <div>
          <Dashboard stats={stats} />
          <div className="card" style={{ textAlign: 'center', marginTop: '24px' }}>
            <button className="btn" onClick={resetData}>
              📤 Upload New File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
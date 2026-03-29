import { useState } from "react";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import { parseCSV, processData, generateSummary } from "./utils";

export default function App(){
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async(file)=>{
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      
      if (rows.length === 0) {
        throw new Error("No data found in CSV file");
      }
      
      const data = processData(rows);
      data.summary = generateSummary(data);
      setStats(data);
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
        <div className="card" style={{textAlign: 'center', padding: '40px'}}>
          <h3>Processing CSV...</h3>
          <div style={{fontSize: '2em', margin: '20px 0'}}>⏳</div>
        </div>
      )}
      
      {error && (
        <div className="card" style={{background: '#fee2e2', borderLeftColor: '#dc2626'}}>
          <h3>❌ Error Processing File</h3>
          <p>{error}</p>
          <button className="btn" onClick={resetData} style={{marginTop: '10px'}}>
            Try Again
          </button>
        </div>
      )}
      
      {!stats && !loading && !error && <Upload onFile={handleFile}/>}
      
      {stats && !loading && (
        <div>
          <Dashboard stats={stats}/>
          <div className="card" style={{textAlign: 'center', marginTop: '20px'}}>
            <button className="btn" onClick={resetData}>
              📤 Upload New File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
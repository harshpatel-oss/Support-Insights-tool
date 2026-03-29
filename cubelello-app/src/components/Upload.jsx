import { useState } from "react";

export default function Upload({onFile}) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/csv" || file.name.toLowerCase().endsWith('.csv'))) {
      setFileName(file.name);
      onFile(file);
    } else {
      alert("Please upload a valid CSV file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFile(file);
    }
  };

  return (
    <div className="card" style={{maxWidth: '600px', margin: '40px auto'}}>
      <div
        className={`upload-box ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div style={{textAlign: 'center', marginBottom: '24px'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px'}}>
            📊 Ticket Analytics Dashboard
          </h1>
          <p style={{fontSize: '1.1rem', color: '#6b7280'}}>
            Transform your support data into actionable insights
          </p>
        </div>
        <h2>Support Insights</h2>
        <p style={{color: '#64748b', marginBottom: '16px'}}>
          Drag & drop your ticket data file here, or click to browse
        </p>
        <p style={{fontSize: '14px', color: '#94a3b8', marginBottom: '20px'}}>
          upload CSV files with ticket data
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{display: 'none'}}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn">
          Choose File
        </label>
        {fileName && (
          <p style={{marginTop: '12px', fontSize: '14px', color: '#059669'}}>
            Selected: {fileName}
          </p>
        )}
      </div>
    </div>
  );
}
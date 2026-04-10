import { useState } from 'react';

export default function Upload({ onFile }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }
    onFile(file);
  };

  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1a202c' }}>
        📊 Support Insights Dashboard
      </h2>
      <div
        className={`upload-area ${dragOver ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => document.getElementById('file-input').click()}
      >
        <div className="upload-icon">📁</div>
        <h3>Drop your CSV file here</h3>
        <p>or click to browse</p>
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
      <div style={{ textAlign: 'center', color: '#718096', fontSize: '14px' }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Required columns:</strong> Ticket ID, Date, Customer Name, Product, Issue Description, Priority
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Optional columns:</strong> Category (will default to "other" if missing), Status (will default to "open" if missing)
        </div>
        <div style={{ fontSize: '12px', color: '#a0aec0' }}>
          Make sure all cells in required columns have data. Supported date formats: YYYY-MM-DD, DD-MM-YYYY, MM/DD/YYYY, DD/MM/YYYY.
        </div>
      </div>
    </div>
  );
}
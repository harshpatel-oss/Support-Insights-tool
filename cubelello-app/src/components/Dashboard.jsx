import { useState, useMemo } from 'react';
import Charts from './Charts';
import Table from './Table';
import Summary from './Summary';
import Filters from './Filters';
import { filterTickets, exportToCSV } from '../utils/processor';

export default function Dashboard({ stats }) {
  const [filters, setFilters] = useState({ category: '', priority: '', search: '' });

  const filteredTickets = useMemo(() => {
    return filterTickets(stats.unresolvedTickets, filters);
  }, [stats.unresolvedTickets, filters]);

  const handleExport = () => {
    exportToCSV(filteredTickets);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Summary stats={stats} />
        <div style={{ marginTop: '24px' }}>
          <button className="btn" onClick={handleExport} style={{ width: '100%' }}>
            📥 Download Unresolved Tickets
          </button>
        </div>
      </div>

      <div className="main-content">
        {/* Anomaly Alert */}
        {stats.anomalies && stats.anomalies.length > 0 && (
          <div className="anomaly-alert">
            <span className="anomaly-icon">⚠️</span>
            <div>
              <strong>Unusual spike detected on:</strong> {stats.anomalies.join(', ')}
            </div>
          </div>
        )}

        {/* Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🎫</div>
            <div className="metric-value">{stats.totalTickets}</div>
            <div className="metric-label">Total Tickets</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⏳</div>
            <div className="metric-value">{stats.unresolvedCount}</div>
            <div className="metric-label">Unresolved</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✅</div>
            <div className="metric-value">{stats.resolutionRate}%</div>
            <div className="metric-label">Resolution Rate</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-value">{stats.topCategory}</div>
            <div className="metric-label">Top Issue Category</div>
          </div>
        </div>

        {/* Charts */}
        <Charts stats={stats} />

        {/* Filters */}
        <Filters filters={filters} onFiltersChange={setFilters} stats={stats} />

        {/* Unresolved Tickets Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Stuck Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket['Ticket ID']}</td>
                  <td>{ticket['Customer Name']}</td>
                  <td>{ticket.Product}</td>
                  <td>
                    <span className="category-tag">{ticket.Category}</span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${ticket.normalizedPriority}`}>
                      {ticket.Priority}
                    </span>
                  </td>
                  <td>{ticket.stuckReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>No tickets match the current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
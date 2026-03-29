import Charts from "./Charts";
import Table from "./Table";
import Summary from "./Summary";

export default function Dashboard({stats}){
  return (
    <div>
      <div className="header">
        <h1 className="title">Ticket Analytics Dashboard</h1>
        <p className="subtitle">Analyze and manage customer support tickets</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-4">
        <div className="metric">
          <span className="metric-value">{stats.total}</span>
          <span className="metric-label">Total Tickets</span>
        </div>
        <div className="metric">
          <span className="metric-value">{stats.unresolved.length}</span>
          <span className="metric-label">Unresolved</span>
        </div>
        <div className="metric">
          <span className="metric-value">{stats.resolutionRate}%</span>
          <span className="metric-label">Resolution Rate</span>
        </div>
        <div className="metric">
          <span className="metric-value">{stats.priorityCount?.high || 0}</span>
          <span className="metric-label">High Priority</span>
        </div>
      </div>

      {/* Charts */}
      <div className="card">
        <h3>📊 Issue Categories</h3>
        <Charts data={stats}/>
      </div>

      {/* Unresolved Tickets */}
      <div className="card">
        <h3>📋 Unresolved Tickets {stats.unresolved.length > 10 ? '(Top 10)' : ''}</h3>
        <Table data={stats}/>
      </div>

      {/* Key Insights */}
      <div className="grid grid-2">
        <div className="card">
          <h3>🎯 Key Insights</h3>
          <div style={{lineHeight: '1.6'}}>
            <p><strong>Top Category:</strong> {stats.topCat ? stats.topCat[0] : 'N/A'}</p>
            <p><strong>Top Product:</strong> {stats.topProd}</p>
            <p><strong>Unresolved Rate:</strong> {stats.unresPct}%</p>
            <p><strong>High Priority:</strong> {stats.priorityCount?.high || 0} tickets</p>
          </div>
        </div>

        <div className="card">
          <h3>📈 Priority Breakdown</h3>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <span className="badge high">High: {stats.priorityCount?.high || 0}</span>
            <span className="badge medium">Medium: {stats.priorityCount?.medium || 0}</span>
            <span className="badge low">Low: {stats.priorityCount?.low || 0}</span>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="card">
        <h3>📦 Top Problematic Products</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px'}}>
          {stats.topProducts.slice(0, 6).map((prod, i) => (
            <div key={i} style={{
              padding: '12px',
              background: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{fontWeight: '600', marginBottom: '4px'}}>{prod.name}</div>
              <div style={{color: '#64748b', fontSize: '14px'}}>{prod.count} issues</div>
            </div>
          ))}
        </div>
      </div>

      <Summary text={stats.summary}/>
    </div>
  );
}
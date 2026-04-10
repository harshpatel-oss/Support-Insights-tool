export default function Filters({ filters, onFiltersChange, stats }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const categories = Object.keys(stats.categoryDistribution);
  const priorities = ['high', 'medium', 'low'];

  return (
    <div className="filters">
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Priority</label>
        <select
          className="filter-select"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          {priorities.map(pri => (
            <option key={pri} value={pri}>{pri.charAt(0).toUpperCase() + pri.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Search</label>
        <input
          type="text"
          className="filter-input"
          placeholder="Ticket ID or Product..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
    </div>
  );
}
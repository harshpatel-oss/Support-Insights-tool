export default function Summary({ stats }) {
  const generateSummary = () => {
    if (!stats) return "Loading...";

    const unresolvedRate = stats.totalTickets > 0 ? ((stats.unresolvedCount / stats.totalTickets) * 100).toFixed(1) : 0;
    const highPriorityCount = (stats.priorityDistribution && stats.priorityDistribution.high) || 0;

    return `Out of ${stats.totalTickets || 0} tickets, ${stats.unresolvedCount || 0} remain unresolved (${unresolvedRate}%). The most frequent issue category is ${stats.topCategory || 'None'}. ${stats.topProduct || 'None'} has the highest complaints. Immediate focus should be on resolving ${highPriorityCount} high-priority tickets and addressing bottlenecks in ${stats.topCategory || 'None'}.`;
  };

  return (
    <div className="summary">
      <h3 className="summary-title">🎯 Manager Summary</h3>
      <p className="summary-text">{generateSummary()}</p>
    </div>
  );
}
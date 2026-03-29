export default function Table({data}){
  const displayData = data.unresolved.slice(0, 10);
  
  const getStuckReason = (ticket) => {
    const reasons = [];
    
    // Priority-based reasons
    if (ticket.Priority === 'high') {
      reasons.push('Critical priority - immediate escalation needed');
    } else if (ticket.Priority === 'medium') {
      reasons.push('Medium priority - follow-up required within 24hrs');
    } else {
      reasons.push('Low priority - standard queue processing');
    }
    
    // Category-based reasons
    switch (ticket.mainCategory) {
      case 'product issue':
        reasons.push('Product defect - investigation or replacement pending');
        break;
      case 'delivery issue':
        reasons.push('Shipping/logistics delay - carrier coordination needed');
        break;
      case 'order issue':
        reasons.push('Order processing error - inventory or fulfillment check');
        break;
      case 'refund/replacement':
        reasons.push('Financial processing - approval workflow bottleneck');
        break;
      case 'damaged product':
        reasons.push('Quality control - inspection and replacement required');
        break;
      default:
        reasons.push('General inquiry - awaiting agent response');
    }
    
    return reasons.join(' | ');
  };
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Category</th>
          <th>Priority</th>
          <th>Stuck Reason</th>
        </tr>
      </thead>
      <tbody>
        {displayData.map((r,i)=>(
          <tr key={i}>
            <td>{r["Ticket ID"]}</td>
            <td>{r.Product}</td>
            <td>{r.mainCategory}</td>
            <td><span className={`badge ${r.Priority}`}>{r.Priority}</span></td>
            <td style={{fontSize: '0.9em', color: '#64748b'}}>{getStuckReason(r)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
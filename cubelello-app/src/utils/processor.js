import { CATEGORY_MAPPING, STATUS_MAPPING, PRIORITY_MAPPING, STUCK_REASONS } from './constants.js';

// Helper function to parse dates in multiple formats
function parseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const trimmed = dateString.trim();

  // Try YYYY-MM-DD format first (ISO format)
  let date = new Date(trimmed);
  if (!isNaN(date.getTime())) {
    return date;
  }

  // Try DD-MM-YYYY format
  const ddmmyyyyMatch = trimmed.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Try MM/DD/YYYY format
  const mmddyyyyMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (mmddyyyyMatch) {
    const [, month, day, year] = mmddyyyyMatch;
    date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Try DD/MM/YYYY format
  const ddmmyyyySlashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyySlashMatch) {
    const [, day, month, year] = ddmmyyyySlashMatch;
    date = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null; // Invalid date
}

export function processData(rows) {
  if (rows.length === 0) {
    throw new Error('No data rows found in CSV');
  }

  // Check what columns are actually present
  const availableColumns = Object.keys(rows[0]);
  const requiredFields = ['Ticket ID', 'Date', 'Customer Name', 'Product', 'Issue Description', 'Priority'];
  const optionalFields = ['Category', 'Status']; // Category and Status are now optional

  // Check for missing required columns
  const missingColumns = requiredFields.filter(field => !availableColumns.includes(field));
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}. Found columns: ${availableColumns.join(', ')}`);
  }

  const processed = rows.map((row, index) => {
    // Validate required fields are not empty
    const rowNumber = index + 2; // +2 because index 0 is row 2 in CSV (after header)
    for (const field of requiredFields) {
      if (!row[field] || row[field].trim() === '') {
        throw new Error(`Missing required field "${field}" in row ${rowNumber} (Ticket: ${row['Ticket ID'] || 'Unknown'})`);
      }
    }

    // Handle optional Category field - default to "other" if missing/empty
    const category = (row.Category && row.Category.trim()) ? row.Category.trim() : 'other';

    // Handle optional Status field - default to "open" if missing/empty
    const status = (row.Status && row.Status.trim()) ? row.Status.trim() : 'open';

    const date = parseDate(row.Date);
    if (!date) {
      throw new Error(`Invalid date format: "${row.Date}" in row ${rowNumber} (Ticket: ${row['Ticket ID'] || 'Unknown'}). Supported formats: YYYY-MM-DD, DD-MM-YYYY, MM/DD/YYYY, DD/MM/YYYY`);
    }

    return {
      ...row,
      Category: category, // Ensure Category field exists
      Status: status, // Ensure Status field exists
      normalizedCategory: normalizeCategory(category),
      normalizedStatus: normalizeStatus(status),
      normalizedPriority: normalizePriority(row.Priority),
      date: date
    };
  });

  return {
    tickets: processed,
    totalTickets: processed.length,
    unresolvedTickets: processed.filter(t => t.normalizedStatus === 'open'),
    resolvedTickets: processed.filter(t => t.normalizedStatus === 'closed')
  };
}

export function generateSummary(data) {
  const { tickets, totalTickets, unresolvedTickets, resolvedTickets } = data;

  const resolutionRate = totalTickets > 0 ? ((resolvedTickets.length / totalTickets) * 100).toFixed(1) : 0;

  const categoryCounts = {};
  tickets.forEach(ticket => {
    const cat = ticket.normalizedCategory;
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  const productCounts = {};
  tickets.forEach(ticket => {
    const prod = ticket.Product;
    productCounts[prod] = (productCounts[prod] || 0) + 1;
  });

  const topProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  // Calculate top problematic products based on unresolved tickets
  const unresolvedProductCounts = {};
  unresolvedTickets.forEach(ticket => {
    const prod = ticket.Product;
    unresolvedProductCounts[prod] = (unresolvedProductCounts[prod] || 0) + 1;
  });

  const topProblematicProducts = Object.entries(unresolvedProductCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([product, count]) => ({ product, count }));

  const priorityCounts = { high: 0, medium: 0, low: 0 };
  tickets.forEach(ticket => {
    const pri = ticket.normalizedPriority;
    if (pri && priorityCounts.hasOwnProperty(pri)) {
      priorityCounts[pri] = (priorityCounts[pri] || 0) + 1;
    } else {
      // Default to medium if priority is not recognized
      priorityCounts.medium = (priorityCounts.medium || 0) + 1;
    }
  });

  // Trend analysis
  const dailyCounts = {};
  tickets.forEach(ticket => {
    const dateStr = ticket.date.toISOString().split('T')[0];
    dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
  });

  const dates = Object.keys(dailyCounts).sort();
  const counts = dates.map(date => dailyCounts[date]);
  
  let anomalies = [];
  if (counts.length > 0) {
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    const variance = counts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / counts.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + 2 * stdDev;
    anomalies = dates.filter((date, i) => counts[i] > threshold);
  }

  return {
    totalTickets,
    unresolvedCount: unresolvedTickets.length,
    resolutionRate: parseFloat(resolutionRate),
    topCategory,
    topProduct,
    topProblematicProducts,
    categoryDistribution: categoryCounts,
    priorityDistribution: priorityCounts,
    trendData: dates.map((date, i) => ({ date, count: counts[i] })),
    anomalies
  };
}

export function generateStuckReason(category) {
  const normalized = normalizeCategory(category);
  return STUCK_REASONS[normalized] || STUCK_REASONS.other;
}

function normalizeCategory(raw) {
  if (!raw) return 'Other';

  const lower = raw.toLowerCase().trim();

  // Direct mapping first
  if (CATEGORY_MAPPING[lower]) {
    return CATEGORY_MAPPING[lower];
  }

  // Partial matching for more flexibility
  if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('logistic') || lower.includes('carrier')) {
    return 'Delivery';
  }
  if (lower.includes('product') || lower.includes('quality') || lower.includes('defect') || lower.includes('broken') || lower.includes('technical') || lower.includes('function')) {
    return 'Product';
  }
  if (lower.includes('order') || lower.includes('wrong item') || lower.includes('missing item') || lower.includes('billing') || lower.includes('account') || lower.includes('purchase')) {
    return 'Order';
  }
  if (lower.includes('refund') || lower.includes('replacement') || lower.includes('return') || lower.includes('cancel') || lower.includes('payment')) {
    return 'Refund';
  }
  if (lower.includes('damage') || lower.includes('damaged') || lower.includes('broken')) {
    return 'Damaged';
  }
  if (lower.includes('other') || lower.includes('general') || lower.includes('inquiry') || lower.includes('question')) {
    return 'Other';
  }

  // If no match found, return Other
  return 'Other';
}

function normalizeStatus(raw) {
  const lower = raw.toLowerCase();
  return STATUS_MAPPING[lower] || 'open';
}

function normalizePriority(raw) {
  const lower = raw.toLowerCase();
  return PRIORITY_MAPPING[lower] || 'medium';
}

export function filterTickets(tickets, filters) {
  return tickets.filter(ticket => {
    if (filters.category && ticket.normalizedCategory !== filters.category) return false;
    if (filters.priority && ticket.normalizedPriority !== filters.priority) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!ticket['Ticket ID'].toLowerCase().includes(searchLower) &&
          !ticket.Product.toLowerCase().includes(searchLower)) return false;
    }
    return true;
  });
}

export function exportToCSV(tickets) {
  const headers = ['Ticket ID', 'Customer Name', 'Product', 'Category', 'Priority', 'Stuck Reason'];
  const csvContent = [
    headers.join(','),
    ...tickets.map(ticket => [
      ticket['Ticket ID'],
      ticket['Customer Name'],
      ticket.Product,
      ticket.normalizedCategory,
      ticket.normalizedPriority,
      generateStuckReason(ticket.Category)
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'unresolved_tickets.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
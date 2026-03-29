export const REQUIRED_COLS = [
  "Ticket ID","Date","Customer Name","Product",
  "Issue Description","Category","Status","Priority"
];

// ─────────────────────────────────────────────

const CATEGORY_MAP = {
  "quality":"product issue","defect":"product issue",
  "delivery":"delivery issue","shipping":"delivery issue",
  "wrong item":"order issue","missing item":"order issue",
  "refund":"refund/replacement","replacement":"refund/replacement",
  "damaged":"damaged product","damaged product":"damaged product",
};

// ─────────────────────────────────────────────

export function mapCategory(raw){
  const r = (raw || "").toString().toLowerCase().trim();

  if (CATEGORY_MAP[r]) return CATEGORY_MAP[r];

  for (const k in CATEGORY_MAP){
    if (r.includes(k)) return CATEGORY_MAP[k];
  }

  return "other";
}

// ─────────────────────────────────────────────
// FIXED CSV PARSER (handles commas inside quotes)
// ─────────────────────────────────────────────

export function parseCSV(text){
  const lines = text.trim().split("\n");

  const headers = lines[0]
    .split(",")
    .map(h => h.trim().replace(/^"|"$/g, ""));

  return lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = [];
    let cur = "", inQuotes = false;

    for (let ch of line) {
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        vals.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    vals.push(cur.trim());

    let obj = {};
    headers.forEach((h,i)=>{
      obj[h] = (vals[i] || "").trim();
    });

    return obj;
  });
}

// ─────────────────────────────────────────────

export function processData(rows){

  let cleaned = rows.map(r => ({
    ...r,
    Status: (r.Status || "open").toLowerCase().trim(),
    Priority: (r.Priority || "low").toLowerCase().trim(),
    Product: r.Product || "Unknown",
    mainCategory: mapCategory(r.Category || "other")
  }));

  let total = cleaned.length;

  // PRIORITY ORDER
  const priOrder = { high:3, medium:2, low:1 };

  let unresolved = cleaned
    .filter(r => r.Status === "open")
    .sort((a,b)=>(priOrder[b.Priority]||0)-(priOrder[a.Priority]||0));

  let resolved = cleaned.filter(r => r.Status !== "open");

  let unresPct = total ? ((unresolved.length/total)*100).toFixed(1) : "0";
  let resolutionRate = total ? ((resolved.length/total)*100).toFixed(1) : "0";

  // CATEGORY COUNT
  let catCount = {};
  cleaned.forEach(r=>{
    catCount[r.mainCategory] = (catCount[r.mainCategory] || 0) + 1;
  });

  let topCat = Object.entries(catCount).sort((a,b)=>b[1]-a[1])[0] || ["N/A",0];

  // PRODUCT COUNT
  let prodCount = {};
  cleaned.forEach(r=>{
    prodCount[r.Product] = (prodCount[r.Product] || 0) + 1;
  });

  let topProd = Object.entries(prodCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";

  let topProducts = Object.entries(prodCount)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5)
    .map(([name,count])=>({name,count}));

  // PRIORITY COUNT
  let priorityCount = {};
  cleaned.forEach(r=>{
    priorityCount[r.Priority] = (priorityCount[r.Priority] || 0) + 1;
  });

  return {
    total,
    unresolved,
    resolved,
    unresPct,
    resolutionRate,
    catCount,
    topCat,
    topProd,
    topProducts,
    prodCount,
    priorityCount
  };
}

// ─────────────────────────────────────────────

export function generateSummary(stats){

  const topCatName = stats.topCat?.[0] || "N/A";
  const topProd = stats.topProd || "N/A";
  const highPriCount = stats.priorityCount?.high || 0;
  const unresolvedCount = stats.unresolved.length;

  return `📊 ${stats.total} tickets processed | ${unresolvedCount} unresolved (${stats.unresPct}%)
🎯 Focus: ${topCatName} issues | ${topProd} needs attention
⚡ Priority: ${highPriCount} high-priority tickets require immediate action
🚀 Action: Escalate critical cases | Improve ${topCatName} resolution process
📈 Goal: Target ${Math.max(85, parseFloat(stats.resolutionRate) + 5)}% resolution rate this quarter`;
}
export const REQUIRED_COLUMNS = [
  "Ticket ID",
  "Date",
  "Customer Name",
  "Product",
  "Issue Description",
  "Priority"
];

export const OPTIONAL_COLUMNS = [
  "Category", // defaults to "other" if missing
  "Status"    // defaults to "open" if missing
];

export const CATEGORY_MAPPING = {
  // Exact matches
  "delivery issue": "Delivery",
  "product issue": "Product",
  "order issue": "Order",
  "refund": "Refund",
  "damaged": "Damaged",
  "other": "Other",
  "delivery": "Delivery",
  "product": "Product",
  "order": "Order",
  "damage": "Damaged",
  "shipping": "Delivery",
  "shipping issue": "Delivery",
  "quality": "Product",
  "quality issue": "Product",
  "defect": "Product",
  "broken": "Product",
  "wrong item": "Order",
  "missing item": "Order",
  "replacement": "Refund",
  "return": "Refund",
  "general": "Other",
  "inquiry": "Other",
  "technical": "Product",
  "technical issue": "Product",
  "billing": "Order",
  "billing issue": "Order",
  "account": "Order",
  "account issue": "Order",
  "payment": "Refund",
  "payment issue": "Refund",
  "cancel": "Refund",
  "cancellation": "Refund"
};

export const STATUS_MAPPING = {
  "open": "open",
  "pending": "open",
  "in progress": "open",
  "resolved": "closed",
  "closed": "closed",
  "cancelled": "closed"
};

export const PRIORITY_MAPPING = {
  "urgent": "high",
  "high": "high",
  "medium": "medium",
  "low": "low",
  "normal": "medium"
};

export const STUCK_REASONS = {
  "Delivery": "No update from logistics team",
  "Product": "Quality under review",
  "Order": "Verification pending",
  "Refund": "Pending approval",
  "Damaged": "Replacement not processed",
  "Other": "Needs investigation"
};
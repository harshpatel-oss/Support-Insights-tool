# Ticket Analytics Dashboard

A modern, interactive React + Vite application for analyzing and visualizing customer support ticket data. Upload CSV files containing ticket information and instantly get actionable insights through charts, metrics, and an analytics dashboard.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite)

---

## Live Demo

**Try it now:** https://ticket-analytics.netlify.app

Upload a sample CSV file to see the analytics dashboard in action!

---

## 🎯 Features

- **CSV Upload** - Upload ticket data via drag-and-drop or file picker.
- **Data Validation** - Validates required columns and formats dates reliably.
- **Automatic Normalization** - Normalizes category, status, and priority values.
- **Dashboard Visuals** - Displays KPI cards, category charts, and trend charts.
- **Unresolved Tickets Table** - Shows open tickets and automatically generated stuck reasons.
- **Filtering** - Filter tickets by category, priority, and keyword search.
- **Error Handling** - Displays helpful errors for invalid files or missing data.
- **Responsive Design** - Works well across desktop and mobile.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Charting Library**: Recharts 3.8.1
- **Linting**: ESLint
- **Styling**: CSS
- **Recommended Node Version**: 16+

---

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- Modern web browser

---

## 🚀 Quick Start

### 1. Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd cubelello-app
```

Install dependencies:

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
cubelello-app/
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── Dashboard.jsx
│   │   ├── Charts.jsx
│   │   ├── Table.jsx
│   │   ├── Summary.jsx
│   │   ├── Upload.jsx
│   │   ├── Filters.jsx
│   │   └── ErrorBoundary.jsx
│   ├── styles/
│   │   └── main.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── parser.js
│   │   └── processor.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── vite.config.js
├── eslint.config.js
├── index.html
└── package.json
```

---

## 📊 CSV File Format

The application expects CSV files with these columns:

| Column | Required | Description |
|--------|----------|-------------|
| Ticket ID | Yes | Unique ticket identifier |
| Date | Yes | Ticket date |
| Customer Name | Yes | Customer name |
| Product | Yes | Product or service |
| Issue Description | Yes | Issue details |
| Priority | Yes | `high`, `medium`, `low` |
| Category | No | Optional issue category |
| Status | No | Optional ticket status |

### Notes

- `Category` and `Status` are optional.
- Missing `Category` defaults to `Other`.
- Missing `Status` defaults to `Open`.
- Supported date formats: `YYYY-MM-DD`, `DD-MM-YYYY`, `MM/DD/YYYY`, `DD/MM/YYYY`.

### Category Mapping

The app normalizes many common category values into these buckets:

- **Delivery**: `delivery`, `delivery issue`, `shipping`, `shipping issue`, `logistic`
- **Product**: `product`, `product issue`, `quality`, `defect`, `broken`, `technical`
- **Order**: `order`, `order issue`, `wrong item`, `missing item`, `billing`, `account`
- **Refund**: `refund`, `replacement`, `return`, `cancel`, `payment`
- **Damaged**: `damaged`, `damage`, `broken`
- **Other**: all other values

### Sample CSV

```csv
Ticket ID,Date,Customer Name,Product,Issue Description,Category,Status,Priority
TICK001,2024-01-15,John Doe,Widget Pro,Button not responding,quality,Open,high
TICK002,2024-01-14,Jane Smith,Gadget X,Package delayed,delivery,Open,medium
TICK003,2024-01-13,Bob Wilson,Widget Pro,Wrong color received,wrong item,Resolved,low
```

---

## 🎮 Usage

1. Start the app with `npm run dev`.
2. Upload a CSV file by dragging it onto the upload area or selecting it manually.
3. Review the dashboard analytics:
   - KPI cards for total tickets, unresolved tickets, resolution rate, and priority distribution
   - Category and trend charts
   - Unresolved ticket table with generated stuck reasons
   - Filters for category, priority, and search
4. Upload a new file to refresh the dashboard.

---

## 🔧 Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 📈 Data Processing

The app processes CSV data through:

1. **Parsing** - CSV string to rows
2. **Validation** - Required columns validation
3. **Transformation** - Category/status/priority normalization and aggregation
4. **Analysis** - Resolution rate, category counts, priority counts, and trend data

---

## 🎨 Styling

The app uses a clean, responsive design with:
- Responsive grid layouts
- Card-based UI
- Color-coded metrics
- Smooth hover effects
- Mobile-friendly layout

Customize styling in:
- `src/App.css`
- `src/index.css`

---

## 🐛 Error Handling

The application provides user-friendly error handling:
- **Invalid CSV Format** - Clear message indicating file type requirement
- **Missing Data** - Alerts when CSV contains no rows
- **Processing Errors** - Displayed with recovery options
- **Try Again** - Easy reset to retry with different file

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Then deploy the dist/ folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Push the dist/ folder to your gh-pages branch
```

---

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Recharts Documentation](https://recharts.org/api/LineChart)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Ensure ESLint passes: `npm run lint`
- Test your changes locally: `npm run dev`
- Write clear commit messages

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first to avoid duplicates

---

## 🎓 Learning Resources

This project demonstrates:
- React functional components and hooks
- Vite bundling and hot module replacement
- CSV parsing and data transformation
- React charting with Recharts
- Responsive web design
- Error handling and user feedback
- Component composition patterns

---

**Built with ❤️ using React and Vite**
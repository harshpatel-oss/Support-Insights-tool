# Ticket Analytics Dashboard

A modern, interactive web application for analyzing and visualizing customer support ticket data. Upload CSV files containing ticket information and instantly get actionable insights through charts, metrics, and comprehensive analytics.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## � Live Demo

**Try it now:** [https://ticket-analytics.netlify.app](https://ticket-analytics.netlify.app)

Upload a sample CSV file to see the analytics dashboard in action!

---

## �🎯 Features

- **📤 Drag & Drop File Upload** - Easily upload CSV files with drag-and-drop or file browser
- **📊 Interactive Analytics Dashboard** - Real-time visualization of ticket data with beautiful charts
- **📈 Key Metrics** - Display essential KPIs:
  - Total tickets count
  - Unresolved tickets
  - Resolution rate percentage
  - High priority tickets
- **📋 Data Visualization** - Charts showing issue categories and their distribution
- **🔍 Detailed Table View** - Browse top unresolved tickets with full details
- **💡 Smart Insights** - Automated analysis highlighting:
  - Top issue categories
  - Common problems
  - Average resolution insights
- **⚡ Fast Processing** - CSV parsing and data processing with loading indicators
- **✅ Error Handling** - Clear error messages and recovery options
- **🎨 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) 19.2.4
- **Build Tool**: [Vite](https://vitejs.dev/) 8.0.1
- **Charting Library**: [Recharts](https://recharts.org/) 3.8.1
- **Styling**: CSS with responsive grid layout
- **Linting**: ESLint with React plugins
- **Node Version**: 16+ recommended

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- A modern web browser

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

### 2. Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your terminal).

### 3. Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
cubelello-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx  # Main dashboard container
│   │   ├── Charts.jsx     # Data visualization charts
│   │   ├── Table.jsx      # Unresolved tickets table
│   │   ├── Summary.jsx    # Key insights summary
│   │   └── Upload.jsx     # File upload component
│   ├── App.jsx            # Root component
│   ├── App.css            # App styling
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
│   └── utils.js           # Utility functions (CSV parsing, data processing)
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
└── package.json           # Project dependencies
```

---

## 📊 CSV File Format

The application expects CSV files with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| **Ticket ID** | Unique identifier | `TICK001` |
| **Date** | Ticket date | `2024-01-15` |
| **Customer Name** | Customer name | `John Doe` |
| **Product** | Product related to issue | `Widget Pro` |
| **Issue Description** | Detailed issue | `Button not working` |
| **Category** | Issue category | `product issue`, `delivery issue`, `order issue`, `refund/replacement`, `damaged product`, `other` |
| **Status** | Ticket status | `Open`, `Resolved`, `In Progress` |
| **Priority** | Priority level | `high`, `medium`, `low` |

### Supported Category Mappings

The application automatically maps common category variations:
- **Product Issues**: `quality`, `defect`
- **Delivery Issues**: `delivery`, `shipping`
- **Order Issues**: `wrong item`, `missing item`
- **Refund/Replacement**: `refund`, `replacement`
- **Damaged Products**: `damaged`, `damaged product`
- **Other**: Any uncategorized issues

### Sample CSV

```csv
Ticket ID,Date,Customer Name,Product,Issue Description,Category,Status,Priority
TICK001,2024-01-15,John Doe,Widget Pro,Button not responding,quality,Open,high
TICK002,2024-01-14,Jane Smith,Gadget X,Package delayed,delivery,Open,medium
TICK003,2024-01-13,Bob Wilson,Widget Pro,Wrong color received,wrong item,Resolved,low
```

---

## 🎮 Usage

1. **Open the Application**
   - Navigate to the running development server

2. **Upload Your Data**
   - Drag and drop a CSV file onto the upload area, or
   - Click to browse and select a CSV file

3. **View Analytics**
   - The dashboard auto-loads with:
     - Key metrics at the top
     - Issue category charts
     - Table of unresolved tickets
     - Actionable insights

4. **Upload New Data**
   - Click "📤 Upload New File" to analyze another dataset

---

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build
npm run preview

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

---

## 📈 Data Processing

The application processes CSV data through:

1. **Parsing** - CSV string to row arrays
2. **Validation** - Checks for required columns
3. **Transformation**:
   - Category normalization using mapping rules
   - Status classification (resolved vs unresolved)
   - Priority grouping
   - Data aggregation
4. **Analysis**:
   - Calculate resolution rate
   - Count tickets by priority, category, and status
   - Generate summary statistics

---

## 🎨 Styling

The application uses a modern, professional design with:
- Responsive grid layouts
- Dark card-based interface
- Color-coded metrics and indicators
- Smooth transitions and hover effects
- Mobile-friendly responsive design

Customize styling in:
- [App.css](./src/App.css) - Component styles
- [index.css](./src/index.css) - Global styles

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
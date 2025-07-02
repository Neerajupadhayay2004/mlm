# MLM Frontend

React-based frontend for the MLM System.

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── admin/          # Admin components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   ├── ui/             # Shadcn UI components
│   └── user/           # User dashboard components
├── context/            # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions
└── mock/               # Mock data
\`\`\`

## 🎨 UI Components

Built with Shadcn/ui components:
- Buttons, Cards, Forms
- Dialogs, Dropdowns, Tables
- Navigation, Tabs, Tooltips
- And many more...

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_ENVIRONMENT`: Environment (development/production)

### Tailwind CSS
Configured with custom theme and animations.

### CRACO
Used for custom webpack configuration and path aliases.

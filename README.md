# PlayTrace - QA Testing Tool

A modern, full-stack QA testing tool built with TypeScript, featuring both frontend and backend in a single repository.

## 🚀 Features

- **Test Case Management**: Create, edit, and delete test cases with detailed steps and expected results
- **Test Execution Tracking**: Record test runs with actual results and execution time
- **Test Suites**: Organize test cases into logical suites
- **Dashboard**: Visual overview of test statistics and pass rates
- **Priority Levels**: Mark test cases as low, medium, high, or critical priority
- **Status Tracking**: Track test cases as pending, passed, failed, or blocked

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **CORS** enabled for cross-origin requests
- RESTful API design

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API calls
- Modern CSS with CSS variables

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** (comes with Node.js)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/DamianKrotowski/Placeholder.git
cd Placeholder
```

2. Install dependencies for both frontend and backend:
```bash
npm install
```

This will install dependencies for the root project and both workspaces (frontend and backend).

## 🚀 Running the Application

### Development Mode (Both Frontend & Backend)

Run both frontend and backend simultaneously:
```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:3001`
- Frontend on `http://localhost:3000`

### Run Backend Only

```bash
npm run dev:backend
```

### Run Frontend Only

```bash
npm run dev:frontend
```

## 🏗️ Building for Production

Build both frontend and backend:
```bash
npm run build
```

Build individually:
```bash
npm run build:backend
npm run build:frontend
```

## 🌐 API Endpoints

### Test Cases
- `GET /api/tests/cases` - Get all test cases
- `GET /api/tests/cases/:id` - Get a specific test case
- `POST /api/tests/cases` - Create a new test case
- `PUT /api/tests/cases/:id` - Update a test case
- `DELETE /api/tests/cases/:id` - Delete a test case

### Test Runs
- `GET /api/tests/runs` - Get all test runs
- `GET /api/tests/runs?testCaseId=:id` - Get runs for a specific test case
- `POST /api/tests/runs` - Create a new test run

### Test Suites
- `GET /api/tests/suites` - Get all test suites
- `GET /api/tests/suites/:id` - Get a specific test suite
- `POST /api/tests/suites` - Create a new test suite

### Health Check
- `GET /api/health` - Check if API is running

## 📁 Project Structure

```
Placeholder/
├── backend/                 # Backend Node.js/Express application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── models/         # TypeScript types/interfaces
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Backend entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript types
│   │   ├── styles/        # CSS styles
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Frontend entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json           # Root package.json (workspace config)
├── tsconfig.json          # Shared TypeScript config
└── README.md
```

## 💡 Usage Guide

### Creating a Test Case

1. Navigate to the "Test Cases" page
2. Click "+ New Test Case"
3. Fill in the form:
   - **Title**: Brief description of the test
   - **Description**: Detailed explanation
   - **Steps**: List of steps (one per line)
   - **Expected Result**: What should happen
   - **Priority**: Select priority level
4. Click "Create Test Case"

### Viewing Dashboard

The Dashboard provides:
- Total test case count
- Number of passed, failed, pending, and blocked tests
- Overall pass rate with visual progress bar

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory (use `.env.example` as template):

```env
PORT=3001
NODE_ENV=development
```

## 🚧 Future Enhancements

- User authentication and authorization
- Database integration (MongoDB/PostgreSQL)
- Test execution scheduling
- Email notifications
- Export test reports (PDF/Excel)
- Advanced filtering and search
- Test case versioning
- Integration with CI/CD pipelines

## 📝 Notes

This is an MVP (Minimum Viable Product) designed as a QA testing tool. The current version uses in-memory storage, which means data is lost when the server restarts. For production use, integrate with a database.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

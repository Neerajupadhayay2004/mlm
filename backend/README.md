# MLM Backend

FastAPI-based backend for the MLM System.

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn server:app --reload

# Run tests
python -m pytest tests/
\`\`\`

## 📁 Project Structure

\`\`\`
backend/
├── server.py           # Main FastAPI application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
└── tests/             # Test files
\`\`\`

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### User Management
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/downline` - Get user downline

### Admin
- `GET /admin/users` - Get all users
- `GET /admin/stats` - Get system statistics
- `PUT /admin/users/{id}` - Update user

## 🗄️ Database

MongoDB collections:
- `users` - User accounts and profiles
- `referrals` - Referral relationships
- `earnings` - Commission records
- `withdrawals` - Withdrawal requests

## 🔐 Authentication

JWT-based authentication with:
- Access tokens (30 min expiry)
- Password hashing with bcrypt
- Role-based access control

## 🌍 Environment Variables

- `DATABASE_URL`: MongoDB connection string
- `SECRET_KEY`: JWT secret key
- `CORS_ORIGINS`: Allowed CORS origins

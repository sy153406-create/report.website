# 🎯 AI Habit Coach - Build Habits. Track Progress. Stay Consistent.

A comprehensive web application for tracking habits with streak management, progress monitoring, rewards system, and an AI Coach chatbot powered by Google Gemini AI.

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Session management with localStorage

### 📊 Dashboard
- Real-time statistics (streak, points, habits)
- Progress charts (7-day and 30-day views)
- Active habits display
- Achievement badges
- Sidebar with user stats

### 🎯 Habit Management
- Create habits from templates or custom
- 4 habit categories: Health, Productivity, Mindfulness, Personal Growth
- Track difficulty levels: Low, Moderate, High
- View habit details and completion history
- Delete habits

### 🏆 Streak System
- Automatic streak tracking
- Streak resets if missed a day
- Personal and longest streak records
- Visual streak badges (🔥)

### ⭐ Reward System
- Points awarded based on difficulty:
  - Low: 10 points
  - Moderate: 20 points
  - High: 50 points
- Total points display on dashboard
- Achievement badges unlocked at milestones

### 📈 Progress Tracking
- Daily completion graph
- 7-day and 30-day filters
- Completion history per habit
- Progress percentage per habit

### 🤖 AI Coach Chat
- Real-time chat interface
- AI-powered responses using Google Gemini
- Context-aware coaching based on user stats
- Motivational messages and suggestions

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **JavaScript (ES6+)** - Client-side logic and API calls
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **axios** - HTTP client
- **dotenv** - Environment variables

### External APIs
- **Google Gemini 2.0 Flash** - AI responses

## 📁 Project Structure

```
ai-habit-coach/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Habit.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── habits.js
│   │   ├── tasks.js
│   │   └── ai.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── assets/
│   │   ├── styles.css
│   │   ├── auth.js
│   │   └── dashboard.js
│   ├── index.html (Login/Signup)
│   ├── dashboard.html
│   ├── my-habits.html
│   └── habit-details.html
├── package.json
├── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google AI API key

### Installation

1. **Clone the repository**
```bash
cd d:/report.website2
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
Edit `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/ai-habit-coach
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
API_BASE_URL=http://localhost:5000
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Google AI API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Update `GOOGLE_AI_API_KEY` in `.env`

### Running the Application

1. **Start the server**
```bash
npm start
# Or use nodemon for development
npm run dev
```

2. **Access the application**
```
http://localhost:5000
```

## 📖 User Flow

```
1. Sign Up/Login
   ↓
2. Dashboard (View stats, active habits, progress)
   ↓
3. My Habits (Create new habits from templates or custom)
   ↓
4. Select Habit
   ↓
5. Choose Difficulty Level
   ↓
6. Complete Task
   ↓
7. Earn Points & Maintain Streak
   ↓
8. Chat with AI Coach for motivation & tips
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Habits
- `POST /api/habits/create` - Create new habit
- `GET /api/habits/all` - Get all user habits
- `GET /api/habits/:habitId` - Get specific habit
- `PUT /api/habits/:habitId` - Update habit
- `DELETE /api/habits/:habitId` - Delete habit

### Tasks
- `POST /api/tasks/complete` - Complete a task
- `GET /api/tasks/history/:habitId` - Get habit completion history
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics

### AI Chat
- `POST /api/ai/chat` - Send message to AI Coach

## 📱 Features in Detail

### Dashboard Features
- **Stats Display**: Current streak, total points, longest streak
- **Progress Chart**: Visual representation of daily completions
- **Habit Cards**: Quick view of all active habits
- **AI Coach Chat**: Real-time AI responses with context

### My Habits Features
- **Habit Templates**: Pre-built habits in 4 categories
  - Health: Water intake, exercise, sleep, walking
  - Productivity: Reading, journaling, learning, organization
  - Mindfulness: Meditation, gratitude, breathing, digital detox
  - Personal Growth: New skills, connections, goal review, reflection
- **Custom Habits**: Create completely custom habits
- **Difficulty Levels**: Easy, Moderate, Hard with point rewards

### Habit Details Features
- **Difficulty Selection**: Choose task difficulty for points
- **Task Descriptions**: Different descriptions per difficulty
- **Feedback Box**: Record daily reflections
- **Completion History**: View all past completions
- **Progress Tracking**: Visual progress bar

### AI Coach Features
- **Context-Aware**: Uses user stats and history
- **Motivational**: Personalized coaching messages
- **Smart Suggestions**: Recommends difficulty levels and recovery plans
- **Progress Analysis**: Analyzes weekly performance

## 🎨 Design Features

### Color Scheme
- **Primary**: #00D4FF (Cyan)
- **Accents**: #FFB3B3 (Pink), #D4FF00 (Yellow), #B4FF00 (Green)
- **Dark**: #1A1F3A (Background)
- **Light**: #FFFFFF (Cards)

### UI Components
- Rounded corners (12px)
- Card-based layout
- Sidebar navigation
- Progress bars
- Chat bubbles
- Achievement badges
- Responsive grid system

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  totalPoints: Number,
  totalHabits: Number,
  currentStreak: Number,
  longestStreak: Number,
  lastActivityDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Habit Collection
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  category: String,
  difficulty: String,
  estimatedTime: Number,
  currentStreak: Number,
  longestStreak: Number,
  lastCompletedDate: Date,
  completionDays: Number,
  progressPercentage: Number,
  habitPoints: Number,
  completionHistory: Array,
  isActive: Boolean,
  createdAt: Date
}
```

### Task Collection
```javascript
{
  habitId: ObjectId,
  userId: ObjectId,
  difficulty: String,
  points: Number,
  feedback: String,
  completedAt: Date,
  createdAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data not hardcoded
- **Input Validation**: Server-side validation on all endpoints
- **Authentication Middleware**: Protected routes

## 🚨 Error Handling

- Try-catch blocks in all async operations
- User-friendly error messages
- Validation on both client and server
- Proper HTTP status codes
- Detailed console logging for debugging

## 📱 Responsive Design

- Desktop-first approach
- Breakpoints: 1200px, 768px, 480px
- Mobile-optimized layouts
- Touch-friendly buttons
- Flexible grid system

## 🎯 Points System

| Difficulty | Points | Use Case |
|-----------|--------|----------|
| Low | 10 | Build habit routine |
| Moderate | 20 | Regular practice |
| High | 50 | Challenge yourself |

## 🏆 Achievements

- Unlock badges at milestones
- Track across multiple habits
- Visual achievement display
- Motivational rewards

## 🛣️ Roadmap

Future enhancements:
- Social sharing of achievements
- Leaderboards
- Habit recommendations based on AI analysis
- Export progress reports
- Mobile app
- Push notifications
- Habit templates from community
- Advanced analytics
- Goal-based habit groups

## 📝 Notes

1. **Local Development**: MongoDB should be running on localhost:27017
2. **Production**: Update all environment variables before deployment
3. **API Keys**: Never commit `.env` file to version control
4. **CORS**: Configure as needed for production domain

## 🤝 Contributing

Feel free to contribute by:
- Reporting bugs
- Suggesting features
- Improving documentation
- Submitting pull requests

## 📄 License

This project is open-source and available under the MIT License.

## 🆘 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
mongod
```

### Port 5000 Already in Use
```
Solution: Change PORT in .env or kill the process using port 5000
```

### API Key Error
```
Solution: Verify GOOGLE_AI_API_KEY is correct and has valid quota
```

### CORS Error
```
Solution: Update API_BASE_URL in frontend to match backend URL
```

## 📧 Support

For issues, questions, or feedback, feel free to reach out!

---

**Happy habit tracking! 🎯** Build consistency. Change your life. 💪

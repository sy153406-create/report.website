# 🚀 Quick Start Guide - AI Habit Coach

## 5-Minute Setup

### Step 1: Install Node Modules
```bash
cd d:/report.website2
npm install
```
**Time: 1-2 minutes**

### Step 2: Setup MongoDB
Choose one option:

**Option A: Local MongoDB (Recommended for Testing)**
- Install MongoDB Community: https://www.mongodb.com/try/download/community
- Start MongoDB:
  ```bash
  mongod
  ```
- MongoDB runs on `localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-habit-coach
   ```

### Step 3: Get Google AI API Key
1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Update `.env`:
   ```
   GOOGLE_AI_API_KEY=your_key_here
   ```

### Step 4: Update .env File
```
MONGODB_URI=mongodb://localhost:27017/ai-habit-coach
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
GOOGLE_AI_API_KEY=your_google_ai_key
API_BASE_URL=http://localhost:5000
```

### Step 5: Start the Server
```bash
npm start
```

**Output should show:**
```
✅ MongoDB connected successfully
🚀 AI Habit Coach server running on http://localhost:5000
```

### Step 6: Access the App
Open browser and go to:
```
http://localhost:5000
```

## ✅ Verify Everything Works

1. **Sign Up Page** - Create a test account
   - Email: test@example.com
   - Password: Test123456

2. **Dashboard** - Should show:
   - ✅ Stats cards (Streak, Points, Habits)
   - ✅ Empty habits list
   - ✅ AI Coach chat panel
   - ✅ Progress chart

3. **Create Habit**
   - Click "Create New Habit"
   - Select a template or create custom
   - Should redirect to dashboard

4. **Complete Habit**
   - Click "Complete" on a habit
   - Should earn points
   - Stats should update

5. **Chat with AI**
   - Type message "How am I doing?"
   - Should get AI response

## 🎯 Test User Flow

```
1. Sign Up → test@example.com / Test123456
   ↓
2. Dashboard (Empty state)
   ↓
3. My Habits → Create "Exercise 30 minutes"
   ↓
4. Dashboard → Habit appears
   ↓
5. Click Complete → Get points
   ↓
6. Chat "How am I doing?"
   ↓
7. AI responds with motivation
```

## 🔧 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Ensure `mongod` is running in another terminal |
| Port 5000 in use | Change PORT in `.env` or `lsof -i :5000` then kill process |
| API Key error | Verify key in `.env` and check quota |
| CORS error | Ensure API_BASE_URL matches backend URL |
| Blank dashboard | Check browser console (F12) for errors |

## 📚 File Overview

```
frontend/
├── index.html              → Login/Sign Up
├── dashboard.html          → Main dashboard
├── my-habits.html          → Create habits
├── habit-details.html      → Habit completion
└── assets/
    ├── styles.css          → All styling
    ├── auth.js             → Login/signup
    └── dashboard.js        → Dashboard logic

backend/
├── server.js               → Express app
├── models/
│   ├── User.js            → User schema
│   ├── Habit.js           → Habit schema
│   └── Task.js            → Task completion
├── routes/
│   ├── auth.js            → Auth endpoints
│   ├── habits.js          → Habit CRUD
│   ├── tasks.js           → Task completion
│   └── ai.js              → AI chat
└── middleware/
    └── auth.js            → JWT verification
```

## 🎨 Customize Colors

Edit `frontend/assets/styles.css` - Line 10-18:
```css
:root {
  --primary-color: #00D4FF;      /* Cyan */
  --accent-pink: #FFB3B3;        /* Pink */
  --accent-green: #B4FF00;       /* Green */
  --accent-yellow: #D4FF00;      /* Yellow */
  --bg-white: #FFFFFF;           /* White */
  --bg-dark: #1A1F3A;            /* Dark Blue */
}
```

## 📊 Add Sample Data

After login, try these habit templates:

**Health:**
- Drink 8 glasses of water (Low)
- Exercise 30 minutes (High)
- Get 8 hours sleep (Moderate)

**Productivity:**
- Read 20 minutes (Moderate)
- Write journal (Low)
- Learn 15 minutes (Moderate)

**Mindfulness:**
- Meditate 10 minutes (Low)
- Practice gratitude (Low)
- Deep breathing (Low)

## 🌐 Deployment

### Quick Deployment to Vercel (Frontend)
```bash
# Deploy only frontend
vercel deploy --scope YOUR_NAME frontend/
```

### Deploy Backend to Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_atlas_url
heroku config:set GOOGLE_AI_API_KEY=your_key
git push heroku main
```

## 🆘 Need Help?

1. **Check logs**: Look at browser console (F12)
2. **Server logs**: Check terminal where npm start runs
3. **MongoDB**: Use MongoDB Compass to view data
4. **API Testing**: Use Postman to test endpoints

## 📝 Default Test Credentials

After signup, use these to test:
- Email: `test@example.com`
- Password: `Test123456`

## ✨ Features to Try

1. ✅ Create multiple habits
2. ✅ Complete tasks with different difficulties
3. ✅ Watch streak update
4. ✅ View progress chart
5. ✅ Get AI coaching
6. ✅ See total points increase
7. ✅ View achievement badges

## 🎯 Pro Tips

- **Consistency**: Complete at least one task daily to maintain streak
- **Difficulty**: Start with Low, progress to High for more points
- **Feedback**: Write feedback to help AI understand your progress
- **Templates**: Use pre-made templates to save time
- **AI Coach**: Ask AI for motivation and suggestions

---

**You're all set! Happy building habits! 🚀**

Need more details? Check `README.md` for full documentation.

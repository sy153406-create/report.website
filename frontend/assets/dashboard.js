// ========================================
// AI Habit Coach - Dashboard JS
// ========================================

const API_BASE = 'http://localhost:5000/api';
let currentChartFilter = '7days';
let allHabits = [];

// Check authentication
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return false;
  }
  return token;
}

// Get Authorization Header
function getAuthHeader() {
  return {
    'Authorization': `Bearer ${checkAuth()}`,
    'Content-Type': 'application/json',
  };
}

// Logout Handler
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Initialize Dashboard
async function initDashboard() {
  try {
    // Set user avatar
    const userName = localStorage.getItem('userName');
    const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';
    document.getElementById('userAvatar').textContent = userInitial;

    // Load dashboard stats
    await loadDashboardStats();

    // Load habits
    await loadHabits();

    // Load initial chart
    await loadChart(currentChartFilter);

    // Set up chat listener
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  } catch (error) {
    console.error('Dashboard initialization error:', error);
  }
}

// Load Dashboard Stats
async function loadDashboardStats() {
  try {
    const response = await fetch(`${API_BASE}/tasks/dashboard/stats`, {
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error('Failed to load stats');

    const data = await response.json();
    const { user } = data;

    // Update stats display
    document.getElementById('currentStreak').textContent = user.currentStreak || 0;
    document.getElementById('totalPoints').textContent = user.totalPoints || 0;
    document.getElementById('longestStreak').textContent = user.longestStreak || 0;
    document.getElementById('totalHabits').textContent = user.totalHabits || 0;

    // Update daily goals (example: if at least 1 habit completed today)
    const today = new Date().toISOString().split('T')[0];
    const completedToday = data.last7Days.find(d => d.date === today)?.completions || 0;
    document.getElementById('dailyGoals').textContent = Math.min(completedToday, 5);

    // Store for chart
    window.dashboardStats = data;
  } catch (error) {
    console.error('Load stats error:', error);
  }
}

// Load Habits
async function loadHabits() {
  try {
    const response = await fetch(`${API_BASE}/habits/all`, {
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error('Failed to load habits');

    const data = await response.json();
    allHabits = data.habits || [];

    renderHabits();
  } catch (error) {
    console.error('Load habits error:', error);
  }
}

// Render Habits Grid
function renderHabits() {
  const habitsGrid = document.getElementById('habitsGrid');
  habitsGrid.innerHTML = '';

  if (allHabits.length === 0) {
    habitsGrid.innerHTML = '<div class="no-habits-message">No habits yet. <a href="my-habits.html">Create your first habit!</a></div>';
    return;
  }

  allHabits.forEach(habit => {
    const card = createHabitCard(habit);
    habitsGrid.appendChild(card);
  });
}

// Create Habit Card
function createHabitCard(habit) {
  const card = document.createElement('div');
  card.className = 'habit-card';

  const progressPercent = habit.progressPercentage || 0;
  const streakIcon = habit.currentStreak > 0 ? '🔥' : '❄️';

  card.innerHTML = `
    <div class="habit-header">
      <div class="habit-title">${habit.title}</div>
      <div class="habit-category">${habit.category}</div>
    </div>

    <div class="habit-meta">
      <div class="habit-meta-item">
        ⏱️ ${habit.estimatedTime || 30} min
      </div>
      <div class="habit-meta-item">
        📊 ${habit.difficulty || 'Moderate'}
      </div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" style="width: ${progressPercent}%"></div>
    </div>

    <div class="progress-text">${Math.round(progressPercent)}% Complete</div>

    <div class="streak-info">
      ${streakIcon} ${habit.currentStreak || 0} day streak
    </div>

    <div class="habit-actions">
      <button class="btn-complete" onclick="completeHabit('${habit._id}')">✅ Complete</button>
      <button class="btn-details" onclick="viewHabitDetails('${habit._id}')">📝 Details</button>
      <button class="btn-delete" onclick="deleteHabit('${habit._id}')">🗑️ Delete</button>
    </div>
  `;

  return card;
}

// View Habit Details
function viewHabitDetails(habitId) {
  localStorage.setItem('selectedHabitId', habitId);
  window.location.href = 'habit-details.html';
}

// Complete Habit (Quick Complete)
async function completeHabit(habitId) {
  try {
    const response = await fetch(`${API_BASE}/tasks/complete`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({
        habitId,
        difficulty: 'Moderate',
        feedback: 'Completed from dashboard',
      }),
    });

    if (!response.ok) throw new Error('Failed to complete habit');

    const data = await response.json();
    alert(`✅ Great job! +${data.task.points} points earned!`);

    // Reload dashboard
    await loadDashboardStats();
    await loadHabits();
  } catch (error) {
    console.error('Complete habit error:', error);
    alert('Failed to complete habit');
  }
}

// Delete Habit
async function deleteHabit(habitId) {
  if (!confirm('Are you sure you want to delete this habit?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/habits/${habitId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error('Failed to delete habit');

    alert('Habit deleted successfully');
    await loadHabits();
    await loadDashboardStats();
  } catch (error) {
    console.error('Delete habit error:', error);
    alert('Failed to delete habit');
  }
}

// Load Chart Data
async function loadChart(filter) {
  try {
    const stats = window.dashboardStats;
    if (!stats) {
      console.error('No stats available');
      return;
    }

    const data = filter === '7days' ? stats.last7Days : stats.last30Days;
    renderChart(data);
  } catch (error) {
    console.error('Load chart error:', error);
  }
}

// Render Chart
function renderChart(data) {
  const container = document.getElementById('chartContainer');
  container.innerHTML = '';

  if (!data || data.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #999;">No data yet</p>';
    return;
  }

  const maxValue = Math.max(...data.map(d => d.completions), 1);

  data.forEach(point => {
    const chartBar = document.createElement('div');
    chartBar.className = 'chart-bar';

    const percentage = (point.completions / maxValue) * 100;

    chartBar.innerHTML = `
      <div class="bar" style="height: ${percentage}%; min-height: 20px;"></div>
      <div class="bar-label">${new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
    `;

    container.appendChild(chartBar);
  });
}

// Filter Chart
function filterChart(filter) {
  currentChartFilter = filter;

  // Update button states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Load new data
  loadChart(filter);
}

// Send Chat Message
async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addChatMessage(message, 'user');
  input.value = '';

  try {
    // Send to AI API
    const response = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error('Failed to get AI response');

    const data = await response.json();
    addChatMessage(data.response, 'ai');
  } catch (error) {
    console.error('Chat error:', error);
    addChatMessage('Sorry, I\'m having trouble connecting. Please try again.', 'ai');
  }
}

// Add Chat Message to UI
function addChatMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message';

  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${sender === 'user' ? 'user-message' : 'ai-message'}`;
  bubble.textContent = text;

  messageDiv.appendChild(bubble);
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize on page load
window.addEventListener('load', initDashboard);

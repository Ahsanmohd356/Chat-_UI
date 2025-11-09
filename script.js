// Handle username
const username = localStorage.getItem('chatUser');
const welcome = document.getElementById('welcomeUser');
const userList = document.getElementById('userList');
const logoutBtn = document.getElementById('logoutBtn');
const toggleTheme = document.getElementById('toggleTheme');
const chatMessages = document.getElementById('chatMessages');
const sendBtn = document.getElementById('sendBtn');
const msgInput = document.getElementById('msgInput');

// Redirect if not logged in
if (!username && window.location.pathname.includes("chat.html")) {
  window.location.href = "login.html";
} else if (welcome) {
  welcome.textContent = `Welcome, ${username} 👋`;
}

// Simulated online users
const users = ["Arun", "Sneha", "Kavi", "Priya", "Rohit"];
if (userList) {
  userList.innerHTML = users.map(u => `<li>${u}</li>`).join("");
}

// Send message function
if (sendBtn) {
  sendBtn.addEventListener('click', sendMessage);
  msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function sendMessage() {
  const text = msgInput.value.trim();
  if (text !== '') {
    addMessage(text, 'user');
    msgInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Bot reply after short delay
    setTimeout(() => {
      const reply = generateBotReply(text);
      addMessage(reply, 'bot');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  }
}

// Function to add message to chat
function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.classList.add('chat-message', type);
  msg.textContent = (type === 'user' ? `${username}: ` : "Bot: ") + text;
  chatMessages.appendChild(msg);
}

// Function to generate bot replies (keyword-based)
function generateBotReply(userText) {
  const text = userText.toLowerCase();

  if (text.includes('hi') || text.includes('hello')) {
    return "Hey there! 👋 How can I help you today?";
  } else if (text.includes('how are you')) {
    return "I'm just a bot, but I'm doing great! How about you?";
  } else if (text.includes('your name')) {
    return "I'm ChatBot 🤖, your friendly virtual assistant.";
  } else if (text.includes('time')) {
    const now = new Date().toLocaleTimeString();
    return `The current time is ${now}.`;
  } else if (text.includes('date')) {
    const today = new Date().toLocaleDateString();
    return `Today's date is ${today}.`;
  } else if (text.includes('bye')) {
    return "Goodbye 👋! Have a great day!";
  } else if (text.includes('help')) {
    return "You can ask me about the time, date, or just chat casually!";
  } else {
    const replies = [
      "Interesting... tell me more!",
      "Hmm 🤔, I see!",
      "That’s cool! 😄",
      "I didn’t quite get that, can you rephrase?",
      "Sounds good! 👍"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('chatUser');
    window.location.href = 'login.html';
  });
}

// Dark mode toggle
if (toggleTheme) {
  toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

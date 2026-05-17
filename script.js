// Login Form Elements
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('login_username');
const loginPasswordInput = document.getElementById('login_password');
const loginUsernameError = document.getElementById('loginUsernameError');
const loginPasswordError = document.getElementById('loginPasswordError');

// Signup Form Elements
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Validation Functions
function validateLoginUsername() {
  const value = loginUsernameInput.value.trim();
  const isValid = value.length > 0;

  if (!isValid) {
    loginUsernameError.textContent = 'Username cannot be empty';
    loginUsernameInput.classList.add('invalid');
    loginUsernameInput.classList.remove('valid');
  } else {
    loginUsernameError.textContent = '';
    loginUsernameInput.classList.remove('invalid');
    loginUsernameInput.classList.add('valid');
  }

  return isValid;
}

function validateLoginPassword() {
  const value = loginPasswordInput.value.trim();
  const isValid = value.length > 0;

  if (!isValid) {
    loginPasswordError.textContent = 'Password cannot be empty';
    loginPasswordInput.classList.add('invalid');
    loginPasswordInput.classList.remove('valid');
  } else {
    loginPasswordError.textContent = '';
    loginPasswordInput.classList.remove('invalid');
    loginPasswordInput.classList.add('valid');
  }

  return isValid;
}

function validateUsername() {
  const value = usernameInput.value.trim();
  const isValid = value.length >= 3;

  if (!isValid) {
    usernameError.textContent = 'Username must be at least 3 characters long';
    usernameInput.classList.add('invalid');
    usernameInput.classList.remove('valid');
  } else {
    usernameError.textContent = '';
    usernameInput.classList.remove('invalid');
    usernameInput.classList.add('valid');
  }

  return isValid;
}

function validatePassword() {
  const value = passwordInput.value;
  const isValid = value.length >= 6;

  if (!isValid) {
    passwordError.textContent = 'Password must be at least 6 characters long';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
  } else {
    passwordError.textContent = '';
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
  }

  return isValid;
}

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const isValid = password === confirmPassword && confirmPassword.length > 0;

  if (!isValid) {
    confirmPasswordError.textContent = 'Passwords do not match';
    confirmPasswordInput.classList.add('invalid');
    confirmPasswordInput.classList.remove('valid');
  } else {
    confirmPasswordError.textContent = '';
    confirmPasswordInput.classList.remove('invalid');
    confirmPasswordInput.classList.add('valid');
  }

  return isValid;
}

// Event Listeners for Login Form
loginUsernameInput.addEventListener('input', validateLoginUsername);
loginUsernameInput.addEventListener('blur', validateLoginUsername);

loginPasswordInput.addEventListener('input', validateLoginPassword);
loginPasswordInput.addEventListener('blur', validateLoginPassword);

// Event Listeners for Signup Form
usernameInput.addEventListener('input', validateUsername);
usernameInput.addEventListener('blur', validateUsername);

passwordInput.addEventListener('input', function() {
  validatePassword();
  if (confirmPasswordInput.value) {
    validateConfirmPassword();
  }
});
passwordInput.addEventListener('blur', validatePassword);

confirmPasswordInput.addEventListener('input', validateConfirmPassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Form Submission Handlers
loginForm.addEventListener('submit', function(event) {
  const isUsernameValid = validateLoginUsername();
  const isPasswordValid = validateLoginPassword();

  if (!isUsernameValid || !isPasswordValid) {
    event.preventDefault();
    showAlert('Please fill all required fields correctly', 'error');
    return;
  }
  // Allow form submission if valid
});

signupForm.addEventListener('submit', function(event) {
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
    event.preventDefault();
    showAlert('Please fill all required fields correctly', 'error');
    return;
  }
  // Allow form submission if valid
});

// Show alert function
function showAlert(message, type = 'info') {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.alert');
  existingAlerts.forEach(alert => alert.remove());

  // Create a temporary alert box
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';
  alertBox.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  if (type === 'error') {
    alertBox.style.background = 'rgba(239, 68, 68, 0.2)';
    alertBox.style.color = '#dc2626';
    alertBox.style.border = '2px solid #dc2626';
  } else {
    alertBox.style.background = 'rgba(16, 185, 129, 0.2)';
    alertBox.style.color = '#10b981';
    alertBox.style.border = '2px solid #10b981';
  }

  alertBox.textContent = message;
  document.body.appendChild(alertBox);

  // Remove alert after 3 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Add slideIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
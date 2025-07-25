// --- Password Protection ---
const PASSWORD = 'forever';
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const enterBtn = document.getElementById('enter-btn');
const passwordError = document.getElementById('password-error');
const heartBurst = document.getElementById('heart-burst');

// Focus input on load
window.onload = () => {
  passwordInput.focus();
  startFloatingHearts();
};

function showError(msg) {
  passwordError.textContent = msg;
}

function clearError() {
  passwordError.textContent = '';
}

function handleEnter() {
  clearError();
  if (passwordInput.value.trim() === PASSWORD) {
    // Transition to main content
    passwordScreen.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1)';
    passwordScreen.style.opacity = 0;
    setTimeout(() => {
      passwordScreen.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.style.opacity = 0;
      setTimeout(() => {
        mainContent.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1)';
        mainContent.style.opacity = 1;
      }, 30);
    }, 700);
  } else {
    showError('Incorrect password. Try again!');
    passwordInput.value = '';
    passwordInput.focus();
  }
}

enterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  burstHearts();
  setTimeout(handleEnter, 400);
});

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    burstHearts();
    setTimeout(handleEnter, 400);
  }
});

// --- Heart Burst Effect ---
function burstHearts() {
  const burst = document.createDocumentFragment();
  const numHearts = 10;
  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.style.left = `${50 + Math.random() * 40 - 20}%`;
    heart.style.top = `${40 + Math.random() * 20 - 10}%`;
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    heart.innerHTML = heartSVG('#e75480');
    burst.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
  heartBurst.appendChild(burst);
  setTimeout(() => { heartBurst.innerHTML = ''; }, 1200);
}

// --- Floating Hearts Background ---
function startFloatingHearts() {
  const bg = document.getElementById('hearts-bg');
  const colors = ['#ffb6d5', '#e75480', '#fff0f6', '#f8a5c2'];
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.innerHTML = heartSVG(color);
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.opacity = 0.5 + Math.random() * 0.3;
    heart.style.transform = `scale(${0.7 + Math.random() * 0.7})`;
    bg.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }
  setInterval(createHeart, 900);
  // Start with a few
  for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 500);
}

function heartSVG(color) {
  return `<svg viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 2.5C21.5 2.5 19.5 3.5 18 5C16.5 3.5 14.5 2.5 12.5 2.5C8.5 2.5 5.5 5.5 5.5 9.5C5.5 17.5 18 26.5 18 26.5C18 26.5 30.5 17.5 30.5 9.5C30.5 5.5 27.5 2.5 23.5 2.5Z" fill="${color}" stroke="#fff" stroke-width="2"/></svg>`;
}

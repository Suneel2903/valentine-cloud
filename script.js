const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const overlay = document.getElementById("overlay");
const againBtn = document.getElementById("againBtn");
const gif = document.getElementById("celebrateGif");
const hint = document.getElementById("hint");
const question = document.getElementById("question");
const successText = document.getElementById("successText");
const arena = document.getElementById("arena");

// ===== CUSTOMIZE HERE (edit these two lines only) =====
question.textContent = "Want to be my Sunday morning snack? 😈";
successText.textContent = "I'll eat you nice 😈👅";
// Choose any GIF URL you like:
gif.src = "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif";
// ======================================================

let started = false;
let lastMoveAt = 0;
let autoMoveInterval = null;

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function moveNoButton() {
  const now = Date.now();
  if (now - lastMoveAt < 80) return; // throttle
  lastMoveAt = now;

  const rect = arena.getBoundingClientRect();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const x = Math.random() * (rect.width - btnW);
  const y = Math.random() * (rect.height - btnH);

  noBtn.style.left = `${clamp(x, 0, rect.width - btnW)}px`;
  noBtn.style.top  = `${clamp(y, 0, rect.height - btnH)}px`;
  noBtn.style.transform = 'translateY(-50%)';
}

function startAutoMove() {
  if (autoMoveInterval) return; // Already started
  
  started = true;
  hint.textContent = "Uh oh… 'No' is getting nervous 😅";
  
  // Move 3 times per second = every ~333ms
  autoMoveInterval = setInterval(() => {
    moveNoButton();
  }, 333);
}

// Start auto-moving after 1 second
setTimeout(() => {
  startAutoMove();
}, 1000);

// Desktop: Start "run away" on first mouse move inside card
document.querySelector(".card").addEventListener("mousemove", () => {
  if (!started) {
    startAutoMove();
  }
  moveNoButton();
});

// Desktop: Escape when trying to hover the "No" button
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile & Desktop: If touched/clicked, keep it playful
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  hint.textContent = "Nice try 😈 but I'm not accepting that answer!";
  moveNoButton();
});

// Mobile: Handle touch events
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  e.stopPropagation();
  hint.textContent = "Nice try 😈 but I'm not accepting that answer!";
  moveNoButton();
});

noBtn.addEventListener("touchmove", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Yes -> popup
yesBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

// Replay
againBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
  hint.textContent = "\"No\" seems a bit shy today 😈";
  started = false;
  
  // Clear auto-move interval
  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
    autoMoveInterval = null;
  }
  
  // Reset button position
  const isMobile = window.innerWidth <= 480;
  noBtn.style.left = isMobile ? "calc(50% + 50px)" : "calc(50% + 70px)";
  noBtn.style.top = "50%";
  noBtn.style.transform = "translateY(-50%)";
  
  // Restart auto-move after 1 second
  setTimeout(() => {
    startAutoMove();
  }, 1000);
});

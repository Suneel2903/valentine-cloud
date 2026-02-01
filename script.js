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
question.textContent = "Will you be my Valentine? 💖";
successText.textContent = "You just made my whole day 😍";
// Choose any GIF URL you like:
gif.src = "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif";
// ======================================================

let started = false;
let lastMoveAt = 0;

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
}

// Start "run away" on first mouse move inside card
document.querySelector(".card").addEventListener("mousemove", () => {
  if (!started) {
    started = true;
    hint.textContent = "Uh oh… 'No' is getting nervous 😅";
  }
  moveNoButton();
});

// Escape when trying to hover the "No" button
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);

// If clicked (mobile might manage), keep it playful
noBtn.addEventListener("click", () => {
  hint.textContent = "Nice try 😈 but I'm not accepting that answer!";
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
  noBtn.style.left = "280px";
  noBtn.style.top = "10px";
});

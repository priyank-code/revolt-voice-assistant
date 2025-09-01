const micBtn = document.getElementById('mic-btn');
const micIcon = document.getElementById('mic-icon');
const statusText = document.getElementById('status');

const ws = new WebSocket('wss://revolt-voice-assistant.onrender.com');
//ws://localhost:8080
let isListening = false;
let currentUtterance = null; 

const startSound = new Audio("./start.mp3");
const endSound = new Audio("./end.mp3");

ws.onopen = () => console.log('✅ WebSocket connected');
ws.onclose = () => console.log('❌ WebSocket disconnected');

function cleanTextForSpeech(text) {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/[#>-]/g, '').replace(/\n+/g, '. ').trim();
}

ws.onmessage = (event) => {
  try {
    const msg = JSON.parse(event.data);
    if (msg.type === 'text') {
      const speakText = cleanTextForSpeech(msg.message);
      const hindiRegex = /[\u0900-\u097F]/;
      let lang = hindiRegex.test(speakText) ? "hi-IN" : "en-IN";
      if (speechSynthesis.speaking) speechSynthesis.cancel();
      currentUtterance = new SpeechSynthesisUtterance(speakText);
      currentUtterance.lang = lang;
      currentUtterance.rate = 1;
      currentUtterance.onstart = () => { statusText.textContent = "🤖 Speaking"; };
      currentUtterance.onend = () => { statusText.textContent = "Tap to Talk"; currentUtterance = null; };
      speechSynthesis.speak(currentUtterance);
    }
  } catch (err) {
    console.error('Failed to parse WS message', err);
  }
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-IN"; 
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;

micBtn.addEventListener('click', () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    currentUtterance = null;
  }
  if (isListening) {
    recognition.stop();
    isListening = false;
    statusText.textContent = "Tap to Talk";
    micIcon.className = "fa-solid fa-microphone text-4xl";
    endSound.currentTime = 0;
    endSound.play();
  } else {
    recognition.start();
    statusText.textContent = "🎙️ Listening...";
    micIcon.className = "fa-solid fa-microphone-lines text-4xl";
    isListening = true;
    startSound.currentTime = 0;
    startSound.play();
  }
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.trim();
  if (ws.readyState === WebSocket.OPEN) ws.send(transcript);
  statusText.textContent = "⏳ Waiting for reply...";
  micIcon.className = "fa-solid fa-microphone text-4xl";
  isListening = false;
};

recognition.onerror = (err) => {
  console.error("Speech recognition error:", err);
  statusText.textContent = "Mic error / try again";
  isListening = false;
  micIcon.className = "fa-solid fa-microphone text-4xl";
};

const DOT_ON = 26, DOT_OFF = 0;

function applyTheme(isDark) {
  if (isDark) {
    body.classList.replace('bg-white','bg-black');
    body.classList.replace('text-black','text-white');
    statusText.classList.replace('text-black','text-white');
    micBtn.classList.replace('bg-blue-500','bg-violet-600');
    brand.classList.replace('text-gray-700','text-white');
    toggleTrack.style.backgroundColor = '#374151';
    toggleDot.style.transform = `translateX(${DOT_ON}px)`;
  } else {
    body.classList.replace('bg-black','bg-white');
    body.classList.replace('text-white','text-black');
    statusText.classList.replace('text-white','text-black');
    micBtn.classList.replace('bg-violet-600','bg-blue-500');
    brand.classList.replace('text-white','text-gray-700');
    toggleTrack.style.backgroundColor = '#d1d5db';
    toggleDot.style.transform = `translateX(${DOT_OFF}px)`;
  }
}

themeToggle.checked = true;
toggleDot.style.transition = 'transform 250ms cubic-bezier(.2,.9,.2,1)';
toggleTrack.style.transition = 'background-color 250ms ease';
applyTheme(true);
themeToggle.addEventListener('change', e => applyTheme(e.target.checked));

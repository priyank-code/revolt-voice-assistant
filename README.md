# 🚀 Revolt Motors Voice Assistant

A real-time **conversational voice interface** built with **Node.js, Express, WebSocket, and Gemini Live API**.  
This project replicates the **Revolt Motors voice chatbot (live.revoltmotors.com)** with clean UI and key features like **speech recognition, AI responses, real-time interruption handling, and multi-language support (English + Hindi)**.

---

## ✨ Features
- 🎙️ **Voice Input & Output** – Speak to the assistant and get natural voice replies.  
- ⚡ **Low Latency** – AI replies start within 1–2 seconds.  
- 🔄 **Interruption Support** – Stop AI mid-response and ask a new question.  
- 🌐 **Multi-language Support** – English & Hindi auto-detection.  
- 🎨 **Clean UI** – Built with TailwindCSS + Font Awesome icons.  
- 🔊 **Mic Start/Stop Sound Effects** – Provides user feedback like Google Assistant/Siri.  
- 🔐 **Secure Server-to-Server Architecture** – API key hidden in backend with `.env`.  

---

## 🛠️ Tech Stack
- **Frontend**: Vanilla JS, TailwindCSS, Web Speech API  
- **Backend**: Node.js, Express, WebSocket (`ws`)  
- **AI**: Gemini Live API (`gemini-2.5-flash-preview-native-audio-dialog`)  
- **Other**: CORS, dotenv, node-fetch  

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the Repository
git clone https://github.com/priyank-code/revolt-voice-assistant.git
cd revolt-voice-assistant/backend
npm install

# 2. Configure Environment Variables
# Create a `.env` file inside backend/ and add:
PORT=8080
GEMINI_API_KEY=your_api_key_here

# 3. Run the Backend
npm start
# Backend server will start at http://localhost:8080

# 4. Run the Frontend
# Open public/index.html in your browser.
# Best way: Use VS Code Live Server extension → Right click index.html → "Open with Live Server"
```
## 🎥 Demo Video
👉 [Watch Demo on Google Drive](https://drive.google.com/file/d/1G0KA3bSXp2La20rs0DWGRGjw9P5wcZZI/view?usp=drive_link)  

The demo showcases:  
- 🗣️ Natural conversation with the AI  
- ⏹️ Interrupting the AI mid-response  
- ⚡ Low latency between user question and AI reply  

---

## 📌 System Instructions
This AI assistant is **configured to only answer queries related to Revolt Motors**, such as:  
- ⚡ Bike performance (speed, range, charging time)  
- 💰 Price and warranty details  
- 🏢 Showroom & service locations  
- 🛠️ Features and subscription options  

---

## 👨‍💻 Author
Developed with ❤️ by **Priyank Vaghani**  

📧 Email: [vaghanipriyank1@gmail.com](mailto:vaghanipriyank1@gmail.com)  
🔗 LinkedIn: [linkedin.com/in/priyank-vaghani](https://linkedin.com/in/priyankvaghani)  
💻 GitHub: [github.com/priyank-code](https://github.com/priyank-code) 

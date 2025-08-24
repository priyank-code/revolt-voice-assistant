import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.get("/health", (_req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Gemini API call (text in → text out)
async function askGemini(prompt) {
  try {
    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: "You are Rev, the Revolt Motors assistant. Your primary job is to answer questions about Revolt Motors bikes, services, features, pricing, and company information. \
Also include relevant details about Rattan India Enterprises, since it owns Revolt Motors. \
If the user asks something unrelated to Revolt Motors or Rattan India Enterprises, politely say you can only help with Revolt Motors and its parent company Rattan India Enterprises.",
              },
            ],
          },
        }),
      }
    );

    const data = await resp.json();
    console.log("🔎 Gemini raw response:", JSON.stringify(data, null, 2));

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return "Hmm, I couldn’t get a proper reply from Gemini.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Sorry, something went wrong while contacting Gemini.";
  }
}

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify({ type: "info", message: "connected to backend" }));

  ws.on("message", async (data, isBinary) => {
    if (isBinary) {
      console.log("got binary data (ignored in text mode)");
      return;
    }

    const text = data.toString().trim();
    console.log("User said:", text);

    const reply = await askGemini(text);

    ws.send(JSON.stringify({ type: "text", message: reply }));
  });

  ws.on("close", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WS server listening on ws://localhost:${PORT}`);
});

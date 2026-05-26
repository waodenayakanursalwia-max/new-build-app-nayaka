import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Set high body limit for file uploads (drawings)
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Shared Gemini client utility (Lazy initialization prevents crash if API key is not yet set)
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please add it to your secrets or environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API for TotSpeak Interpretation
app.post("/api/interpret", async (req, res) => {
  try {
    const { prompt, age, type, image, mimeType } = req.body;

    if (!prompt || !age || !type) {
      return res.status(400).json({ error: "Missing required fields (prompt, age, or type)" });
    }

    const ai = getAiClient();

    let contentsParts: any[] = [];

    // Setup input parts
    let promptString = `Child Age: ${age}\nBehavior/Type: ${type}\nDescription or word babble: "${prompt}"`;
    contentsParts.push({ text: promptString });

    // Handle multimodal image uploading (Scribbles/Drawings)
    if (image && mimeType) {
      // Remove any data URL header if present (e.g. "data:image/png;base64,")
      const base64Clean = image.includes("base64,") ? image.split("base64,")[1] : image;
      contentsParts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Clean,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsParts,
      config: {
        systemInstruction: `You are "TotSpeak AI", a warm, empathetic, and expert child development psychologist and toddler language interpreter.
Your mission is to help parents worldwide decipher and understand their children's cryptic behaviors, drawings, or unstructured baby talk (babbling).

Your interface and responses must be entirely in English. When interpreting inputs, strictly adhere to these principles:

1. TONALITY: Always sound encouraging, positive, playful, yet scientifically grounded. Use a warm, friendly tone—like an enthusiastic preschool teacher or a wise older sibling. Avoid dry academic jargon; instead, explain concepts simply and beautifully.
2. CAPABILITIES: You can analyze text descriptions of a child's behavior/words OR images of a child's drawings/scribbles (multimodal input).
3. RESPONSE STRUCTURE: Return your analytical reading strictly in JSON matching the responseSchema. The content of each text property must be entirely in English and structured as follows:
- magicBehindIt (representing "🌟 The Magic Behind It"): Explain what the child is likely feeling, thinking, or trying to communicate. Give a psychological or developmental context in a warm way.
- hiddenMilestone (representing "💡 Hidden Milestone"): Highlight what positive developmental milestone this behavior represents (e.g., fine motor skills, emotional awareness, imaginative leap).
- playfulActionPlan (representing "🚀 Playful Action Plan"): Provide 2-3 concrete, actionable, and fun activities or responses the parents can do right now to engage with their child based on this insight.
- wordOfEncouragement (representing "🎈 Word of Encouragement"): A short, uplifting, and comforting closing statement for the parent.
- isWarning: Boolean. Set to true if the query contains indications of extreme distress, potential organic development delays, physical symptoms, self-injury, or child safety items that require medical pediatric advice.

CRITICAL SAFETY RULE: You are a developmental guide, NOT a medical diagnostic tool. If the user describes severe physical symptoms, extreme continuous distress, or potential developmental delays, gently and warmly advise them to consult a pediatrician or a professional child psychologist, while keeping the tone reassuring. In this case, 'isWarning' should be true.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            magicBehindIt: {
              type: Type.STRING,
              description: "Interpretation statement explaining child's thoughts/feelings.",
            },
            hiddenMilestone: {
              type: Type.STRING,
              description: "Positive developmental milestone unlocked in this behavior.",
            },
            playfulActionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of exactly 2 or 3 fun playful parenting suggestions.",
            },
            wordOfEncouragement: {
              type: Type.STRING,
              description: "Warm loving support message for the tired or proud parent.",
            },
            isWarning: {
              type: Type.BOOLEAN,
              description: "True only if clinical/pediatric review is advised.",
            },
          },
          required: ["magicBehindIt", "hiddenMilestone", "playfulActionPlan", "wordOfEncouragement", "isWarning"],
        },
      },
    });

    const parsedResponse = JSON.parse(response.text || "{}");
    return res.json(parsedResponse);
  } catch (error: any) {
    console.error("Generative AI Service Error:", error);
    // Graceful error structure returning clean user feedback
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during interpretation.",
      isOk: false,
    });
  }
});

// Configure Vite integration for SPA pipeline
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve SPA router fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TotSpeak AI server actively running on http://localhost:${PORT}`);
  });
}

startServer();

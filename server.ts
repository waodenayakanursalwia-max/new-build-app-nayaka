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
    const { prompt, age, type, image, mimeType, lang } = req.body;

    if (!prompt || !age || !type) {
      return res.status(400).json({ error: "Missing required fields (prompt, age, or type)" });
    }

    // Determine target language name
    let langName = "English";
    if (lang === "id") {
      langName = "Indonesian (Bahasa Indonesia)";
    } else if (lang === "zh") {
      langName = "Mandarin Chinese (Simplified Chinese 简体中文)";
    }

    const ai = getAiClient();

    let contentsParts: any[] = [];

    // Setup input parts with guidelines
    let promptString = `Child Age: ${age}\nBehavior/Type: ${type}\nTarget Output Language: ${langName}\nDescription or word babble: "${prompt}"`;
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

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let lastError: any = null;
    let response: any = null;

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const modelName of modelsToTry) {
      const attempts = 3;
      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          console.log(`Attempting child behavior analysis with model: ${modelName} in ${langName} (attempt ${attempt}/${attempts})`);
          response = await ai.models.generateContent({
            model: modelName,
            contents: { parts: contentsParts },
            config: {
              systemInstruction: `You are "TotSpeak AI", a warm, empathetic, and expert child development psychologist and toddler language interpreter.
Your mission is to help parents worldwide decipher and understand their children's cryptic behaviors, drawings, or unstructured baby talk (babbling).

CRITICAL REQUIREMENT: You MUST generate all text within the properties ('magicBehindIt', 'hiddenMilestone', 'playfulActionPlan' array items, and 'wordOfEncouragement') of the JSON block strictly in the requested language: ${langName}. Use a warm, parenting-focused vocabulary native to ${langName}.

When interpreting inputs, strictly adhere to these principles:

1. TONALITY: Always sound encouraging, positive, playful, yet scientifically grounded. Use a warm, friendly tone—like an enthusiastic preschool teacher or a wise older sibling. Avoid dry academic jargon; instead, explain concepts simply and beautifully in ${langName}.
2. CAPABILITIES: You can analyze text descriptions of a child's behavior/words OR images of a child's drawings/scribbles (multimodal input).
3. RESPONSE STRUCTURE: Return your analytical reading strictly in JSON matching the responseSchema. The content of each text property must be entirely in ${langName} and structured as follows:
- magicBehindIt (representing "🌟 The Magic Behind It"): Explain what the child is likely feeling, thinking, or trying to communicate. Give a psychological or developmental context in a warm way.
- hiddenMilestone (representing "💡 Hidden Milestone"): Highlight what positive developmental milestone this behavior represents (e.g., fine motor skills, emotional awareness, imaginative leap).
- playfulActionPlan (representing "🚀 Playful Action Plan"): Provide 2-3 concrete, actionable, and fun activities or responses the parents can do right now to engage with their child based on this insight.
- wordOfEncouragement (representing "🎈 Word of Encouragement"): A short, uplifting, and comforting closing statement for the parent.
- isWarning: Boolean. Set to true if the query contains indications of extreme distress, potential organic development delays, physical symptoms, self-injury, or child safety items that require medical pediatric advice.

CRITICAL SAFETY RULE: You are a developmental guide, NOT a medical diagnostic tool. If the user describes severe physical symptoms, extreme continuous distress, or potential developmental delays, gently and warmly advise them to consult a pediatrician or a professional child psychologist in ${langName}, while keeping the tone reassuring. In this case, 'isWarning' should be true.`,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  magicBehindIt: {
                    type: Type.STRING,
                    description: `Interpretation statement explaining child's thoughts/feelings written in ${langName}.`,
                  },
                  hiddenMilestone: {
                    type: Type.STRING,
                    description: `Positive developmental milestone unlocked in this behavior written in ${langName}.`,
                  },
                  playfulActionPlan: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: `Array of exactly 2 or 3 fun playful parenting suggestions written in ${langName}.`,
                  },
                  wordOfEncouragement: {
                    type: Type.STRING,
                    description: `Warm loving support message for the tired or proud parent written in ${langName}.`,
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

          if (response) {
            console.log(`Successfully completed generation using model: ${modelName} on attempt ${attempt}`);
            break; // Exit current attempt loop on success
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${modelName} attempt ${attempt} failed with error: ${err?.message || err}`);
          if (attempt < attempts) {
            const delay = 1000 * Math.pow(2, attempt); // Exponential backoff: 2s, 4s
            console.log(`Retrying model ${modelName} in ${delay}ms...`);
            await sleep(delay);
          }
        }
      }
      if (response) {
        break; // Exit fallback model loop on success
      }
    }

    if (!response) {
      throw lastError || new Error("Failed to generate content with any available models.");
    }

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

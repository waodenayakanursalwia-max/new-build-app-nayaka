import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

let ai: any = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export async function getHint(question: string, options: string[], levelTitle: string) {
  if (!ai) {
    return "Maaf, fitur hint AI belum dikonfigurasi. Silakan tambahkan API Key GEMINI_API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a friendly teacher in a pixel-art game named EchoPath. 
      The current level is "${levelTitle}". 
      The question is: "${question.replace('[___]', '____')}".
      The options are: ${options.join(', ')}.
      Give a very short, encouraging hint (maximum 15 words) to help a child solve this. 
      Do not give the answer directly.
      Respond in English.`,
    });

    return response.text || "Coba pikirkan kata yang paling sesuai dengan gambar!";
  } catch (error) {
    console.error("Gemini Hint Error:", error);
    return "Coba pikirkan kata yang paling sesuai dengan gambar!";
  }
}

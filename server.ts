import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // Lazy Initialize Gemini API
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY is not configured.");
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

  // API Endpoint: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Endpoint: AI Code Execution Parser / Step Generator
  app.post("/api/visualize", async (req, res) => {
    try {
      const { code, language } = req.body;
      if (!code) {
        return res.status(400).json({ error: "Code content is required" });
      }

      const ai = getGeminiClient();
      const prompt = `You are a strict code execution engine and memory analyzer for ${language || "python"}.
Analyze the following code line by line and generate a detailed step-by-step trace of its execution.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "steps": [
    {
      "stepNumber": 1,
      "line": 1,
      "codeLine": "string",
      "callStack": [
        {"name": "string", "line": 1, "params": "string"}
      ],
      "variables": [
        {"name": "string", "value": "string", "type": "string", "scope": "string"}
      ],
      "stackMemory": [
        {"address": "string", "name": "string", "value": "string"}
      ],
      "heapMemory": [
        {"address": "string", "type": "string", "value": "string"}
      ],
      "consoleOutput": "string or empty if no output this step",
      "explanation": "Clear short sentence explaining what memory/cpu operation happened"
    }
  ]
}

Code to analyze:
\`\`\`
${code}
\`\`\`
Limit the response to at most 15-20 execution steps for performance.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);

      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error("Error generating visual trace:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate execution visualization",
      });
    }
  });

  // API Endpoint: AI Explain Step / Debugger Helper
  app.post("/api/ai-explain", async (req, res) => {
    try {
      const { code, language, currentStep, callStack, variables } = req.body;
      const ai = getGeminiClient();

      const prompt = `You are a master computer science tutor. Explain the current step of code execution in plain, intuitive terms.

Language: ${language}
Current Line/Step: ${JSON.stringify(currentStep)}
Call Stack: ${JSON.stringify(callStack)}
Variables: ${JSON.stringify(variables)}
Code snippet:
\`\`\`
${code}
\`\`\`

Provide:
1. A concise explanation of what just happened in memory / CPU.
2. What will happen in the next line.
3. Any potential memory allocation, stack frame push/pop, or optimization insight (e.g. recursion depth, memoization, pointer resolution).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      return res.json({ success: true, explanation: response.text });
    } catch (error: any) {
      console.error("AI Explain error:", error);
      return res.status(500).json({
        error: error.message || "Failed to get AI explanation",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Code Visualizer server running on http://localhost:${PORT}`);
  });
}

startServer();

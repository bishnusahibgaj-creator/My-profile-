import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for AI Project Strategist (High Thinking)
  app.post("/api/strategize", async (req, res) => {
    try {
      const { projectDetails } = req.body;
      if (!projectDetails) {
        return res.status(400).json({ error: "Project details are required." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `I am a professional web designer offering Website Building, Redesign, Local SEO, Google Business Profile Optimization, Landing Pages, Web Hosting, Maintenance, Google Ads, and Meta Ads. A potential client just sent me this request: "${projectDetails}". Analyze this request, determine which of my services they need, and provide a strategic project proposal with a breakdown of steps and estimated timelines. Be professional and encouraging.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });

      res.json({ result: response.text });
    } catch (error) {
      console.error("Error in /api/strategize:", error);
      res.status(500).json({ error: "Failed to generate strategy." });
    }
  });

  // API Route for Local SEO Analyzer (Search Grounding)
  app.post("/api/seo-analyze", async (req, res) => {
    try {
      const { industry, location } = req.body;
      if (!industry || !location) {
        return res.status(400).json({ error: "Industry and location are required." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Search for the top ${industry} businesses in ${location} and current local SEO trends for this industry. Based on what you find, provide a brief, actionable 3-step local SEO strategy to help a new business stand out in this area.`,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      // Extract sources
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks.map(chunk => chunk.web?.title || chunk.web?.uri).filter(Boolean);

      res.json({ result: response.text, sources });
    } catch (error) {
      console.error("Error in /api/seo-analyze:", error);
      res.status(500).json({ error: "Failed to analyze local SEO." });
    }
  });

  // API Route for Contact Form Submission (Mock)
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    // In a real app, send an email or save to DB here.
    console.log(`Contact Form Submission: ${name} (${email}) - ${message}`);
    res.json({ success: true, message: "Thank you for reaching out! We will get back to you shortly." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

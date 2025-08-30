/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RAPID_API_KEY!;
    const apiHost = process.env.RAPID_API_HOST!;

    // Extract videoId
    const regex = /(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      "https://youtube-transcripts.p.rapidapi.com/youtube/transcript",
      {
        params: { url, videoId, chunkSize: "500", text: "false", lang: "en" },
        headers: {
          "x-rapidapi-key": apiKey!,
          "x-rapidapi-host": apiHost!,
        },
      }
    );

    const data = response.data;
    if (!data || !data.content || data.content.length === 0) {
      return NextResponse.json(
        { error: "Transcript not available" },
        { status: 404 }
      );
    }

    // Join transcript
    const transcriptText = data.content.map((c: any) => c.text).join(" ");

    const prompt = `
      You are an assistant that processes YouTube transcripts. 
      1. Write a summary in clear bullet points (each starting with "-"). Keep it concise (max 10 points).
      2. Then produce a mind map JSON in this schema:

      {
        "topic": "Main topic",
        "subtopics": [
          { "topic": "Subtopic 1", "subtopics": [] },
          { "topic": "Subtopic 2", "subtopics": [] }
        ]
      }

      Rules:
      - Do NOT add Markdown, backticks, or extra formatting.
      - First output must start with "Summary:" then bullet points.
      - Then on a new line write "MindMap:" followed only by valid JSON.

      Transcript:
      ${transcriptText}
    `;

    const aiResponse = await ai
      .getGenerativeModel({ model: "gemini-2.5-flash" })
      .generateContent(prompt);

    const textResponse = aiResponse.response.text();

    const summaryMatch = textResponse.match(/Summary:\s*([\s\S]*?)\nMindMap:/);
    const mindmapMatch = textResponse.match(/MindMap:\s*([\s\S]*)/);

    // Split summary into array of bullet points
    const summary = summaryMatch
      ? summaryMatch[1]
          .split("\n")
          .map((line) => line.replace(/^-\s*/, "").trim())
          .filter((line) => line.length > 0)
      : [];

    let mindmap = { topic: "Error parsing MindMap", subtopics: [] };

    if (mindmapMatch) {
      try {
        const cleanJson = mindmapMatch[1]
          .trim()
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]");
        mindmap = JSON.parse(cleanJson);
      } catch (e) {
        console.error("Mindmap JSON parse error:", e);
      }
    }

    return NextResponse.json({ summary, mindmap });
  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}

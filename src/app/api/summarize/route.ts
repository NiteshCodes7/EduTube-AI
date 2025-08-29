/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 });
    }

    const apiKey = process.env.RAPID_API_KEY;
    const apiHost = "youtube-transcripts.p.rapidapi.com";

    // Extract videoId
    const regex = /(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const response = await axios.get("https://youtube-transcripts.p.rapidapi.com/youtube/transcript", {
      params: {
        url,
        videoId,
        chunkSize: "500",
        text: "false",
        lang: "en",
      },
      headers: {
        "x-rapidapi-key": apiKey!,
        "x-rapidapi-host": apiHost,
      },
    });

    const data = response.data;

    if (!data || !data.content || data.content.length === 0) {
      return NextResponse.json({ error: "Transcript not available" }, { status: 404 });
    }

    // ✅ Join transcript into one string
    const transcriptText = data.content.map((c: any) => c.text).join(" ");

    const prompt = `Summarize this YouTube transcript clearly and concisely:\n\n${transcriptText}`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    const summary = aiResponse.text;

    return NextResponse.json({ summary });

  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Failed to fetch transcript" }, { status: 500 });
  }
}

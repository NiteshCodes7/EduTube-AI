"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import axios from "axios";

interface HistoryItem {
  id: string;
  url: string;
  summary: string;
}

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube link.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const res = await axios.post("/api/summarize", { url });

      const data = await res.data;

      if (data.error) {
        setError(data.error);
      } else {
        setSummary(data.summary);

        // Save to history
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          url,
          summary: data.summary,
        };
        setHistory(prev => [newItem, ...prev]);
      }
    } catch (err: unknown) {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setUrl(item.url);
    setSummary(item.summary);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar history={history} onSelect={handleSelectHistory} />

      {/* Main Area */}
      <main className="flex-1 bg-gradient-to-b from-customPurple to-black text-white flex flex-col items-center p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">🎥 YouTube Summarizer</h1>

        <Card className="w-full max-w-xl bg-customPurple/90 border border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Paste your YouTube Link</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-gray-900 text-white border-gray-700"
            />
            <Button
              onClick={handleSummarize}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Summarize"}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <p className="text-red-500 mt-4 bg-red-950/40 p-2 rounded-lg">
            {error}
          </p>
        )}

        {summary && (
          <Card className="w-full max-w-2xl mt-6 bg-gray-800 border border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line leading-relaxed">{summary}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Handle, NodeProps, Position } from "reactflow";

interface ChatMessage {
  message: string;
  role: "User" | "AI";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatNode(props: NodeProps<any>) {
  const { onSummary, onMindmap } = props.data;

  const [url, setUrl] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [start, setStart] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!url) return;
    setConversation((prev) => [...prev, { role: "User", message: url }]);
    setStart(true);
    setLoading(true);
    setThinking(true);
    setUrl("");

    try {
      const res = await axios.post("/api/summarize", { url });
      const aiReply = res.data.summary || "AI Response received!";
      setConversation((prev) => [...prev, { message: aiReply, role: "AI" }]);

      const points =
        Array.isArray(res.data.points) && res.data.points.length > 0
          ? res.data.points
          : [aiReply];

      if (onSummary) onSummary(points);
      if (res.data.mindmap && onMindmap) onMindmap(res.data.mindmap);

      setSummary(points);

      console.log(summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setThinking(false);
      setUrl("");
    }
  };

  

  return (
    <div className="bg-black mt-16 border-t-purple-500 border-t-6 border border-gray-600 text-white rounded-lg p-4 w-[400px] h-[800px] shadow-lg flex flex-col">
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      <h3 className="text-lg text-purple-500 font-bold mb-8">Universal Chat</h3>

      <div className="flex-1 min-h-0">
        {!start && (
          <div className="flex justify-center items-center h-full z-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-800 text-white shadow">
                <p className="text-sm italic">
                  “This app saves me hours! I can finally catch up on long
                  podcasts in minutes.”
                </p>
                <p className="text-xs text-gray-400 mt-2">— Sarah K.</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800 text-white shadow">
                <p className="text-sm italic">
                  “Super accurate summaries. I use it daily for lectures and
                  tutorials.”
                </p>
                <p className="text-xs text-gray-400 mt-2">— Daniel M.</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800 text-white shadow">
                <p className="text-sm italic">
                  “Clean interface + fast results. A must-have for students like
                  me.”
                </p>
                <p className="text-xs text-gray-400 mt-2">— Priya S.</p>
              </div>

              <div className="p-4 rounded-lg bg-gray-800 text-white shadow">
                <p className="text-sm italic">
                  “Finally, I don&apos;t have to waste time scrubbing through
                  videos. Love it!”
                </p>
                <p className="text-xs text-gray-400 mt-2">— Alex R.</p>
              </div>
            </div>
          </div>
        )}

        {start && (
          <ScrollArea
            className="h-full pr-2 z-50 cursor-default"
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-col gap-4">
              {conversation.map((msg, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback
                      className={`${
                        msg.role === "User"
                          ? "border border-purple-500 bg-black text-purple-500"
                          : "border border-blue-800 bg-black text-blue-800"
                      } font-bold`}
                    >
                      {msg.role === "User" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`p-3 rounded-lg max-w-[80%] text-sm ${
                      msg.role === "User"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {Array.isArray(msg.message) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {msg.message.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex gap-3 items-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="border border-blue-800 bg-black text-blue-800 font-bold">
                      AI
                    </AvatarFallback>
                  </Avatar>

                  <div className="p-3 rounded-lg bg-gray-800 text-white text-sm flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-150">●</span>
                    <span className="animate-bounce delay-300">●</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      <div
        className="flex justify-center items-center gap-2 mt-2"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Input
          type="text"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          className="flex-1 bg-gray-900/40 text-white border-gray-600 z-40"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="text-center cursor-pointer z-40"
          size={"sm"}
        >
          {loading ? (
            <Loader className="animate-spin text-white" size={18} />
          ) : (
            <Send className="text-white" size={18} />
          )}
        </Button>
      </div>
    </div>
  );
}

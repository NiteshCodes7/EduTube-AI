"use client";
import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ChatMessage {
  message: string;
  role: "User" | "AI";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatNode = ({ data }: any) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);

  const handleSubmit = async () => {
    if (!url) return;
    setConversation((prev) => [...prev, { role: "User", message: url }]);
    setLoading(true);
    setThinking(true);
    setUrl("");

    try {
      const res = await axios.post("/api/summarize", { url });

      const aiReply = res.data.summary || "AI Response received!";
      setConversation((prev) => [...prev, { message: aiReply, role: "AI" }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setThinking(false);
      setUrl("");
    }
  };

  return (
    <div className="bg-black border-t-purple-500 border-t-6 border border-gray-600 text-white rounded-lg p-4 w-[400px] h-[800px] shadow-lg flex flex-col">
      <h3 className="text-lg text-purple-500 font-bold mb-8">Universal Chat</h3>

      <div className="flex-1 min-h-0">
        <ScrollArea
          className="h-full pr-2"
          onMouseDown={(e) => e.stopPropagation()}
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
                  {msg.message}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          className="flex-1 bg-gray-900/40 text-white border-gray-600"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="text-center cursor-pointer"
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
};

// --- Register custom node type ---
const nodeTypes = { chatNode: ChatNode };

export default function Mindmap() {
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "chatNode",
      position: { x: 250, y: 100 },
      data: {},
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="w-screen h-screen bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#333" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HistoryItem {
  id: string;
  url: string;
  summary: string;
}

interface SidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export default function Sidebar({ history, onSelect }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-gray-900 text-white border-r border-gray-800 flex flex-col transition-all",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        {!collapsed && <h2 className="font-bold text-lg">History</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        {history.length === 0 && !collapsed && (
          <p className="text-gray-400 text-sm">No history yet</p>
        )}
        {history.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer mb-2 p-2 rounded hover:bg-gray-800"
            onClick={() => onSelect(item)}
          >
            {!collapsed ? (
              <>
                <p className="truncate text-sm font-medium">{item.url}</p>
                <p className="truncate text-xs text-gray-400">{item.summary}</p>
              </>
            ) : (
              <div className="w-3 h-3 bg-gray-500 rounded-full mx-auto" />
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

"use client";

import Navbar from "@/components/common/Navbar";
import Mindmap from "@/components/dashboard/Mindmap";
import { useRef } from "react";

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mindmapRef = useRef<any>(null);

  const handleDownload = () => {
    if (mindmapRef.current) {
      mindmapRef.current.downloadSummary();
    }
  };

  return (
    <div>
      <Navbar handleDownloadSummary={handleDownload} />
      <Mindmap ref={mindmapRef} />
    </div>
  );
}

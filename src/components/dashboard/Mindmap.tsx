"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  NodeProps,
  Controls,
  ReactFlowProvider,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import ChatNode from "./ChatNode";
import { buildMindMap } from "@/lib/buildMindMap";
import jsPDF from "jspdf";
import { toast } from "sonner";

const nodeTypes: { [key: string]: React.ComponentType<NodeProps> } = {
  chatNode: ChatNode,
};

const Mindmap = forwardRef((props, ref) => {
  const [summaryPoints, setSummaryPoints] = useState<(string | string[])[]>([]);

  const handleContextMenu = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
  };

  const initialNodes: Node[] = [
    {
      id: "chat",
      type: "chatNode",
      position: { x: 50, y: 200 },
      draggable: true,
      data: {
        onSummary: (points: string[]) => {
          setSummaryPoints(points);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMindmap: (mindmap: any, sourceId = "chat") => {
          const { nodes: newNodes, edges: newEdges } = buildMindMap(
            mindmap,
            sourceId
          );
          setNodes((prev) => [...prev, ...newNodes]);
          setEdges((prev) => [...prev, ...newEdges]);
        },
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useImperativeHandle(ref, () => ({
    downloadSummary: () => {
      if (summaryPoints.length === 0) {
        toast("No summary to download yet!");
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Mindmap Summary", 10, 10);

      let y = 20;

      summaryPoints.forEach((point) => {
        if (typeof point === "string") {
          const subPoints = point
            .split(/\*\s*/)
            .map((p) => p.trim())
            .filter((p) => p.length > 0);

          subPoints.forEach((p) => {
            const lines = doc.splitTextToSize(`• ${p}`, 180);
            doc.text(lines, 10, y);
            y += lines.length * 8;

            if (y > 270) {
              doc.addPage();
              y = 20;
            }
          });
        } else if (Array.isArray(point)) {
          point.forEach((p) => {
            const lines = doc.splitTextToSize(`• ${p}`, 180);
            doc.text(lines, 10, y);
            y += lines.length * 8;

            if (y > 270) {
              doc.addPage();
              y = 20;
            }
          });
        }
      });

      doc.save("mindmap-summary.pdf");
    },
  }));

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <ReactFlowProvider>
        <ReactFlow
          zoomOnDoubleClick
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          onPaneContextMenu={handleContextMenu}
          onNodeContextMenu={handleContextMenu}
          onEdgeContextMenu={handleContextMenu}
        />
        <Controls />
      </ReactFlowProvider>
    </div>
  );
});

Mindmap.displayName = "Mindmap";
export default Mindmap;

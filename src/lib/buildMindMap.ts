// lib/buildMindMap.ts
import { Node, Edge } from "reactflow";

export function buildMindMap(points: string[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  points.forEach((point, idx) => {
    nodes.push({
      id: `${idx}`,
      data: { label: point },
      position: { x: idx * 250, y: 0 }, // Horizontal spacing
      style: {
        padding: "10px 20px",
        borderRadius: "12px",
        backgroundColor: "#1e1e2e",
        color: "white",
        border: "1px solid #6d28d9",
      },
    });

    if (idx > 0) {
      edges.push({
        id: `e${idx - 1}-${idx}`,
        source: `${idx - 1}`,
        target: `${idx}`,
        animated: true,
        style: { stroke: "#6d28d9" },
      });
    }
  });

  return { nodes, edges };
}

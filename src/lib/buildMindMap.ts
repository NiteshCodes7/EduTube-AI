/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, Edge, Position } from "reactflow";
import dagre from "dagre";

// -------------------- Dagre Layout Helper --------------------
const nodeWidth = 180;
const nodeHeight = 80;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const n = dagreGraph.node(node.id);
    node.position = {
      x: n.x - nodeWidth / 2 + 800,
      y: n.y - nodeHeight / 2,
    };
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;
  });

  return { nodes, edges };
};

// -------------------- Mindmap Builder --------------------
let bubbleCounter = 0;

export const buildMindMap = (mindmap: any, sourceId: string) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const uniquePrefix = `chat-${bubbleCounter++}`;

  const mainId = `${uniquePrefix}-main`;;
  nodes.push({
    id: mainId,
    type: "default",
    position: { x: 100, y: 0 },
    data: { label: mindmap.topic },
    style: {
      border: "2px solid #FFA500",
      background: "#1F2937",
      color: "white",
      padding: 12,
      borderRadius: 12,
      fontWeight: "bold",
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  });

  // Edge from source node (chat) → main topic
  edges.push({
    id: `e-${sourceId}-main`,
    source: sourceId,
    target: mainId,
    animated: true,
    style: { stroke: "#FFA500" },
  });

  // Recursive function for subtopics
  const traverse = (topic: any, parentId: string) => {
    topic.subtopics?.slice(0, 5).forEach((sub: any, i: number) => {
      const id = `${parentId}-${i}`;
      nodes.push({
        id,
        type: "default",
        position: { x: 0, y: 0 },
        data: { label: sub.topic },
        style: {
          border: "2px solid #4F46E5",
          background: "#111827",
          color: "white",
          padding: 10,
          borderRadius: 12,
        },
      });

      edges.push({
        id: `e-${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: true,
        style: { stroke: "#4F46E5" },
      });

      traverse(sub, id);
    });
  };

  traverse(mindmap, mainId);

  return getLayoutedElements(nodes, edges);
};

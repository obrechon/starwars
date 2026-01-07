import {
  type Node,
  type Edge
} from '@xyflow/react';


export function calculateDistance(edge: Edge, node1: Node, node2: Node) {
  const dx = node2.position.x - node1.position.x;
  const dy = node2.position.y - node1.position.y;
  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  const travelTime = `${Math.round(distance / 50)}`;

  return travelTime;
}

export function possiblePaths(edges: Edge[], fuel: number): Edge[] {
  return edges
    .filter(edge => {
      const cost = edge.data?.label ? Number(edge.data.label) : Infinity;
      return fuel >= cost;
    })
    .filter(edge => edge.source === '1' || edge.target === '1');
}

 

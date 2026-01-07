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

export function findNextSteps(currentStep:string, edges: Edge[], fuel: number): Edge[] {
  const nextSteps: Edge[] = [];

  for (const e of edges) {
    const isConnected = e.source === currentStep || e.target === currentStep;
    const cost = e.data?.label ? Number(e.data.label) : Infinity;
    if (isConnected && fuel >= cost) {
      nextSteps.push(e);
    }
  }
  return nextSteps;
}

export function findBestPath(edges: Edge[], fuel: number): Edge[] {
  const startNode = '1';
  const endNode = '4';

  // Queue for BFS, storing tuples of [currentNodeId, pathTakenSoFar]
  const queue: [string, Edge[]][] = [[startNode, []]];
  const visited = new Set<string>([startNode]);

  while (queue.length > 0) {
    const [currentNodeId, path] = queue.shift()!;

    if (currentNodeId === endNode) {
      return path; // We found a path to the end node
    }

    const nextSteps = findNextSteps(currentNodeId, edges, fuel);

    for (const edge of nextSteps) {
      // Determine the next node's ID based on the current edge
      const nextNodeId = edge.source === currentNodeId ? edge.target : edge.source;

      if (!visited.has(nextNodeId)) {
        visited.add(nextNodeId);
        const newPath = [...path, edge];
        queue.push([nextNodeId, newPath]);
      }
    }
  }

  return []; // Return an empty array if no path is found
}

// export function createHighlightedPath(allEdges: Edge[], bestPath: Edge[]): Edge[] {
//   const bestPathEdgeIds = new Set(bestPath.map(edge => edge.id));

//   return allEdges.map(edge => {
//     if (bestPathEdgeIds.has(edge.id)) {
//       // This is an edge in the path, so we return a new edge object with custom styling.
//       return { ...edge, style: { ...edge.style, stroke: 'yellow', strokeWidth: 3 } };
//     }
    
//     return edge;
//   });
// }
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

export function possiblePaths(edges: Edge[], fuel: number): Edge[][] {
  const START_NODE = '1';
  const END_NODE = '3';
  const MAX_PATH_LENGTH = 5;

  const affordableEdges: Edge[] = edges.filter(edge => {
    const cost = edge.data?.label ? Number(edge.data.label) : Infinity;
    return fuel >= cost;
  });

  const finalPaths: Edge[][] = [];

  function findPathsRecursive(currentPath: Edge[], remainingFuel: number, visitedNodes: Set<string>) {
    // Stop if the path is too long
    if (currentPath.length >= MAX_PATH_LENGTH) {
      return;
    }

    const lastEdge = currentPath[currentPath.length - 1];
    const currentNodeId = lastEdge.source === Array.from(visitedNodes).pop() ? lastEdge.target : lastEdge.source;

    // Find next possible connections
    const nextPossibleEdges = affordableEdges.filter(edge => {
      const cost = edge.data?.label ? Number(edge.data.label) : 0;
      if (cost > remainingFuel) return false;

      const isConnected = edge.source === currentNodeId || edge.target === currentNodeId;
      const nextNodeId = edge.source === currentNodeId ? edge.target : edge.source;
      
      return isConnected && !visitedNodes.has(nextNodeId);
    });

    for (const nextEdge of nextPossibleEdges) {
      const newPath = [...currentPath, nextEdge];
      const cost = nextEdge.data?.label ? Number(nextEdge.data.label) : 0;
      
      // If the new edge reaches the end node, save the path and stop exploring this branch
      if (nextEdge.source === END_NODE || nextEdge.target === END_NODE) {
        finalPaths.push(newPath);
        continue; // Found a valid path, no need to go deeper
      }

      // Continue searching deeper
      const newVisitedNodes = new Set(visitedNodes).add(currentNodeId);
      findPathsRecursive(newPath, remainingFuel - cost, newVisitedNodes);
    }
  }

  // Start the search from each edge connected to the START_NODE
  const startingEdges = affordableEdges.filter(edge => edge.source === START_NODE || edge.target === START_NODE);

  for (const startEdge of startingEdges) {
    const cost = startEdge.data?.label ? Number(startEdge.data.label) : 0;
    
    // Check if the very first edge already reaches the destination
    if (startEdge.source === END_NODE || startEdge.target === END_NODE) {
      finalPaths.push([startEdge]);
      continue;
    }

    findPathsRecursive([startEdge], fuel - cost, new Set([START_NODE]));
  }

  return finalPaths;
}

 

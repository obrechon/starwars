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

    if (currentPath.length >= MAX_PATH_LENGTH) {
      return;
    }
    const lastEdge = currentPath[currentPath.length - 1];
    const currentNodeId = lastEdge.source === Array.from(visitedNodes).pop() ? lastEdge.target : lastEdge.source;
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

      if (nextEdge.source === END_NODE || nextEdge.target === END_NODE) {
        finalPaths.push(newPath);
        continue; 
      }

      const newVisitedNodes = new Set(visitedNodes).add(currentNodeId);
      findPathsRecursive(newPath, remainingFuel - cost, newVisitedNodes);
    }
  }

  const startingEdges = affordableEdges.filter(edge => edge.source === START_NODE || edge.target === START_NODE);

  for (const startEdge of startingEdges) {
    const cost = startEdge.data?.label ? Number(startEdge.data.label) : 0;

    if (startEdge.source === END_NODE || startEdge.target === END_NODE) {
      finalPaths.push([startEdge]);
      continue;
    }

    findPathsRecursive([startEdge], fuel - cost, new Set([START_NODE]));
  }

  return finalPaths;
}

export function detectFullPath(visibleEdges: Edge[]): boolean {
  const START_NODE = '1';
  const END_NODE = '3';

  // 1. Quick check: if no edges are connected to the start or end, no path can exist.
  const hasStartEdge = visibleEdges.some(e => e.source === START_NODE || e.target === START_NODE);
  const hasEndEdge = visibleEdges.some(e => e.source === END_NODE || e.target === END_NODE);

  if (!hasStartEdge || !hasEndEdge) {
    return false;
  }

  // 2. Build an adjacency list to represent the graph of visible edges.
  const adjList = new Map<string, string[]>();
  for (const edge of visibleEdges) {
    if (!adjList.has(edge.source)) adjList.set(edge.source, []);
    if (!adjList.has(edge.target)) adjList.set(edge.target, []);
    adjList.get(edge.source)!.push(edge.target);
    adjList.get(edge.target)!.push(edge.source);
  }

  // 3. Perform a traversal (BFS) to see if END_NODE is reachable from START_NODE.
  const queue: string[] = [START_NODE];
  const visited = new Set<string>([START_NODE]);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode === END_NODE) {
      return true; // Path found!
    }

    const neighbors = adjList.get(currentNode) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return false; // Traversal finished, no path found.
}

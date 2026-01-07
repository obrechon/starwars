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

export function findPossiblePaths(currentStep:string, edges: Edge[], fuel: number): Edge[] {
  const firstLayerPaths: Edge[] = [];
/**
 * Finds a path from a start node to a target node using a Depth-First Search (DFS) approach,
 * ensuring the total path cost does not exceed the available fuel.
 *
 * @param startNode The ID of the starting node.
 * @param targetNode The ID of the target node.
 * @param edges An array of all edges in the graph.
 * @param fuel The maximum fuel available for the path.
 * @returns An array of Edges representing the first valid path found, or null if no path exists.
 */
export function findPath(startNode: string, targetNode: string, edges: Edge[], fuel: number): Edge[] | null {
  // Helper function to perform the recursive DFS
  function dfs(currentNode: string, currentPath: Edge[], visitedNodes: Set<string>, remainingFuel: number): Edge[] | null {
    // Base case: we have reached the target node
    if (currentNode === targetNode) {
      return currentPath;
    }

  for (const e of edges) {
    const isConnected = e.source === currentStep || e.target === currentStep;
    const cost = e.data?.label ? Number(e.data.label) : Infinity;
    if (isConnected && fuel >= cost) {
      firstLayerPaths.push(e);
    // Mark the current node as visited for this path
    visitedNodes.add(currentNode);

    // Find all connected, affordable, and unvisited next steps
    for (const edge of edges) {
      const cost = edge.data?.label ? Number(edge.data.label) : Infinity;

      if (remainingFuel >= cost) {
        let nextNode: string | null = null;
        if (edge.source === currentNode && !visitedNodes.has(edge.target)) {
          nextNode = edge.target;
        } else if (edge.target === currentNode && !visitedNodes.has(edge.source)) {
          nextNode = edge.source;
        }

        if (nextNode) {
          // Recursively search from the next node
          const result = dfs(nextNode, [...currentPath, edge], new Set(visitedNodes), remainingFuel - cost);
          // If a path is found, return it immediately
          if (result) {
            return result;
          }
        }
      }
    }
  }  

  // Get all unique nodes from the first layer of paths
  const firstLayerNodes = new Set(
    firstLayerPaths.flatMap(e => [e.source, e.target]).filter(nodeId => nodeId !== currentStep)
  );
    // No path found from the current node
    return null;
  }

  const secondLayerPaths = edges.filter(e => {
    const isConnected = firstLayerNodes.has(e.source) || firstLayerNodes.has(e.target);
    const cost = e.data?.label ? Number(e.data.label) : Infinity;
    return isConnected && fuel >= cost;
  });

  // Combine first and second layer paths, removing duplicates
  return Array.from(new Set([...firstLayerPaths, ...secondLayerPaths]));
  // Start the search from the startNode
  return dfs(startNode, [], new Set<string>(), fuel);
}

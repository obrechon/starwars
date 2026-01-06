import {
  type Node,
  type Edge
} from '@xyflow/react';


export function calculateDistance(edge: Edge, node1: Node, node2: Node) {
    const dx = node2.position.x - node1.position.x;
    const dy = node2.position.y - node1.position.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const travelTime = Math.round(distance / 30);

    return travelTime;
}
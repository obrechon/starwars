import React, { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionMode,
  type EdgeTypes,
  type Edge,
  type OnConnect,
  type Node,

} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import SimpleFloatingEdge from './SimpleFloatingEdge';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';

import './index.css';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: SimpleFloatingEdge,
  custom: CustomEdge,
};

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: -300, y: 0 },
    data: { label: 'Tatooine', handles: { right: true }, style: { width: 100, height: 100, backgroundColor: '#F2D7C3', color: '#886362'} },
    type: 'custom'
  },
  {
    id: '2',
    position: { x: -150, y: -300 },
    data: { label: 'Dagobah', handles: { bottom: true }, style: { width: 220, height: 220, backgroundColor: '#B5C2BE', color: '#202E2E'} },
    type: 'custom',
  },
  {
    id: '3',
    position: { x: 400, y: -200 },
    data: { label: 'Endor', handles: { left: true }, style: { width: 280, height: 280, backgroundColor: '#A1CEC6', color: '#48615F'} },
    type: 'custom',
  },
  {
    id: '4',
    position: { x: 100, y: 200 },
    data: { label: 'Hoth', handles: { top: true }, style: { width: 75, height: 75, backgroundColor: '#F5FAFF', color: '#45A3A4'} },
    type: 'custom',
  },
];

/**
 * Calculates the Euclidean distance between two nodes.
 * The formula is sqrt((x2-x1)^2 + (y2-y1)^2).
 * @param node1 The first node.
 * @param node2 The second node.
 * @returns The distance between the two nodes.
 */
const calculateDistance = (node1: Node, node2: Node): number => {
  const dx = node2.position.x - node1.position.x;
  const dy = node2.position.y - node1.position.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
};

/**
 * Creates an edge with a calculated travel time label.
 * @param sourceNode The source node.
 * @param targetNode The target node.
 * @param sourceHandle The source handle id.
 * @param targetHandle The target handle id.
 * @returns A React Flow edge object.
 */
const createTravelEdge = (sourceNode: Node, targetNode: Node, sourceHandle: string, targetHandle: string): Edge => {
  const distance = calculateDistance(sourceNode, targetNode);
  const travelTime = Math.round(distance / 30);

  return {
    id: `${sourceNode.id}-${targetNode.id}`,
    source: sourceNode.id,
    target: targetNode.id,
    sourceHandle,
    targetHandle,
    deletable: false,
    reconnectable: false,
    selectable: false,
    data: { label: `${travelTime} days` },
    type: 'custom',
  };
};

const initialEdges: Edge[] = [
  createTravelEdge(initialNodes[0], initialNodes[1], 'b', 'c'), // 1-2
  createTravelEdge(initialNodes[0], initialNodes[2], 'b', 'd'), // 1-3
  createTravelEdge(initialNodes[0], initialNodes[3], 'b', 'a'), // 1-4
  createTravelEdge(initialNodes[1], initialNodes[3], 'c', 'a'), // 2-4
  createTravelEdge(initialNodes[1], initialNodes[2], 'c', 'd'), // 2-3
  createTravelEdge(initialNodes[2], initialNodes[3], 'd', 'a'), // 3-4
];

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, __: Node, nodes: Node[]) => {
      // Create a Map for efficient node lookup by ID
      const nodesById = new Map(nodes.map((n) => [n.id, n]));

      setEdges((currentEdges) =>
        currentEdges.map((edge) => {
          const sourceNode = nodesById.get(edge.source);
          const targetNode = nodesById.get(edge.target);

          // This should always be true in a connected graph
          if (sourceNode && targetNode) {
            const distance = calculateDistance(sourceNode, targetNode);
            const travelTime = Math.round(distance / 30);

            // Return a new edge object to ensure re-rendering
            return {
              ...edge,
              data: {
                ...edge.data,
                label: `${travelTime} days`,
              },
            };
          }

          return edge;
        })
      );
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} 
        onNodeDragStop={onNodeDragStop}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
        isConnectable={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;

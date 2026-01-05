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
    position: { x: -200, y: 0 },
    data: { label: 'Tatooine', handles: { right: true } },
    type: 'custom'
  },
  {
    id: '2',
    position: { x: -100, y: -200 },
    data: { label: 'Dagobah', handles: { bottom: true } },
    type: 'custom',
  },
  {
    id: '3',
    position: { x: 300, y: -200 },
    data: { label: 'Endor', handles: { left: true } },
    type: 'custom',
  },
  {
    id: '4',
    position: { x: 100, y: 200 },
    data: { label: 'Hoth', handles: { top: true } },
    type: 'custom',
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'b',
    targetHandle: 'c',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  },
  {
    id: '1-3',
    source: '1',
    target: '3',
    sourceHandle: 'b',
    targetHandle: 'd',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  },
  {
    id: '1-4',
    source: '1',
    target: '4',
    sourceHandle: 'b',
    targetHandle: 'a',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  },
  {
    id: '2-4',
    source: '2',
    target: '4',
    sourceHandle: 'c',
    targetHandle: 'a',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    sourceHandle: 'c',
    targetHandle: 'd',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  },
  {
    id: '3-4',
    source: '3',
    target: '4',
    sourceHandle: 'd',
    targetHandle: 'a',
    deletable: false,
    reconnectable: false,
    data: {
      label: '4 days',
    },
    type: 'custom',
  }
];

const fitViewOptions = { padding: 4 };

const NodeAsHandleFlow = () => {
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            // Create a new object to ensure a re-render
            return {
              ...n,
              data: {
                ...n.data,
                label: `x: ${Math.round(node.position.x)}, y: ${Math.round(node.position.y)}`,
              },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
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

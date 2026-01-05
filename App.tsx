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

const initialNodes = [
  {
    id: '1',
    label: '1',
    position: { x: -300, y: 0 },
    data: { label: 'Tatooine' },
    type: 'custom',
  },
  {
    id: '2',
    label: '2',
    position: { x: 0, y: -200 },
    data: { label: 'Dagobah' },
    type: 'custom',
  },
  {
    id: '3',
    label: '3',
    position: { x: 300, y: 0 },
    data: { label: 'Endor' },
    type: 'custom',
  },
  {
    id: '4',
    label: '4',
    position: { x: 0, y: 200 },
    data: { label: 'Hoth' },
    type: 'custom',
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
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
    id: '1-3',
    source: '1',
    target: '3',
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
    id: '1-4',
    source: '1',
    target: '4',
    sourceHandle: 'a',
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
    targetHandle: 'a',
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
    sourceHandle: 'c',
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
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
    [],
  );

  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
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

import React, { useCallback, useEffect, useState } from 'react';
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

import { initialNodes } from './lib/initial-nodes';
import { initialEdges } from './lib/initial-edges';
import { calculateDistance } from './lib/actions';

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

const fitViewOptions = { padding: 1 };

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateEdgeLabels = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    const updatedEdges = currentEdges.map((edge) => {
      const sourceNode = currentNodes.find((node) => node.id === edge.source);
      const targetNode = currentNodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        const days = calculateDistance(edge, sourceNode, targetNode);
        return { ...edge, data: { ...edge.data, label: days } };
      }
      return edge;
    });
    setEdges(updatedEdges);
  }, [setEdges]);

  
  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} 
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

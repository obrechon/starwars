import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionMode,
  type Edge,
  type Node,
} from '@xyflow/react';

import { initialNodes } from './lib/initial-nodes';
import { initialEdges } from './lib/initial-edges';
import { calculateDistance, possiblePaths } from './lib/actions';

import '@xyflow/react/dist/style.css';

import SimpleFloatingEdge from './SimpleFloatingEdge';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import Sidebar from './ui/Sidebar';

import './global.css';

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
  const [allEdges, setAllEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [fuel, setFuel] = useState(10);

  // 2. This effect runs once to calculate the cost for every edge.
  useEffect(() => {
    const edgesWithCosts = allEdges.map((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetNode = nodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        const cost = calculateDistance(edge, sourceNode, targetNode);
        return { ...edge, data: { ...edge.data, label: cost } };
      }
      return edge;
    });
    setAllEdges(edgesWithCosts);
    // We only want this to run once on mount, so we have a limited dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, setAllEdges]);

  // 3. Derive the edges to display by filtering allEdges based on fuel.
  // This is not a state update, it's calculated on every render. No loop!
  const visibleEdges = allEdges.filter(edge => {
    // Edges with a non-numeric label (like '?') are treated as infinitely expensive.
    const cost = edge.data?.label ? Number(edge.data.label) : Infinity;
    return cost < fuel;
  });

  // This effect now safely uses the derived `visibleEdges`.
  useEffect(() => {
    console.log(possiblePaths(visibleEdges, fuel));
  }, [visibleEdges, fuel]);

  return (
    <div className="simple-floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={visibleEdges}
        onNodesChange={onNodesChange} 
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        connectionMode={ConnectionMode.Loose}
        // isConnectable={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;

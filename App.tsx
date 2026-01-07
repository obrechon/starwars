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
import { calculateDistance, createHighlightedPath, findBestPath } from './lib/actions';

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
  const fuel:number = 10;
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateEdgeLabels = useCallback((currentNodes: Node[], currentEdges: Edge[]): Edge[] => {
    return currentEdges.map((edge) => {
      const sourceNode = currentNodes.find((node) => node.id === edge.source);
      const targetNode = currentNodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        const days = calculateDistance(edge, sourceNode, targetNode);
        return { ...edge, data: { ...edge.data, label: days } };
      }
      return edge;
    });
  }, [setEdges]);

  useEffect(() => { 
    // First, update all edge labels with the current distances
    updateEdgeLabels(nodes, edges);

    // Then, find the best path using these up-to-date edges
    // findBestPath(edges, fuel);
    // console.log(findBestPath(edges, fuel))

    // // Finally, create a new set of edges with the path highlighted
    // const highlightedEdges = createHighlightedPath(edgesWithUpdatedLabels, path);

    // // Update the state to render the changes
    // setEdges(highlightedEdges);
    // console.log(highlightedEdges)
  }, [nodes, fuel, setEdges]);

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

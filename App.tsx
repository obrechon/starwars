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
import { calculateDistance, findBestPath, findNextSteps } from './lib/actions';

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
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [fuel, setFuel] = useState(15);

  const updateEdgeLabels = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    let changed = false;
    const updatedEdges = currentEdges.map((edge) => {
      const sourceNode = currentNodes.find((node) => node.id === edge.source);
      const targetNode = currentNodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode) {
        const days = calculateDistance(edge, sourceNode, targetNode);
        if (edge.data?.label !== days) {
          changed = true;
        }
        return { ...edge, data: { ...edge.data, label: days } };
      }
      return edge;
    });

    if (changed) setEdges(updatedEdges);
  }, [setEdges]);

  useEffect(() => {
    updateEdgeLabels(nodes, edges);
    console.log(findNextSteps('1', edges, fuel))
  }, [nodes, edges, updateEdgeLabels]);



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
        // isConnectable={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;

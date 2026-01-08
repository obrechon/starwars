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
import { calculateDistance, detectFullPath, possiblePaths } from './lib/actions';

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [allEdges, setAllEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [empireWinning, setEmpireWinning] = useState(true);
  const [fuel, setFuel] = useState(10);
  const visibleEdges = allEdges.filter(edge => {
    if (edge.id === '5-3' || edge.id === '3-5') {
      return true;
    }
    const cost = edge.data?.label ? Number(edge.data.label) : Infinity;
    return cost < fuel;
  });

  useEffect(() => {
    const edgesWithCosts = allEdges.map((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetNode = nodes.find((node) => node.id === edge.target);

      if (sourceNode && targetNode && edge.id !== '5-3' && edge.id !== '3-5') {
        const cost = calculateDistance(edge, sourceNode, targetNode);

        const new_data = { ...edge.data, label: cost };
        return { ...edge, data: new_data };
      }
      return edge;
    });
    setAllEdges(edgesWithCosts);
  }, [nodes, allEdges.length]);


  useEffect(() => {
    console.log(possiblePaths(visibleEdges, fuel));
  }, [visibleEdges, fuel]);


  useEffect(() => {

    const empireShot = {
      id: '5-3',
      source: '5',
      target: '3',
      sourceHandle: 'd',
      targetHandle: 'b',
      deletable: false,
      reconnectable: false,
      type: 'custom',
      animated:true,
      data: {
        label: 'Empire wins!!!',
      }
    }

    const rebelShot = {
      id: '3-5',
      source: '3',
      target: '5',
      sourceHandle: 'b',
      targetHandle: 'd',
      deletable: false,
      reconnectable: false,
      type: 'custom',
      animated:true,
      data: {
        label: 'Rebels win!!!',
      }
    }

    empireWinning ? 
      setAllEdges((eds) => {
        if (eds.some((e) => e.id === '5-3')) return eds;
        return [...eds, empireShot];
      }) :
    setAllEdges((eds) => {
      if (eds.some((e) => e.id === '3-5')) return eds;
      return [...eds, rebelShot];
      });

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '3') {
          const newBackgroundColor = empireWinning ? '#000000ff' : '#A1CEC6';
          return {
            ...node,
            data: { ...node.data, style: { ...node.data.style, backgroundColor: newBackgroundColor } },
          };
        }
        if (node.id === '5') {
          const newBackgroundColor = empireWinning ? '#8e8484ff' : '#000000ff';
          return {
            ...node,
            data: { ...node.data, style: { ...node.data.style, backgroundColor: newBackgroundColor } },
          };
        }
        return node;
      })
    );
  }, [empireWinning, setAllEdges, setNodes]);

  useEffect(() => {
    detectFullPath(visibleEdges) ? 
    setEmpireWinning(false) :
    setEmpireWinning(true)
  }, visibleEdges);

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
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;

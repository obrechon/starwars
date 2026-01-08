import {
  type Edge,
} from '@xyflow/react';

export const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'b',
    targetHandle: 'c',
    deletable: false,
    reconnectable: false,
    data: {
      label: '?',
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
      label: '?',
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
      label: '?',
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
      label: '?',
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
      label: '?',
    },
    type: 'custom',
  },
  {
    id: '4-3',
    source: '3',
    target: '4',
    sourceHandle: 'd',
    targetHandle: 'a',
    deletable: false,
    reconnectable: false,
    data: {
      label: '?',
    },
    type: 'custom',
  }
];

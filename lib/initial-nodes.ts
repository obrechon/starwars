import {
  type Node,
} from '@xyflow/react';

export const initialNodes: Node[] = [
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
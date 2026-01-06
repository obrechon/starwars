import {
  type Node,
} from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: -300, y: 0 },
    data: { label: 'Tatooine', handles: { right: true }, style: { width: 100, height: 100, borderColor: 'white', backgroundColor: 'black', color: 'white'} },
    type: 'custom'
  },
  {
    id: '2',
    position: { x: -150, y: -300 },
    data: { label: 'Dagobah ☠️', handles: { bottom: true }, style: { width: 220, height: 220, backgroundColor: '#646b69ff', color: '#a1c4c4ff'} },
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
    data: { label: 'Hoth ☠️', handles: { top: true }, style: { width: 75, height: 75, backgroundColor: '#434648ff', color: '#b3d5d6ff'} },
    type: 'custom',
  },
];
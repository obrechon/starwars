import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data = {} }) => {
  // Default to all handles if `data.handles` is not provided
  const { label, handles = { top: true, right: true, bottom: true, left: true } } = data;

  return (
    <>
      {label}
      {handles.top && <Handle type="source" position={Position.Top} id="a" />}
      {handles.right && <Handle type="source" position={Position.Right} id="b" />}
      {handles.bottom && <Handle type="source" position={Position.Bottom} id="c" />}
      {handles.left && <Handle type="source" position={Position.Left} id="d" />}
    </>
  );
});

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const nodeStyle = {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '100%',
    color: 'black'
};

export default memo(({ data = {} }) => {
  // Default to all handles if `data.handles` is not provided
  const { label, handles = { top: true, right: true, bottom: true, left: true }, style } = data;

  const mergedStyles = { ...nodeStyle, ...style };

  return (
    <div style={mergedStyles}>
      {label}
      {handles.top && <Handle type="source" position={Position.Top} id="a" />}
      {handles.right && <Handle type="source" position={Position.Right} id="b" />}
      {handles.bottom && <Handle type="source" position={Position.Bottom} id="c" />}
      {handles.left && <Handle type="source" position={Position.Left} id="d" />}
    </div>
  );
});

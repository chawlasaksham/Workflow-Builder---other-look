import React, { useState, useCallback, useRef } from 'react';
import Icon from 'components/AppIcon';
import { Handle, Position } from '@xyflow/react';

const WorkflowNode = ({
  id,
  data = {},
  selected,
  xPos,
  yPos,
  isConnectable,
  sourcePosition,
  targetPosition,
  ...props
}) => {
  // Fallbacks for icon/category if not in data
  const icon = data.icon || 'Box';
  const label = data.label || '';
  const description = data.description || 'No description available';
  const config = data.config || {};
  // For category-based color, fallback to 'triggers'
  const category = data.category || 'triggers';
  const getNodeTypeColor = () => {
    switch (category) {
      case 'triggers': return 'text-accent bg-accent-50';
      case 'actions': return 'text-success bg-success-50';
      case 'logic': return 'text-warning bg-warning-50';
      case 'data': return 'text-primary bg-primary-50';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  return (
    <div
      style={{
        width: 260,
        height: 150,
        background: '#fff',
        borderRadius: 12,
        boxShadow: selected ? '0 0 0 2px #3b82f6' : '0 1px 4px 0 rgba(0,0,0,0.04)',
        border: `2px solid ${selected ? '#3b82f6' : '#e5e7eb'}`,
        transition: 'box-shadow 0.2s, border 0.2s',
      }}
    >
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#bbb',
          width: 16,
          height: 16,
          borderRadius: '50%',
          left: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#bbb',
          width: 16,
          height: 16,
          borderRadius: '50%',
          right: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        isConnectable={isConnectable}
      />
      {/* Node Header: Icon and Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 0 16px' }}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNodeTypeColor()}`}
             style={{ fontSize: 20, background: 'rgba(59,130,246,0.08)' }}>
          <Icon name={icon} size={20} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#111', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {label}
        </span>
      </div>
      {/* Node Description */}
      <div style={{ padding: '4px 16px 0 16px', color: '#6b7280', fontSize: 14 }}>
        {description}
      </div>
      {/* Config Preview */}
      <div style={{ padding: '8px 16px 16px 16px', fontSize: 14 }}>
        {config && Object.keys(config).length > 0 ? (
          <>
            {Object.entries(config).slice(0, 2).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', color: '#444', marginBottom: 2 }}>
                <span style={{ color: '#6b7280' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span style={{ color: '#222', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{typeof value === 'string' ? value : JSON.stringify(value)}</span>
              </div>
            ))}
            {Object.keys(config).length > 2 && (
              <div style={{ color: '#6b7280', fontSize: 13 }}>+{Object.keys(config).length - 2} more...</div>
            )}
          </>
        ) : (
          <span style={{ color: '#6b7280' }}>No config</span>
        )}
      </div>
    </div>
  );
};

export default WorkflowNode;
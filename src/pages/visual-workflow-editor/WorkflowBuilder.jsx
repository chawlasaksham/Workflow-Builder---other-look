import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EnhancedCanvas } from './EnhancedCanvas';
import NodePalette from './components/NodePalette';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import WorkflowNode from './components/WorkflowNode';
import { initialNodes, initialEdges } from './initialWorkflow';

const handleStyleGreen = { background: '#22c55e', width: 16, height: 16, borderRadius: '50%' };
const handleStyleBlue = { background: '#0ea5e9', width: 16, height: 16, borderRadius: '50%' };
const handleStyleYellow = { background: '#eab308', width: 16, height: 16, borderRadius: '50%' };

const TriggerNode = ({ data }) => (
  <div style={{
    padding: 16,
    background: '#fff',
    border: '2px solid #22c55e',
    borderRadius: 12,
    minWidth: 140,
    position: 'relative',
  }}>
    <Handle type="target" position={Position.Left} style={handleStyleGreen} />
    <Handle type="source" position={Position.Right} style={handleStyleGreen} />
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ background: '#22c55e', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: 8 }}>▶</span>
      <span style={{ fontWeight: 'bold', fontSize: 16 }}>{data.label}</span>
    </div>
    <div style={{ fontSize: 12, color: '#222' }}>Config: interval, cron</div>
  </div>
);

const HttpNode = ({ data }) => (
  <div style={{
    padding: 16,
    background: '#fff',
    border: '2px solid #0ea5e9',
    borderRadius: 12,
    minWidth: 140,
    position: 'relative',
  }}>
    <Handle type="target" position={Position.Left} style={handleStyleBlue} />
    <Handle type="source" position={Position.Right} style={handleStyleBlue} />
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ background: '#0ea5e9', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: 8 }}>🌐</span>
      <span style={{ fontWeight: 'bold', fontSize: 16 }}>{data.label}</span>
    </div>
    <div style={{ fontSize: 12, color: '#222' }}>Config: {data.config?.method}, {data.config?.url}</div>
  </div>
);

const ConditionNode = ({ data }) => (
  <div style={{
    padding: 16,
    background: '#fff',
    border: '2px solid #eab308',
    borderRadius: 12,
    minWidth: 140,
    position: 'relative',
  }}>
    <Handle type="target" position={Position.Left} style={handleStyleYellow} />
    <Handle type="source" position={Position.Right} style={handleStyleYellow} />
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ background: '#eab308', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: 8 }}>?</span>
      <span style={{ fontWeight: 'bold', fontSize: 16 }}>{data.label}</span>
    </div>
    <div style={{ fontSize: 12, color: '#222' }}>Config: {data.config?.condition}</div>
  </div>
);

const nodeTypes = {
  trigger: WorkflowNode,
  http: WorkflowNode,
  condition: WorkflowNode,
  action: WorkflowNode,
  logic: WorkflowNode,
  data: WorkflowNode,
};

export const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);

  // Auto-spacing function to arrange nodes horizontally
  const autoArrangeNodes = useCallback(() => {
    const nodeWidth = 200;
    const nodeHeight = 120;
    const horizontalSpacing = 100;
    const verticalSpacing = 50;
    const startX = 100;
    const startY = 100;

    setNodes((currentNodes) => {
      const sortedNodes = [...currentNodes].sort((a, b) => {
        // Sort by x position first, then by y position
        if (Math.abs(a.position.x - b.position.x) < 50) {
          return a.position.y - b.position.y;
        }
        return a.position.x - b.position.x;
      });

      return sortedNodes.map((node, index) => ({
        ...node,
        position: {
          x: startX + (index * (nodeWidth + horizontalSpacing)),
          y: startY
        }
      }));
    });
  }, [setNodes]);

  // Auto-arrange nodes when component mounts
  useEffect(() => {
    autoArrangeNodes();
  }, [autoArrangeNodes]);

  // Auto-arrange nodes when new nodes are added
  useEffect(() => {
    if (nodes.length > 0) {
      autoArrangeNodes();
    }
  }, [nodes.length, autoArrangeNodes]);

  // Add node to canvas at a default position
  const handleNodeAdd = useCallback((nodeType, position = { x: 200, y: 200 }) => {
    const newNode = {
      id: `${nodeType.id}-${Date.now()}`,
      type: nodeType.type || 'default',
      position,
      data: {
        label: nodeType.name,
        config: nodeType.defaultData || {},
        status: 'idle',
      },
    };
    setNodes((nds) => {
      const updatedNodes = nds.concat(newNode);
      // Auto-arrange nodes after adding new node
      setTimeout(() => autoArrangeNodes(), 100);
      return updatedNodes;
    });
  }, [setNodes, autoArrangeNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/json');
    if (!data) return;
    const nodeType = JSON.parse(data);
    if (!reactFlowInstance) return;
    const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
    handleNodeAdd(nodeType, position);
  }, [reactFlowInstance, handleNodeAdd]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeIds([node.id]);
  }, []);

  // Update node data when edited in the sidebar
  const handleNodeUpdate = useCallback((nodeId, updates) => {
    setNodes((nds) => nds.map(n => n.id === nodeId ? { ...n, ...updates, data: { ...n.data, ...updates.data } } : n));
  }, [setNodes]);

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-auto">
        {/* Left Sidebar: Node Palette */}
        <div style={{ width: 300, background: '#f8fafc', borderRight: '1px solid #e5e7eb', minWidth: 220 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <button
              onClick={autoArrangeNodes}
              style={{
                width: '100%',
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseOver={(e) => e.target.style.background = '#2563eb'}
              onMouseOut={(e) => e.target.style.background = '#3b82f6'}
            >
              Auto Arrange Nodes
            </button>
          </div>
          <NodePalette onNodeAdd={handleNodeAdd} onClose={() => {}} />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex relative">
            <div className="flex-1 relative overflow-auto">
              <EnhancedCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                isExecuting={isExecuting}
                selectedNodes={selectedNodeIds}
                onAutoArrange={autoArrangeNodes}
              />
            </div>
            {/* Right Sidebar: Node Properties Panel */}
            {selectedNodeIds.length > 0 && (
              <div style={{ width: 400, minWidth: 320, maxWidth: 480, background: '#fff', borderLeft: '1px solid #e5e7eb', boxShadow: '0 0 16px rgba(0,0,0,0.04)', zIndex: 20 }}>
                <NodePropertiesPanel
                  selectedNodes={nodes.filter(n => selectedNodeIds.includes(n.id))}
                  onNodeUpdate={handleNodeUpdate}
                  onClose={() => setSelectedNodeIds([])}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}; 
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const NodePalette = ({ onNodeAdd, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const nodeTypes = [
    // Triggers
    {
      id: 'http-trigger',
      name: 'HTTP Request',
      category: 'triggers',
      type: 'trigger',
      description: 'Trigger workflow on HTTP request',
      icon: 'Globe',
      inputs: [],
      outputs: [{ id: 'output', type: 'any', label: 'Response' }],
      defaultData: { method: 'POST', url: '', headers: {} }
    },
    {
      id: 'schedule-trigger',
      name: 'Schedule',
      category: 'triggers',
      type: 'trigger',
      description: 'Trigger workflow on schedule',
      icon: 'Clock',
      inputs: [],
      outputs: [{ id: 'output', type: 'any', label: 'Trigger' }],
      defaultData: { interval: '5m', timezone: 'UTC' }
    },
    {
      id: 'webhook-trigger',
      name: 'Webhook',
      category: 'triggers',
      type: 'trigger',
      description: 'Trigger workflow via webhook',
      icon: 'Webhook',
      inputs: [],
      outputs: [{ id: 'output', type: 'any', label: 'Payload' }],
      defaultData: { path: '/webhook', method: 'POST' }
    },
    
    // Actions
    {
      id: 'send-email',
      name: 'Send Email',
      category: 'actions',
      type: 'action',
      description: 'Send email notification',
      icon: 'Mail',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Result' }],
      defaultData: { to: '', subject: '', body: '' }
    },
    {
      id: 'http-request',
      name: 'HTTP Request',
      category: 'actions',
      type: 'action',
      description: 'Make HTTP API call',
      icon: 'Send',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Response' }],
      defaultData: { method: 'GET', url: '', headers: {} }
    },
    {
      id: 'database-insert',
      name: 'Database Insert',
      category: 'actions',
      type: 'action',
      description: 'Insert data into database',
      icon: 'Database',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Result' }],
      defaultData: { table: '', columns: {} }
    },
    {
      id: 'file-write',
      name: 'Write File',
      category: 'actions',
      type: 'action',
      description: 'Write data to file',
      icon: 'FileText',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Result' }],
      defaultData: { path: '', content: '', encoding: 'utf8' }
    },
    
    // Logic
    {
      id: 'if-condition',
      name: 'IF Condition',
      category: 'logic',
      type: 'logic',
      description: 'Conditional branching',
      icon: 'GitBranch',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [
        { id: 'true', type: 'any', label: 'True' },
        { id: 'false', type: 'any', label: 'False' }
      ],
      defaultData: { condition: '', trueOutput: '', falseOutput: '' }
    },
    {
      id: 'switch',
      name: 'Switch',
      category: 'logic',
      type: 'logic',
      description: 'Multi-way branching',
      icon: 'Split',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [
        { id: 'case1', type: 'any', label: 'Case 1' },
        { id: 'case2', type: 'any', label: 'Case 2' },
        { id: 'default', type: 'any', label: 'Default' }
      ],
      defaultData: { expression: '', cases: [] }
    },
    {
      id: 'loop',
      name: 'Loop',
      category: 'logic',
      type: 'logic',
      description: 'Iterate over data',
      icon: 'RotateCw',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Item' }],
      defaultData: { items: '', maxIterations: 100 }
    },
    
    // Data
    {
      id: 'data-transform',
      name: 'Transform Data',
      category: 'data',
      type: 'data',
      description: 'Transform and map data',
      icon: 'Shuffle',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Transformed' }],
      defaultData: { mapping: {}, transformations: [] }
    },
    {
      id: 'data-filter',
      name: 'Filter Data',
      category: 'data',
      type: 'data',
      description: 'Filter data based on conditions',
      icon: 'Filter',
      inputs: [{ id: 'input', type: 'any', label: 'Data' }],
      outputs: [{ id: 'output', type: 'any', label: 'Filtered' }],
      defaultData: { conditions: [], operator: 'AND' }
    },
    {
      id: 'data-merge',
      name: 'Merge Data',
      category: 'data',
      type: 'data',
      description: 'Merge multiple data sources',
      icon: 'Merge',
      inputs: [
        { id: 'input1', type: 'any', label: 'Data 1' },
        { id: 'input2', type: 'any', label: 'Data 2' }
      ],
      outputs: [{ id: 'output', type: 'any', label: 'Merged' }],
      defaultData: { mergeStrategy: 'combine', keys: [] }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Nodes', icon: 'Grid3X3', count: nodeTypes.length },
    { id: 'triggers', name: 'Triggers', icon: 'Zap', count: nodeTypes.filter(n => n.category === 'triggers').length },
    { id: 'actions', name: 'Actions', icon: 'Play', count: nodeTypes.filter(n => n.category === 'actions').length },
    { id: 'logic', name: 'Logic', icon: 'GitBranch', count: nodeTypes.filter(n => n.category === 'logic').length },
    { id: 'data', name: 'Data', icon: 'Database', count: nodeTypes.filter(n => n.category === 'data').length }
  ];

  const filteredNodes = useMemo(() => {
    return nodeTypes.filter(node => {
      const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           node.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/json', JSON.stringify(nodeType));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleNodeClick = (nodeType) => {
    // Add node at center of canvas
    onNodeAdd(nodeType, { x: 300, y: 200 });
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading-medium text-text-primary">Node Palette</h3>
        <button
          onClick={onClose}
          className="p-1 text-text-tertiary hover:text-text-primary transition-micro rounded"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-secondary-50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="space-y-1">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-micro
                ${selectedCategory === category.id
                  ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon name={category.icon} size={16} />
                <span className="font-body-medium">{category.name}</span>
              </div>
              <span className="text-xs opacity-60">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredNodes.map(nodeType => (
            <div
              key={nodeType.id}
              draggable
              onDragStart={(e) => handleDragStart(e, nodeType)}
              onClick={() => handleNodeClick(nodeType)}
              className="group p-3 bg-surface border border-border rounded-lg cursor-pointer 
                       hover:border-primary hover:shadow-subtle transition-all hover-scale"
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                  ${nodeType.category === 'triggers' ? 'bg-accent-50 text-accent' :
                    nodeType.category === 'actions' ? 'bg-success-50 text-success' :
                    nodeType.category === 'logic'? 'bg-warning-50 text-warning' : 'bg-primary-50 text-primary'}
                `}>
                  <Icon name={nodeType.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-body-medium text-text-primary group-hover:text-primary transition-micro">
                    {nodeType.name}
                  </h4>
                  <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                    {nodeType.description}
                  </p>
                  
                  {/* Input/Output indicators */}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="ArrowDown" size={12} />
                      <span>{nodeType.inputs.length} inputs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="ArrowUp" size={12} />
                      <span>{nodeType.outputs.length} outputs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNodes.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-text-tertiary mx-auto mb-2" />
            <p className="text-text-tertiary">No nodes found</p>
            <p className="text-xs text-text-tertiary mt-1">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="p-4 border-t border-border bg-secondary-50">
        <p className="text-xs text-text-tertiary">
          <Icon name="Info" size={12} className="inline mr-1" />
          Drag nodes to canvas or click to add at center
        </p>
      </div>
    </div>
  );
};

export default NodePalette;
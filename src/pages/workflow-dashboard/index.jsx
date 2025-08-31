import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import WorkflowCard from './components/WorkflowCard';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import FilterToolbar from './components/FilterToolbar';

const WorkflowDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('modified');
  const [isActivityExpanded, setIsActivityExpanded] = useState(false);

  // Mock data for workflows
  const workflows = [
    {
      id: 1,
      name: "Customer Onboarding",
      description: "Automated customer registration and welcome email sequence",
      status: "active",
      lastModified: new Date(Date.now() - 86400000),
      executions: 156,
      successRate: 98.7,
      tags: ["customer", "email", "automation"],
      createdBy: "John Doe",
      nodes: 8
    },
    {
      id: 2,
      name: "Invoice Processing",
      description: "Extract data from invoices and update accounting system",
      status: "error",
      lastModified: new Date(Date.now() - 3600000),
      executions: 89,
      successRate: 85.4,
      tags: ["finance", "data", "processing"],
      createdBy: "Sarah Wilson",
      nodes: 12
    },
    {
      id: 3,
      name: "Social Media Scheduler",
      description: "Schedule and publish content across multiple platforms",
      status: "active",
      lastModified: new Date(Date.now() - 7200000),
      executions: 234,
      successRate: 96.2,
      tags: ["social", "content", "scheduling"],
      createdBy: "Mike Johnson",
      nodes: 6
    },
    {
      id: 4,
      name: "Lead Qualification",
      description: "Score and route leads based on predefined criteria",
      status: "draft",
      lastModified: new Date(Date.now() - 172800000),
      executions: 0,
      successRate: 0,
      tags: ["sales", "leads", "scoring"],
      createdBy: "Emily Chen",
      nodes: 15
    },
    {
      id: 5,
      name: "Inventory Sync",
      description: "Synchronize inventory levels across multiple sales channels",
      status: "active",
      lastModified: new Date(Date.now() - 43200000),
      executions: 445,
      successRate: 99.1,
      tags: ["inventory", "sync", "ecommerce"],
      createdBy: "David Brown",
      nodes: 10
    },
    {
      id: 6,
      name: "Support Ticket Routing",
      description: "Automatically categorize and assign support tickets",
      status: "paused",
      lastModified: new Date(Date.now() - 259200000),
      executions: 78,
      successRate: 92.3,
      tags: ["support", "tickets", "routing"],
      createdBy: "Lisa Garcia",
      nodes: 9
    }
  ];

  // Mock metrics data
  const metrics = {
    totalWorkflows: workflows.length,
    activeWorkflows: workflows.filter(w => w.status === 'active').length,
    totalExecutions: workflows.reduce((sum, w) => sum + w.executions, 0),
    avgSuccessRate: workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length,
    errorCount: workflows.filter(w => w.status === 'error').length,
    trendsData: [
      { period: 'Last 7 days', executions: 1250, change: 12.5 },
      { period: 'Last 30 days', executions: 4890, change: 8.3 }
    ]
  };

  // Filter and sort workflows
  const filteredWorkflows = useMemo(() => {
    let filtered = workflows.filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort workflows
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'executions':
          return b.executions - a.executions;
        case 'success':
          return b.successRate - a.successRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [workflows, searchQuery, statusFilter, sortBy]);

  const handleCreateWorkflow = () => {
    navigate('/visual-workflow-editor');
  };

  const handleWorkflowAction = (action, workflowId) => {
    switch (action) {
      case 'edit': navigate('/visual-workflow-editor', { state: { workflowId } });
        break;
      case 'run': navigate('/workflow-execution-monitor', { state: { workflowId } });
        break;
      case 'duplicate': console.log('Duplicating workflow:', workflowId);
        break;
      case 'delete':
        console.log('Deleting workflow:', workflowId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading-bold text-text-primary mb-2">
                Workflow Dashboard
              </h1>
              <p className="text-text-secondary">
                Manage and monitor your automation workflows
              </p>
            </div>
            
            {/* Desktop Create Button */}
            <button
              onClick={handleCreateWorkflow}
              className="hidden sm:flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-micro hover-scale"
            >
              <Icon name="Plus" size={20} />
              <span className="font-body-medium">Create Workflow</span>
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricsCard
              title="Total Workflows"
              value={metrics.totalWorkflows}
              icon="Workflow"
              trend={{ value: 12, isPositive: true }}
              className="bg-primary-50 border-primary-100"
            />
            <MetricsCard
              title="Active Workflows"
              value={metrics.activeWorkflows}
              icon="Play"
              trend={{ value: 8, isPositive: true }}
              className="bg-success-50 border-success-100"
            />
            <MetricsCard
              title="Total Executions"
              value={metrics.totalExecutions.toLocaleString()}
              icon="Activity"
              trend={{ value: 15, isPositive: true }}
              className="bg-accent-50 border-accent-100"
            />
            <MetricsCard
              title="Avg Success Rate"
              value={`${metrics.avgSuccessRate.toFixed(1)}%`}
              icon="CheckCircle2"
              trend={{ value: 2.3, isPositive: true }}
              className="bg-success-50 border-success-100"
            />
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <FilterToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredWorkflows.length}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Workflows Grid */}
          <div className="xl:col-span-3">
            {filteredWorkflows.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWorkflows.map((workflow) => (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    onAction={handleWorkflowAction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Icon name="Search" size={24} className="text-text-tertiary" />
                </div>
                <h3 className="text-lg font-heading-medium text-text-primary mb-2">
                  No workflows found
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'Get started by creating your first workflow'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <button
                    onClick={handleCreateWorkflow}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-micro"
                  >
                    <Icon name="Plus" size={20} />
                    <span>Create Your First Workflow</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Recent Activity */}
          <div className="xl:col-span-1">
            <RecentActivity
              isExpanded={isActivityExpanded}
              onToggleExpanded={setIsActivityExpanded}
            />
          </div>
        </div>

        {/* Mobile Create Button - Floating */}
        <button
          onClick={handleCreateWorkflow}
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-modal flex items-center justify-center hover:bg-primary-700 transition-micro hover-scale z-50"
        >
          <Icon name="Plus" size={24} />
        </button>
      </div>
    </div>
  );
};

export default WorkflowDashboard;
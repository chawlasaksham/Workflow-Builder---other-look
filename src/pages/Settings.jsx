import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('usage');
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);
  
  // State for managing data
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Main API Key',
      createdAt: '1/7/2024, 3:30:00 PM',
      lastUsed: '10/7/2024, 5:30:00 PM',
      permissions: 'read, write',
      expiresAt: '1/1/2025, 5:29:59 AM',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Read Only',
      createdAt: '1/6/2024, 2:30:00 PM',
      lastUsed: '-',
      permissions: 'read',
      expiresAt: '-',
      status: 'Inactive'
    },
    {
      id: 3,
      name: 'Proxy US-East',
      createdAt: '15/5/2024, 1:30:00 PM',
      lastUsed: '9/7/2024, 7:30:00 PM',
      permissions: 'read, proxy',
      expiresAt: '1/12/2024, 5:29:59 AM',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Proxy EU-West',
      createdAt: '20/4/2024, 5:00:00 PM',
      lastUsed: '8/7/2024, 3:30:00 PM',
      permissions: 'read, proxy',
      expiresAt: '1/11/2024, 5:29:59 AM',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Proxy Asia',
      createdAt: '10/3/2024, 7:15:00 PM',
      lastUsed: '7/7/2024, 2:30:00 PM',
      permissions: 'read, proxy',
      expiresAt: '1/10/2024, 5:29:59 AM',
      status: 'Active'
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'user@example.com',
      role: 'Owner',
      status: 'Active',
      invitedAt: '1/7/2024, 3:30:00 PM',
      lastActive: '10/7/2024, 5:30:00 PM'
    },
    {
      id: 2,
      email: 'another@example.com',
      role: 'Admin',
      status: 'Invited',
      invitedAt: '5/7/2024, 2:30:00 PM',
      lastActive: '-'
    }
  ]);

  // Form state for modals
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    permissions: '',
    expiresAt: '',
    status: 'Active'
  });

  const [newUser, setNewUser] = useState({
    email: '',
    role: 'Admin',
    status: 'Invited'
  });

  // Functions to handle adding new items
  const handleAddApiKey = () => {
    if (!newApiKey.name || !newApiKey.permissions) {
      alert('Please fill in all required fields');
      return;
    }

    const newKey = {
      id: apiKeys.length + 1,
      name: newApiKey.name,
      createdAt: new Date().toLocaleString(),
      lastUsed: '-',
      permissions: newApiKey.permissions,
      expiresAt: newApiKey.expiresAt || '-',
      status: newApiKey.status
    };

    setApiKeys([...apiKeys, newKey]);
    setNewApiKey({ name: '', permissions: '', expiresAt: '', status: 'Active' });
    setShowAddApiKeyModal(false);
    alert('API Key added successfully!');
  };

  const handleInviteUser = () => {
    if (!newUser.email) {
      alert('Please enter an email address');
      return;
    }

    const newInvitedUser = {
      id: users.length + 1,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      invitedAt: new Date().toLocaleString(),
      lastActive: '-'
    };

    setUsers([...users, newInvitedUser]);
    setNewUser({ email: '', role: 'Admin', status: 'Invited' });
    setShowInviteUserModal(false);
    alert('User invited successfully!');
  };

  const handleInputChange = (setter, field, value) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  const navigationItems = [
    { id: 'usage', label: 'Usage and plan', icon: 'BarChart3' },
    { id: 'personal', label: 'Personal', icon: 'User' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'api', label: 'API', icon: 'Key' }
  ];

  const renderUsageAndPlan = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Usage and Plan</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="space-y-6">
          {/* Account Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Account Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Account:</span>
                <span className="text-text-primary font-medium">Acme Corp (ID: acc-123)</span>
              </div>
            </div>
          </div>

          {/* Usage Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Usage</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Active Workflows:</span>
                <span className="text-text-primary font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Executions:</span>
                <span className="text-text-primary font-medium">1200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Executions Reset Date:</span>
                <span className="text-text-primary font-medium">1/8/2024, 5:30:00 AM</span>
              </div>
            </div>
          </div>

          {/* Plan Information */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Plan</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Name:</span>
                <span className="text-text-primary font-medium">Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Price:</span>
                <span className="text-text-primary font-medium">$49.99/month</span>
              </div>
              <div>
                <span className="text-text-secondary block mb-2">Features:</span>
                <ul className="list-disc list-inside space-y-1 text-text-primary">
                  <li>Unlimited workflows</li>
                  <li>Priority support</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Limits:</span>
                <span className="text-text-primary font-medium">100 workflows, 10000 executions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Billing Cycle:</span>
                <span className="text-text-primary font-medium">monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Next Billing Date:</span>
                <span className="text-text-primary font-medium">1/8/2024, 5:30:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonal = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Personal Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Saksham Chawla"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone
            </label>
            <input
              type="text"
              defaultValue="UTC"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Language
            </label>
            <input
              type="text"
              defaultValue="English"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="mr-3"
              />
              <span className="text-sm text-text-primary">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-3"
              />
              <span className="text-sm text-text-primary">System Alerts</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Users</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Users</h3>
          <button
            onClick={() => setShowInviteUserModal(true)}
            className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error-600 transition-colors"
          >
            Invite
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Invited At</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border">
                  <td className="py-3 px-4 text-sm text-text-primary">{user.email}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{user.role}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{user.status}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{user.invitedAt}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Rows per page:</span>
            <div className="relative">
              <select className="text-sm border border-border rounded px-2 py-1 pr-8 appearance-none bg-white">
                <option>5</option>
                <option>10</option>
                <option>25</option>
              </select>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-text-secondary hover:text-text-primary px-2 py-1">
              &lt; Previous
            </button>
            <span className="text-sm bg-primary text-white px-3 py-1 rounded">1</span>
            <button className="text-sm text-text-secondary hover:text-text-primary px-2 py-1">
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiKeys = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">API Keys</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
          <button
            onClick={() => setShowAddApiKeyModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Add API Key
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Created At</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Last Used</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Permissions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Expires At</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="border-b border-border">
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.name}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.createdAt}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.lastUsed}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.permissions}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.expiresAt}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">{apiKey.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Rows per page:</span>
            <div className="relative">
              <select className="text-sm border border-border rounded px-2 py-1 pr-8 appearance-none bg-white">
                <option>5</option>
                <option>10</option>
                <option>25</option>
              </select>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-text-secondary hover:text-text-primary px-2 py-1">
              &lt; Previous
            </button>
            <span className="text-sm bg-primary text-white px-3 py-1 rounded">1</span>
            <button className="text-sm text-text-secondary hover:text-text-primary px-2 py-1">
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'usage':
        return renderUsageAndPlan();
      case 'personal':
        return renderPersonal();
      case 'users':
        return renderUsers();
      case 'api':
        return renderApiKeys();
      default:
        return renderUsageAndPlan();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-border min-h-screen p-6">
          <h1 className="text-xl font-bold text-text-primary mb-6">Settings</h1>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary-50 text-primary border border-primary-100'
                    : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Display menu button */}
          <button className="absolute bottom-4 left-4 text-xs text-text-tertiary bg-secondary-100 px-2 py-1 rounded">
            Display a menu
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Add API Key Modal */}
      {showAddApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold text-text-primary mb-4">Add API Key</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                <input
                  type="text"
                  value={newApiKey.name}
                  onChange={(e) => handleInputChange(setNewApiKey, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Permissions</label>
                <input
                  type="text"
                  value={newApiKey.permissions}
                  onChange={(e) => handleInputChange(setNewApiKey, 'permissions', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Expires At</label>
                <input
                  type="text"
                  value={newApiKey.expiresAt}
                  onChange={(e) => handleInputChange(setNewApiKey, 'expiresAt', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <select 
                  value={newApiKey.status}
                  onChange={(e) => handleInputChange(setNewApiKey, 'status', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddApiKeyModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddApiKey}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold text-text-primary mb-4">Invite User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => handleInputChange(setNewUser, 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => handleInputChange(setNewUser, 'role', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>Admin</option>
                  <option>User</option>
                  <option>Viewer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <select 
                  value={newUser.status}
                  onChange={(e) => handleInputChange(setNewUser, 'status', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>Invited</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Invited At</label>
                <input
                  type="text"
                  value={new Date().toLocaleString()}
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Last Active</label>
                <input
                  type="text"
                  value="-"
                  readOnly
                  className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-50"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInviteUserModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteUser}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 
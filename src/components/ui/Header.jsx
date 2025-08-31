import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/workflow-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Workflow management hub'
    },
    {
      label: 'Editor',
      path: '/visual-workflow-editor',
      icon: 'GitBranch',
      tooltip: 'Visual workflow design'
    },
    {
      label: 'Monitor',
      path: '/workflow-execution-monitor',
      icon: 'Activity',
      tooltip: 'Real-time execution tracking'
    },
    {
      label: 'Templates',
      path: '/workflow-templates-library',
      icon: 'FileTemplate',
      tooltip: 'Workflow template library'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check authentication status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (isLoggedIn && userData) {
      setUser(JSON.parse(userData));
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAdminDropdownOpen && !event.target.closest('.admin-dropdown')) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAdminDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
    setIsAdminDropdownOpen(false);
    navigate('/login');
  };

  const handleProfile = () => {
    setIsAdminDropdownOpen(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  // If not logged in and not on login page, don't render header
  if (!user && location.pathname !== '/login') {
    return null;
  }

  // If on login page, don't render header
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border shadow-subtle">
      <div className="max-w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Workflow" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading-semibold text-text-primary">
                WorkflowPro
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-body-medium
                  transition-micro hover-scale group
                  ${isActiveRoute(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={isActiveRoute(item.path) ? 'text-primary' : 'text-current'} 
                />
                <span>{item.label}</span>
                {isActiveRoute(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
                />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  className="pl-10 pr-4 py-2 w-64 text-sm bg-secondary-50 border border-border rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           transition-micro"
                />
              </div>
            </div>

            {/* Settings */}
            <button 
              onClick={handleSettings}
              className="relative p-2 text-text-secondary hover:text-text-primary transition-micro hover-scale rounded-lg hover:bg-secondary-50"
            >
              <Icon name="Settings" size={20} />
            </button>

            {/* User Avatar */}
            <div className="relative admin-dropdown">
              <button 
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-50 transition-micro"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <span className="hidden lg:block text-sm font-body-medium text-text-primary">
                  {user?.name || 'Admin'}
                </span>
                <Icon name="ChevronDown" size={16} className="hidden lg:block text-text-tertiary" />
              </button>

              {/* Admin Dropdown */}
              {isAdminDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-dropdown">
                  <div className="py-2">
                    <button
                      onClick={handleProfile}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-text-primary hover:bg-secondary-50 transition-colors"
                    >
                      <Icon name="User" size={16} className="text-text-secondary" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-text-primary hover:bg-secondary-50 transition-colors"
                    >
                      <Icon name="LogOut" size={16} className="text-text-secondary" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-micro rounded-lg hover:bg-secondary-50"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-micro
                    ${isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }
                  `}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActiveRoute(item.path) ? 'text-primary' : 'text-current'} 
                  />
                  <span className="font-body-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Mobile Search */}
              <div className="px-4 pt-4 border-t border-border mt-4">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
                  />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    className="w-full pl-10 pr-4 py-3 text-sm bg-secondary-50 border border-border rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
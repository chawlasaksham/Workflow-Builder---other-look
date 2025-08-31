import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const Profile = () => {
  const navigate = useNavigate();
  // Get user data from localStorage
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const { name = 'Sysadmin', email = 'sysadmin', company = 'RIS' } = userData;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name, email, company });

  const handleEditProfile = () => {
    setEditForm({ name, email, company });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(editForm));
    setUserData(editForm);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleHomePage = () => {
    navigate('/workflow-dashboard');
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">{name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">{name}</h1>
          <p className="text-text-secondary">{company}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6"></div>

        {/* Information Section */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-text-secondary">Name:</span>
            <span className="text-text-primary font-medium">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Company:</span>
            <span className="text-text-primary font-medium">{company}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Email:</span>
            <span className="text-text-primary font-medium">{email}</span>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="space-y-3">
          {/* First Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
            >
              <Icon name="Edit3" size={20} />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-error text-white rounded-lg hover:bg-error-500 transition-colors font-medium text-lg"
            >
              <Icon name="LogOut" size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleHomePage}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-success text-white rounded-lg hover:bg-success-500 transition-colors font-medium text-lg"
            >
              <Icon name="Home" size={20} />
              <span>Home Page</span>
            </button>
            <button
              onClick={handleResetPassword}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-warning text-white rounded-lg hover:bg-warning-500 transition-colors font-medium text-lg"
            >
              <Icon name="Key" size={20} />
              <span>Reset Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-modal">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-bold text-text-primary mb-6">Edit Profile</h2>
            <form className="space-y-4" onSubmit={handleEditSave}>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={editForm.company}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 
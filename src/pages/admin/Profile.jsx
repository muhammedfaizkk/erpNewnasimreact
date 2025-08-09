import React, { useState } from 'react';
import { useResetPassword } from '../../hooks/profile/Profileapi';
import { FiEdit3, FiSave, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [profile, setProfile] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const { resetPassword, loading, successMessage, error } = useResetPassword();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!profile.currentPassword || !profile.newPassword) {
      toast.error('Please enter both current and new passwords.');
      return;
    }

    resetPassword({
      userId: '123456', // Replace with actual user ID
      currentPassword: profile.currentPassword,
      newPassword: profile.newPassword,
    });

    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasswords((prev) => !prev);
  };

  return (
    <div className="mx-auto my-8 p-8  rounded-2xl shadow-xl bg-white transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
            <FiLock className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Password Settings</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
          </div>
        </div>

        <button
          onClick={toggleEdit}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isEditing
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
            : 'text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          disabled={loading}
        >
          {isEditing ? (
            <>
              <FiSave className="text-lg" /> Save
            </>
          ) : (
            <>
              <FiEdit3 className="text-lg" /> Edit
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Current Password */}
        {isEditing && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPasswords ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>
        )}

        {/* New Password */}
        {isEditing && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                name="newPassword"
                value={profile.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPasswords ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>
        )}

        {!isEditing && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <FiLock className="text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</p>
                <p className="text-lg tracking-wider font-mono text-gray-800 dark:text-gray-200">••••••••••</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      {successMessage && (
        <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default Profile;
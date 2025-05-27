import React, { useState } from 'react';
import MembersTable from '../../components/common/tables/MembersTable';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: 'rafiqurrahman51@gmail.com',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="mx-auto my-5 p-5 rounded-lg shadow-sm bg-white">
      <div className="mb-6 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Update your email or reset your password.</p>
      </div>

      <div className="space-y-6">
        {isEditing ? (
          <>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Reset Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reset Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-40 font-medium text-gray-600">Email Address</div>
              <div className="flex-1 text-gray-800">{profile.email}</div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-40 font-medium text-gray-600">Password</div>
              <div className="flex-1 text-gray-500">••••••••</div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={toggleEdit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEditing ? 'Save Changes' : 'Edit'}
        </button>
      </div>
      <MembersTable/>
    </div>
  );
};

export default Profile;

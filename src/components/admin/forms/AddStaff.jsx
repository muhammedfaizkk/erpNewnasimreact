import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddStaff = ({ mode = 'add', staff = null, onClose, onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Worker',
    dailyWage: '',
    currentDailyWage: '',
    dateOfJoining: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    bloodGroup: 'Unknown',
    address: '',
    age: '',
    isActive: true
  });

  // Form initialization based on mode and staff data
  useEffect(() => {
    if (mode === 'edit' && staff) {
      setFormData({
        name: staff.name || '',
        email: (staff.contact && staff.contact.email) || staff.email || '',
        phone: (staff.contact && staff.contact.phone) || staff.phone || '',
        role: staff.role || 'Worker',
        dailyWage: staff.dailyWage !== undefined ? staff.dailyWage : '',
        currentDailyWage: staff.currentDailyWage !== undefined ? staff.currentDailyWage : (staff.dailyWage !== undefined ? staff.dailyWage : ''),
        dateOfJoining: staff.dateOfJoining ? new Date(staff.dateOfJoining).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        bloodGroup: staff.bloodGroup || 'Unknown',
        address: staff.address || '',
        age: staff.age !== undefined ? staff.age : '',
        isActive: staff.isActive !== undefined ? staff.isActive : true
      });
    }
  }, [mode, staff]);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for submission
    const submitData = {
      ...formData,
      dailyWage: Number(formData.dailyWage),
      currentDailyWage: Number(formData.currentDailyWage),
      age: formData.age ? Number(formData.age) : undefined,
      dateOfJoining: new Date(formData.dateOfJoining)
    };

    // Add id for edit mode
    if (mode === 'edit' && staff) {
      submitData.id = staff.id || staff._id;
    }

    try {
      await onSubmit(submitData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Role options
  const roleOptions = ["Manager", "Supervisor", "Worker", "Accountant", "Other"];
  // Blood group options
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Unknown"];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">
            {mode === 'edit' ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h3>
          <button 
            type="button"
            onClick={handleClose} 
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Basic Information</h4>
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength="3"
                  placeholder="Enter full name"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter email address"
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="\d{10}"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter 10-digit phone number"
                  disabled={loading}
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="70"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter age"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Employment Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Employment Details</h4>
              
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining*</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              {/* Daily Wage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage (₹)*</label>
                <input
                  type="number"
                  name="dailyWage"
                  value={formData.dailyWage}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter daily wage"
                  disabled={loading}
                />
              </div>

              {/* Current Daily Wage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Daily Wage (₹)*</label>
                <input
                  type="number"
                  name="currentDailyWage"
                  value={formData.currentDailyWage}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Enter current daily wage"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-medium text-gray-700">Additional Information</h4>
              
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter full address"
                  disabled={loading}
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Staff Member
                </label>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
              <div className="text-red-800 text-sm">
                {error.message || error} {error.details && `(${error.details})`}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 sticky bottom-0 bg-white pb-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] transition-colors"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span>{mode === 'edit' ? 'Updating...' : 'Adding...'}</span>
                </span>
              ) : (
                mode === 'edit' ? 'Update Staff' : 'Add Staff'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
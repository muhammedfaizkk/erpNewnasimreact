import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Addsites = ({ mode = 'add', site = null, onClose, onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    contactNumber: '',
    startDate: '',
    dueDate: '',
    budget: '',
    status: '',
    type: 'Site',
    work: '',
  });

  // Form initialization based on mode and site data
  useEffect(() => {
    if (mode === 'edit' && site) {
      setFormData({
        name: site.name || '',
        place: site.place || '',
        contactNumber: site.contactNumber || '',
        startDate: site.startDate ? site.startDate.substring(0, 10) : '',
        dueDate: site.dueDate ? site.dueDate.substring(0, 10) : '',
        budget: site.budget || '',
        status: site.status || '',
        type: site.type || 'Site',
        work: site.work || '',
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        place: '',
        contactNumber: '',
        startDate: '',
        dueDate: '',
        budget: '',
        status: '',
        type: 'Site',
        work: '',
      });
    }
  }, [mode, site]);

  // ✅ FIXED: Prevent background scrolling (desktop + mobile)
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflowY = 'hidden';
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.place.trim() || !formData.contactNumber.trim()) {
      return;
    }

    const submitData = {
      ...formData,
      budget: Number(formData.budget),
    };

    if (mode === 'edit' && site) {
      submitData.id = site.id || site._id;
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        id="add-site-modal"
        className="bg-white rounded-lg shadow-xl w-full max-w-md mt-10 max-h-screen overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">
            {mode === 'edit' ? 'Edit Site' : 'Add New Site'}
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
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter site name"
                disabled={loading}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter site location"
                disabled={loading}
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                pattern="\d{10}"
                title="Enter a 10-digit number"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter 10-digit mobile number"
                disabled={loading}
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date*</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)*</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter budget"
                disabled={loading}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              >
                <option value="" disabled>Select status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
                <option value="Cancelled">Cancelled</option>
                <option value="On Going">On Going</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              >
                <option value="Site">Site</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Work Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Description*</label>
              <textarea
                name="work"
                value={formData.work}
                onChange={handleChange}
                maxLength="200"
                rows="3"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
                placeholder="Describe the work (max 200 characters)"
                disabled={loading}
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.work.length}/200 characters
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
          <div className="flex justify-end gap-3 pt-6">
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
                mode === 'edit' ? 'Update Site' : 'Add Site'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addsites;

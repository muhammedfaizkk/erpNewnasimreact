import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ExpenseForm = ({ expense, onSave, onClose, siteId, loading: propLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    date: "",
    category: "materials",
    paymentMethod: "Cash",
    type: "Site",
  });

  const categories = ['materials', 'labor', 'equipment', 'transport', 'utilities', 'others'];
  const paymentMethods = ['Cash', 'Card', 'Bank Transfer', 'UPI', 'Cheque'];

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || '',
        description: expense.description || '',
        amount: expense.amount?.toString() || '',
        date: expense.date || '',
        category: expense.category || 'materials',
        paymentMethod: expense.paymentMethod || 'Cash',
        type: "Site",
      });
    } else {
      // Set default date to today if creating new expense
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        date: today
      }));
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title || !formData.amount || !formData.date) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await onSave({
        ...formData,
        amount: Number(formData.amount) // Convert amount to number
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error(error.message || 'Failed to save expense');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">
            {expense ? 'Edit Expense' : 'Add New Expense'}
          </h4>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600"
            disabled={propLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={propLoading}
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={propLoading}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{propLoading ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={propLoading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
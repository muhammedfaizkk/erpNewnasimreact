import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

const IncomeForm = ({ income, onSubmit, onClose, loading, siteId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    date: '',
    category: 'advance',
    paymentMethod: 'cash',
    type: 'Site',
  });

  const categories = ['advance', 'milestone', 'final_payment', 'bonus', 'other'];
  const paymentMethods = ['cash', 'bank_transfer', 'check', 'online'];

  useEffect(() => {
    if (income) {
      setFormData({
        title: income.title || '',
        description: income.description || '',
        amount: income.amount?.toString() || '',
        date: income.date || '',
        category: income.category || 'advance',
        paymentMethod: income.paymentMethod || 'cash',
        type: 'Site',
      });
    } else {
      // Reset form when creating new income
      setFormData({
        title: '',
        description: '',
        amount: '',
        date: '',
        category: 'advance',
        paymentMethod: 'cash',
        type: 'Site',
      });
    }
  }, [income]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error(error.message || 'Error saving income');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 overflow-y-auto">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg p-6 my-10">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-600"></div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">
            {income ? 'Edit Income' : 'Add New Income'}
          </h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-0">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
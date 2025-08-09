import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAddWageIncrement } from '../../../hooks/staff/Addstaffhooks';

const AddWageIncrementForm = ({ staffId, currentWage, onClose, onSubmit }) => {

  console.log('staffId',staffId);
  
  const [formData, setFormData] = useState({
    newWage: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const { loading, error, addWageIncrement } = useAddWageIncrement();

  const calculateIncrement = () => {
    const newWage = parseFloat(formData.newWage);
    const oldWage = parseFloat(currentWage);
    if (newWage && oldWage) {
      const incrementAmount = newWage - oldWage;
      const incrementPercentage = ((incrementAmount / oldWage) * 100).toFixed(2);
      return { incrementAmount, incrementPercentage };
    }
    return { incrementAmount: 0, incrementPercentage: 0 };
  };

  const { incrementAmount, incrementPercentage } = calculateIncrement();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.newWage || parseFloat(formData.newWage) <= 0) {
      newErrors.newWage = 'Valid new wage is required';
    }
    if (parseFloat(formData.newWage) <= parseFloat(currentWage)) {
      newErrors.newWage = 'New wage must be higher than current wage';
    }
    if (!formData.effectiveDate) newErrors.effectiveDate = 'Effective date is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (validateForm()) {
      const payload = {
        ...formData,
        newWage: parseFloat(formData.newWage),
        previousWage: currentWage,
        incrementAmount,
        incrementPercentage: parseFloat(incrementPercentage)
      };
      const result = await addWageIncrement(staffId, payload);
      if (result.success) {
        onSubmit && onSubmit();
        onClose && onClose();
      } else {
        setSubmitError(error?.message || 'Failed to add wage increment');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Wage Increment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">
              Current Daily Wage: <span className="font-semibold">₹{currentWage}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Daily Wage (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.newWage}
              onChange={(e) => setFormData({ ...formData, newWage: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.newWage ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new wage"
            />
            {errors.newWage && <p className="text-red-500 text-xs mt-1">{errors.newWage}</p>}
          </div>

          {formData.newWage && parseFloat(formData.newWage) > parseFloat(currentWage) && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-700">
                Increment: <span className="font-semibold">₹{incrementAmount.toFixed(2)}</span>
                {' '}({incrementPercentage}%)
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effective Date *
            </label>
            <input
              type="date"
              value={formData.effectiveDate}
              onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.effectiveDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.effectiveDate && <p className="text-red-500 text-xs mt-1">{errors.effectiveDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason *
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter reason for increment..."
            />
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                'Add Increment'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWageIncrementForm;
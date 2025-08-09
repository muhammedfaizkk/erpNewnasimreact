import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAddWageIncrement, useEditWageIncrement } from '../../../hooks/staff/Addstaffhooks';

const AddWageIncrementForm = ({ staffId, currentWage, onClose, onSubmit, mode = 'add', incrementData, getPublicStaffById }) => {
  const [formData, setFormData] = useState({
    newWage: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    reason: '',
    approvedBy: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const { loading: addLoading, error: addError, addWageIncrement } = useAddWageIncrement();
  const { loading: editLoading, error: editError, editWageIncrement } = useEditWageIncrement();

  useEffect(() => {
    if (mode === 'edit' && incrementData) {
      setFormData({
        newWage: incrementData.newWage || '',
        effectiveDate: incrementData.effectiveDate ? new Date(incrementData.effectiveDate).toISOString().split('T')[0] : '',
        reason: incrementData.reason || '',
        approvedBy: incrementData.approvedBy || '',
        notes: incrementData.notes || '',
      });
    }
  }, [mode, incrementData]);

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
    } else if (parseFloat(formData.newWage) <= parseFloat(currentWage)) {
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
        newWage: parseFloat(formData.newWage),
        effectiveDate: formData.effectiveDate,
        reason: formData.reason,
        approvedBy: formData.approvedBy || undefined,
        notes: formData.notes || undefined,
      };
      let result;
      if (mode === 'edit') {
        result = await editWageIncrement(staffId, incrementData._id, payload);
      } else {
        payload.previousWage = parseFloat(currentWage);
        payload.incrementAmount = incrementAmount;
        payload.incrementPercentage = parseFloat(incrementPercentage);
        result = await addWageIncrement(staffId, payload);
      }
      if (result.success) {
        await getPublicStaffById(staffId); // Refresh staff data
        onSubmit(payload); // Trigger onSubmit with payload
        onClose(); // Close the form
      } else {
        setSubmitError((mode === 'edit' ? editError : addError)?.message || `Failed to ${mode} wage increment`);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 z-50">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">{mode === 'edit' ? 'Edit Wage Increment' : 'Add Wage Increment'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Current Daily Wage: <span className="font-semibold">₹{currentWage}</span>
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1">
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

          <div className="col-span-2 sm:col-span-1">
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

          {formData.newWage && parseFloat(formData.newWage) > parseFloat(currentWage) && (
            <div className="col-span-2 bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                Increment: <span className="font-semibold">₹{incrementAmount.toFixed(2)}</span>
                {' '}({incrementPercentage}%)
              </p>
            </div>
          )}

          <div className="col-span-2">
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

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Approved By
            </label>
            <input
              type="text"
              value={formData.approvedBy}
              onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              placeholder="Enter approver's name (optional)"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
              placeholder="Enter additional notes (optional)"
            />
          </div>

          <div className="col-span-2 flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={addLoading || editLoading}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {(addLoading || editLoading) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {mode === 'edit' ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                mode === 'edit' ? 'Update Increment' : 'Add Increment'
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
        </div>
      </div>
    </div>
  );
};

export default AddWageIncrementForm;
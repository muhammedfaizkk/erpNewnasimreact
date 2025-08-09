import React from 'react';

// Reusable confirmation modal
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  actionType = 'delete',
  itemName = '',
  loading = false
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {actionType} {itemName}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;

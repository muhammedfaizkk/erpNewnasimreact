import React from 'react';
import { AlertTriangle, Trash2, Pencil } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionType, // 'delete' or 'edit'
  itemName,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            {actionType === 'delete' ? (
              <Trash2 className="h-6 w-6 text-red-600" />
            ) : (
              <Pencil className="h-6 w-6 text-yellow-600" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Confirm {actionType === 'delete' ? 'Deletion' : 'Edit'}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {actionType === 'delete'
                ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
                : `Are you sure you want to edit "${itemName}"?`}
            </p>
          </div>
          <div className="mt-4 flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                actionType === 'delete'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              } disabled:opacity-50`}
            >
              {loading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
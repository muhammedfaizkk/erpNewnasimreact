import React, { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import { 
  useAddStaffAdvance,
  useDeleteStaffAdvance
} from '../../hooks/staff/Addstaffhooks';
import AddAdvanceForm from '../../components/admin/forms/AddAdvanceForm';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

export default function StaffAdvancePayment({ 
  staffId, 
  advances: initialAdvances = [], 
  loading: initialLoading = false, 
  dateFilter = null,
  onRefresh = () => {}
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [advanceToDelete, setAdvanceToDelete] = useState(null);

  const {
    loading: addLoading,
    error: addError,
    addStaffAdvance,
    reset: resetAdd
  } = useAddStaffAdvance();

  const {
    loading: deleteLoading,
    error: deleteError,
    deleteStaffAdvance,
    reset: resetDelete
  } = useDeleteStaffAdvance();

  const filteredAdvances = dateFilter
    ? initialAdvances.filter(advance => {
        const advanceDate = new Date(advance.date);
        return advanceDate >= new Date(dateFilter.startDate) &&
               advanceDate <= new Date(dateFilter.endDate);
      })
    : initialAdvances;

  const handleAddAdvance = async (formData) => {
    try {
      const result = await addStaffAdvance(staffId, formData);
      if (result.success) {
        setShowAddForm(false);
        resetAdd();
        onRefresh();
      }
    } catch (error) {
      console.error('Error adding advance:', error);
    }
  };

  // Confirmation modal logic for delete
  const handleDeleteClick = (advance) => {
    setAdvanceToDelete(advance);
  };

  const handleConfirmDelete = async () => {
    if (!advanceToDelete) return;
    try {
      const result = await deleteStaffAdvance(advanceToDelete._id);
      if (result.success) {
        resetDelete();
        onRefresh();
        setAdvanceToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting advance:', error);
    }
  };

  const handleCancelDelete = () => {
    setAdvanceToDelete(null);
  };

  const loading = initialLoading;

  if (loading && (initialAdvances === null || initialAdvances === undefined)) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-blue-600 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="text-gray-600">Loading advances...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4 p-3 p-sm-0">
        <h3 className="text-lg font-semibold">Advance Payments</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Payment
        </button>
      </div>

      {/* Error messages */}
      {addError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{addError.message}</p>
          {addError.details && <p className="text-sm mt-1">{addError.details}</p>}
        </div>
      )}
      {deleteError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{deleteError.message}</p>
          {deleteError.details && <p className="text-sm mt-1">{deleteError.details}</p>}
        </div>
      )}

      {/* Advances Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdvances.map((advance) => (
              <tr key={advance._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(advance.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  ₹{advance.amount?.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeleteClick(advance)}
                    disabled={deleteLoading === advance._id}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading === advance._id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-700"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAdvances.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {dateFilter ? 'No advance payments found for the selected date range' : 'No advance payments found'}
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredAdvances.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Total Advances:</span>
            <span className="font-semibold text-green-600">
              ₹{filteredAdvances.reduce((sum, advance) => sum + (advance.amount || 0), 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="font-medium text-gray-700">Total Records:</span>
            <span className="font-semibold text-gray-600">
              {filteredAdvances.length}
            </span>
          </div>
        </div>
      )}

      {showAddForm && (
        <AddAdvanceForm
          staffId={staffId}
          onClose={() => {
            setShowAddForm(false);
            resetAdd();
          }}
          onSubmit={handleAddAdvance}
          loading={addLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!advanceToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        itemName={`Advance of ₹${advanceToDelete?.amount} on ${advanceToDelete ? new Date(advanceToDelete.date).toLocaleDateString() : ''}`}
        loading={deleteLoading}
      />
    </div>
  );
}
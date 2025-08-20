import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StaffLeave from '../../../components/admin/StaffLeave';
import StaffLeaveForm from '../../../components/admin/forms/StaffLeaveForm';
import ConfirmationModal from '../../../components/admin/ConfirmationModal';

const StaffLeavesTab = ({
  staffId,
  leaves,
  leavesLoading,
  dateFilter,
  showLeaveForm,
  setShowLeaveForm,
  handleRefreshLeaves,
  handleLeaveSubmit,
  addLeaveLoading,
  resetAddLeave,
  deleteStaffLeave
}) => {
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  const handleDeleteLeave = (leave) => {
    setLeaveToDelete(leave);
  };

  const handleConfirmDelete = async () => {
    if (leaveToDelete) {
      await deleteStaffLeave(leaveToDelete._id);
      setLeaveToDelete(null);
      handleRefreshLeaves();
    }
  };

  const handleCancelDelete = () => {
    setLeaveToDelete(null);
  };


  return (
    <div className="space-y-4">


      <div className="flex justify-between items-center mb-4 p-3 p-sm-0">
        <h2 className="text-lg font-semibold">Leaves</h2>
        <button
          onClick={() => setShowLeaveForm(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      <StaffLeave
        staffId={staffId}
        leaves={leaves || []}
        loading={leavesLoading}
        onRefresh={handleRefreshLeaves}
        dateFilter={dateFilter}
        onDeleteLeave={handleDeleteLeave}
      />

      {showLeaveForm && (
        <StaffLeaveForm
          onClose={() => {
            setShowLeaveForm(false);
            resetAddLeave();
          }}
          onSubmit={handleLeaveSubmit}
          loading={addLeaveLoading}
        />
      )}
      <ConfirmationModal
        isOpen={!!leaveToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        actionType="delete"
        itemName={`Leave on ${leaveToDelete ? new Date(leaveToDelete.date).toLocaleDateString() : ''}`}
      />
    </div>
  );
};

export default StaffLeavesTab;
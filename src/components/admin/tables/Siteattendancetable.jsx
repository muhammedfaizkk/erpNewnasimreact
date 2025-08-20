import React, { useState, useEffect } from 'react';
import { Plus, CalendarCheck2 } from 'lucide-react';
import { toast } from 'react-toastify';
import SiteAttendanceForm from '../forms/Siteattendanceform';
import SiteAttendanceList from '../tables/Attendancelist';
import ConfirmationModal from '../../admin/ConfirmationModal';

import {
  useAddSiteAttendance,
  useUpdateSiteAttendance,
  useDeleteSiteAttendance,
  useGetAllSiteAttendance
} from '../../../hooks/site/SiteAttendance';

export default function SiteAttendanceTable({ siteId }) {
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);

  const { addAttendance, loading: isAdding } = useAddSiteAttendance();
  const { updateAttendance, isLoading: isUpdating } = useUpdateSiteAttendance();
  const { deleteAttendance, isLoading: isDeleting } = useDeleteSiteAttendance();

  const {
    getAllSiteAttendance,
    attendances,
    loading: isFetching,
  } = useGetAllSiteAttendance();

  // Fetch attendance when siteId changes
  useEffect(() => {
    if (siteId) getAllSiteAttendance(siteId);
  }, [siteId]);

  const handleDeleteClick = (attendanceId) => {
    setSelectedAttendanceId(attendanceId);
    setConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAttendanceId) return;
    const { success } = await deleteAttendance(selectedAttendanceId);
    if (success) {
      toast.success('Attendance deleted successfully');
      getAllSiteAttendance(siteId);
    } else {
      toast.error('Failed to delete attendance');
    }
    setConfirmModalOpen(false);
    setSelectedAttendanceId(null);
  };

  const handleEdit = (attendance) => {
    setEditingAttendance(attendance);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingAttendance(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (formData) => {
    let success = false;

    if (editingAttendance) {
      const res = await updateAttendance(editingAttendance._id, formData);
      success = res?.success;
      if (success) toast.success('Attendance updated successfully');
    } else {
      const res = await addAttendance(siteId, formData);
      success = res?.success;
      if (success) toast.success('Attendance marked successfully');
    }

    if (success) {
      resetForm();
      getAllSiteAttendance(siteId);
    } else {
      toast.error('Failed to save attendance');
    }
  };

  const filteredData = attendances.filter((entry) => {
    const staffName = entry.staff?.name || '';
    const remarks = entry.remarks || '';
    const searchString = `${staffName} ${remarks}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold flex items-center">
            <CalendarCheck2 className="w-5 h-5 mr-2 text-blue-600" />
            Attendance
          </h3>

        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Mark</span>
        </button>
      </div>

      {showForm && (
        <SiteAttendanceForm
          attendance={editingAttendance}
          onSave={handleFormSubmit}
          onClose={resetForm}
          loading={isAdding || isUpdating}
          siteId={siteId}
        />
      )}

      <SiteAttendanceList
        data={filteredData}
        loading={isFetching || isAdding || isUpdating || isDeleting}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        actionType="delete"
        itemName={selectedAttendanceId ? 'Attendance record' : ''}
        loading={isDeleting}
      />
    </div>
  );
}

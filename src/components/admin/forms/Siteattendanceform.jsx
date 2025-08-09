import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useGetAllStaff } from '../../../hooks/staff/Addstaffhooks';

const SiteAttendanceForm = ({ siteId, onSave, onClose, loading: propLoading }) => {
    const { staff = [], getAllStaff, loading: staffLoading } = useGetAllStaff();
   
    const [formData, setFormData] = useState({
        attendances: [],
        date: '',
    });

    const statusOptions = ['Present', 'Absent'];

    useEffect(() => {
        getAllStaff(); // Load all staff on mount

        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({ ...prev, date: today }));
    }, [getAllStaff]);

    const handleStaffChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        const selectedAttendances = selectedIds.map((staffId) => ({
            staffId,
            status: 'Present',
            remarks: '',
        }));
        setFormData((prev) => ({ ...prev, attendances: selectedAttendances }));
    };

    const handleStatusChange = (index, status) => {
        const updated = [...formData.attendances];
        updated[index].status = status;
        setFormData({ ...formData, attendances: updated });
    };

    const handleRemarksChange = (index, remarks) => {
        const updated = [...formData.attendances];
        updated[index].remarks = remarks;
        setFormData({ ...formData, attendances: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.date || formData.attendances.length === 0) {
            toast.error('Select date and at least one staff member');
            return;
        }

        try {
            await onSave({
                date: formData.date,
                attendances: formData.attendances,
            });
        } catch (err) {
            toast.error(err.message || 'Failed to mark attendance');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Mark Site Attendance</h2>
                    <button onClick={onClose} disabled={propLoading}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Date *</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            disabled={propLoading}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Staff Multi-select */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Select Staff *</label>
                        {staffLoading ? (
                            <div className="w-full px-3 py-2 border rounded-lg h-32 flex items-center justify-center">
                                Loading staff...
                            </div>
                        ) : (
                            <select
                                multiple
                                onChange={handleStaffChange}
                                className="w-full px-3 py-2 border rounded-lg h-32"
                                disabled={staffLoading || propLoading}
                            >
                                {staff?.map((staff) => (
                                    <option key={staff._id} value={staff._id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Dynamic Status and Remarks per staff */}
                    {formData.attendances.map((entry, index) => {
                        const staffName = staff?.find((s) => s._id === entry.staffId)?.name || 'Staff';
                        return (
                            <div key={entry.staffId} className="border p-3 rounded-md bg-gray-50 mt-2">
                                <p className="font-medium mb-2">{staffName}</p>
                                <div className="flex items-center space-x-3">
                                    <select
                                        value={entry.status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                        className="border px-2 py-1 rounded"
                                        disabled={propLoading}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Remarks"
                                        value={entry.remarks}
                                        onChange={(e) => handleRemarksChange(index, e.target.value)}
                                        className="flex-1 px-2 py-1 border rounded"
                                        disabled={propLoading}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                            disabled={propLoading || staffLoading}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {propLoading ? 'Saving...' : 'Save'}
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

export default SiteAttendanceForm;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StaffInfoCard from './staffdetails/StaffInfoCard';
import StaffTabs from './staffdetails/StaffTabs';
import StaffLeavesTab from './staffdetails/StaffLeavesTab';
import StaffAdvancesTab from './staffdetails/StaffAdvancesTab';
import StaffIncrementsTab from './staffdetails/StaffIncrementsTab';
import AddStaff from '../../components/admin/forms/AddStaff';
import {
  useAddStaffLeave,
  useGetPublicStaffById,
  useDeleteStaff,
  useUpdateStaff,
  useDeleteStaffLeave
} from '../../hooks/staff/Addstaffhooks';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import StaffNotFound from '../../components/admin/StaffNotFound';
import BackButton from '../../components/admin/BackButton';

const StaffDetail = ({ onBack, onDelete }) => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leaves');
  const [showFilter, setShowFilter] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);


  const {
    staff: staffData,
    loading: staffLoading,
    error: staffError,
    getPublicStaffById,
    reset: resetPublicStaff
  } = useGetPublicStaffById();



  const {
    loading: addLeaveLoading,
    error: addLeaveError,
    addStaffLeave,
    reset: resetAddLeave
  } = useAddStaffLeave();

  // Delete staff hook
  const {
    loading: deleteLoading,
    error: deleteError,
    deleteStaff,
    reset: resetDelete
  } = useDeleteStaff();

  // Update staff hook
  const {
    loading: updateLoading,
    error: updateError,
    updateStaff,
    reset: resetUpdate
  } = useUpdateStaff();

  // Delete staff leave hook
  const {
    loading: deleteLeaveLoading,
    error: deleteLeaveError,
    deleteStaffLeave,
    reset: resetDeleteLeave
  } = useDeleteStaffLeave();

  useEffect(() => {
    // Defensive: ensure dateFilter is always an object
    const safeDateFilter = dateFilter || { startDate: '', endDate: '' };
    if (staffId && typeof staffId === 'string' && staffId.trim() !== '') {
      getPublicStaffById(staffId, safeDateFilter.startDate, safeDateFilter.endDate);
    }
  }, [staffId, dateFilter]);

  // Delete staff handler
  const handleDeleteStaff = useCallback(async (id) => {
    if (!id) return;
    const result = await deleteStaff(id);
    if (result.success) {
      if (onDelete) onDelete(id);
      navigate('/admin/staff'); // Go back to staff list
    }
  }, [deleteStaff, onDelete, navigate]);

  // Edit wage handler
  const handleEditWage = async (wageData) => {
    if (!staffData?._id) return;
    setEditLoading(true);
    setEditError(null);
    try {
      // Only update wage-related fields
      const updateFields = {
        dailyWage: wageData.newWage,
        previousWage: wageData.previousWage,
        incrementAmount: wageData.incrementAmount,
        effectiveDate: wageData.effectiveDate,
        incrementReason: wageData.reason
      };
      const result = await updateStaff(staffData._id, updateFields);
      if (result.success) {
        getPublicStaffById(staffId); // Refresh all data
      } else {
        setEditError(updateError || 'Failed to update wage');
      }
    } catch (err) {
      setEditError(err.message || 'Failed to update wage');
    } finally {
      setEditLoading(false);
    }
  };


  const handleEditStaff = async (formData) => {
    if (!staffData?._id) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const result = await updateStaff(staffData._id, formData);
      if (result.success) {
        getPublicStaffById(staffId); // Refresh all data
        setShowEditModal(false);
      } else {
        setEditError(updateError || 'Failed to update staff');
      }
    } catch (err) {
      setEditError(err.message || 'Failed to update staff');
    } finally {
      setEditLoading(false);
    }
  };

  const handleLeaveSubmit = async (leaveData) => {
    try {
      const result = await addStaffLeave(staffId, leaveData);
      if (result.success) {
        getPublicStaffById(staffId); // Refresh all data
        setShowLeaveForm(false);
        resetAddLeave();
      } else {
        console.error('Error submitting leave:', addLeaveError);
      }
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };

  const isLoading = !!staffLoading || deleteLoading || updateLoading || editLoading;

  if (isLoading && !staffData) {
    return <LoadingSpinner message="Loading staff details..." />;
  }

  if (!staffData?.data) {
    return <StaffNotFound onBack={onBack} />;
  }

  // Now it's safe to destructure from staffData.data
  const { staff, period, attendance, finances, wageInfo } = staffData.data;
  const salaryDetails = {
    currentDailyWage: staff.currentDailyWage,
    wagePerDay: wageInfo?.wagePerDay,
    dailyWage: wageInfo?.appliedWage ?? staff?.dailyWage,
    daysInMonth: period?.totalDays,
    daysWorked: attendance?.daysWorked,
    leaveDays: attendance?.leaveDays,
    advancePaid: finances?.advancePaid,
    monthlySalary: finances?.monthlySalary,
    finalSalary: finances?.finalSalary,
  };
  const basicStaff = {
    ...staff,
    dailyWage: wageInfo?.appliedWage ?? staff?.dailyWage,
  };
  const safeLeaveData = Array.isArray(attendance?.leaveData) ? attendance.leaveData : [];
  const safeAdvances = Array.isArray(finances?.advances) ? finances.advances : [];
  console.log("safeLeaveData", attendance);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <BackButton onBack={onBack} />
        <StaffInfoCard
          staffData={basicStaff}
          salaryDetails={salaryDetails}
          onDelete={handleDeleteStaff}
          onEditWage={handleEditWage}
          onEdit={() => { console.log('Edit Staff button clicked'); setShowEditModal(true); }}
        />
        <StaffTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          handleDateFilterChange={setDateFilter}
        />
        <div className="bg-white rounded-xl shadow-md border p-4 sm:p-6">
          {activeTab === 'leaves' && (
            <StaffLeavesTab
              staffId={staff?._id}
              leaves={safeLeaveData}
              leavesLoading={isLoading}
              showLeaveForm={showLeaveForm}
              setShowLeaveForm={setShowLeaveForm}
              handleRefreshLeaves={() => getPublicStaffById(staff?._id)}
              handleLeaveSubmit={handleLeaveSubmit}
              addLeaveLoading={addLeaveLoading}
              resetAddLeave={resetAddLeave}
              deleteStaffLeave={deleteStaffLeave}
              deleteLeaveLoading={deleteLeaveLoading}
            />
          )}
          {activeTab === 'payments' && (
            <StaffAdvancesTab
              staffId={staff?._id}
              staffAdvances={safeAdvances}
              advancesLoading={isLoading}
              handleRefreshAdvances={() => getPublicStaffById(staff?._id)}
            />
          )}
          {activeTab === 'increments' && (
            <StaffIncrementsTab
              incrementHistory={wageInfo?.wageIncrements || []}
              incrementLoading={isLoading}
              incrementsThisMonth={wageInfo?.wageIncrementsThisMonth || []}
            />
          )}
        </div>
        {/* Edit Staff Modal */}
        {showEditModal && (
          <AddStaff
            mode="edit"
            staff={staff}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditStaff}
            loading={editLoading}
            error={editError}
          />
        )}
      </div>
    </div>
  );
};

StaffDetail.defaultProps = {
  onBack: () => console.log('Back clicked'),
  onDelete: (id) => console.log('Delete clicked', id)
};

export default StaffDetail;


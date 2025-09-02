import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  useDeleteStaffLeave,
  useAddWageIncrement,
  useEditWageIncrement,
} from '../../hooks/staff/Addstaffhooks';

import LoadingSpinner from '../../components/admin/LoadingSpinner';
import StaffNotFound from '../../components/admin/StaffNotFound';
import BackButton from '../../components/admin/BackButton';

const StaffDetail = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('leaves');
  const [showFilter, setShowFilter] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  // hooks
  const {
    staff: staffData,
    loading: staffLoading,
    error: staffError,
    getPublicStaffById,
    reset: resetPublicStaff,
  } = useGetPublicStaffById();

  const {
    loading: addLeaveLoading,
    error: addLeaveError,
    addStaffLeave,
    reset: resetAddLeave,
  } = useAddStaffLeave();

  const {
    loading: deleteLoading,
    error: deleteError,
    deleteStaff,
    reset: resetDelete,
  } = useDeleteStaff();

  const {
    loading: updateLoading,
    error: updateError,
    updateStaff,
    reset: resetUpdate,
  } = useUpdateStaff();

  const {
    loading: deleteLeaveLoading,
    error: deleteLeaveError,
    deleteStaffLeave,
    reset: resetDeleteLeave,
  } = useDeleteStaffLeave();

  const {
    loading: addIncrementLoading,
    error: addIncrementError,
    addWageIncrement,
    reset: resetAddIncrement,
  } = useAddWageIncrement();

  const {
    loading: updateIncrementLoading,
    error: updateIncrementError,
    editWageIncrement,
    reset: resetUpdateIncrement,
  } = useEditWageIncrement();

  // fetch staff
  useEffect(() => {
    if (staffId && typeof staffId === 'string' && staffId.trim() !== '') {
      getPublicStaffById(staffId, dateFilter.startDate, dateFilter.endDate);
    }
  }, [staffId, dateFilter, getPublicStaffById]);

  // cleanup increments
  useEffect(() => {
    return () => {
      resetAddIncrement();
      resetUpdateIncrement();
    };
  }, [resetAddIncrement, resetUpdateIncrement]);

  // delete staff
  const handleDeleteStaff = useCallback(
    async (id) => {
      if (!id) return;
      const result = await deleteStaff(id);
      if (result.success) {
        navigate('/');
      }
    },
    [deleteStaff, navigate]
  );

  // wage increment add/edit
  const handleEditWage = useCallback(
    async (wageData) => {
      if (!staffData?.data?.staff?._id) return;
      setEditLoading(true);
      setEditError(null);
      try {
        const { incrementId, ...updateFields } = wageData;
        let result;

        const baseWage = staffData?.data?.staff?.currentDailyWage || 1;

        if (incrementId) {
          result = await editWageIncrement(staffData.data.staff._id, incrementId, updateFields);
        } else {
          result = await addWageIncrement(staffData.data.staff._id, {
            ...updateFields,
            previousWage: baseWage,
            incrementAmount: updateFields.newWage - baseWage,
            incrementPercentage: (((updateFields.newWage - baseWage) / baseWage) * 100).toFixed(2),
          });
        }

        if (result.success) {
          await getPublicStaffById(staffId, dateFilter.startDate, dateFilter.endDate);
        } else {
          setEditError(updateIncrementError || addIncrementError || 'Failed to update wage');
        }
      } catch (err) {
        setEditError(err.message || 'Failed to update wage');
      } finally {
        setEditLoading(false);
      }
    },
    [
      staffData,
      staffId,
      dateFilter,
      getPublicStaffById,
      editWageIncrement,
      addWageIncrement,
      updateIncrementError,
      addIncrementError,
    ]
  );

  // edit staff
  const handleEditStaff = async (formData) => {
    if (!staffData?.data?.staff?._id) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const result = await updateStaff(staffData.data.staff._id, formData);
      if (result.success) {
        await getPublicStaffById(staffId, dateFilter.startDate, dateFilter.endDate);
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

  // add leave
  const handleLeaveSubmit = async (leaveData) => {
    try {
      const result = await addStaffLeave(staffId, leaveData);
      if (result.success) {
        await getPublicStaffById(staffId, dateFilter.startDate, dateFilter.endDate);
        setShowLeaveForm(false);
        resetAddLeave();
      } else {
        console.error('Error submitting leave:', addLeaveError);
      }
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };

  const handleBack = () => {
    navigate('/admin/staff');
  };

  const isLoading =
    staffLoading || deleteLoading || updateLoading || editLoading || addIncrementLoading || updateIncrementLoading;

  if (isLoading && !staffData) {
    return <LoadingSpinner message="Loading staff details..." />;
  }

  if (!staffData?.data) {
    return <StaffNotFound onBack={handleBack} />;
  }

  // extract safe data
  const { staff, period, attendance, finances, wageInfo } = staffData.data;

  const basicStaff = {
    ...staff,
    dailyWage: wageInfo?.appliedWage ?? staff?.dailyWage,
  };

  const salaryDetails = {
    currentDailyWage: staff?.currentDailyWage ?? 0,
    wagePerDay: wageInfo?.wagePerDay ?? 0,
    dailyWage: wageInfo?.appliedWage ?? staff?.dailyWage ?? 0,
    daysInMonth: period?.totalDays ?? 0,
    daysWorked: attendance?.daysWorked ?? 0,
    leaveDays: attendance?.leaveDays ?? 0,
    advancePaid: finances?.advancePaid ?? 0,
    monthlySalary: finances?.monthlySalary ?? 0,
    finalSalary: finances?.finalSalary ?? 0,
  };

  const safeLeaveData = Array.isArray(attendance?.leaveData) ? attendance.leaveData : [];
  const safeAdvances = Array.isArray(finances?.advances) ? finances.advances : [];

  return (
    <div className="min-h-screen bg-gray-50 p-0 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <BackButton onBack={handleBack} />

        {/* show global errors */}
        {(staffError || deleteError || updateError || editError) && (
          <p className="text-red-500 mb-4">{staffError || deleteError || updateError || editError}</p>
        )}

        <StaffInfoCard
          staffId={staff?._id}
          staffData={basicStaff}
          salaryDetails={salaryDetails}
          onDelete={handleDeleteStaff}
          onEditWage={handleEditWage}
          onEdit={() => setShowEditModal(true)}
        />

        <StaffTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          handleDateFilterChange={setDateFilter}
          leavesLoading={addLeaveLoading || deleteLeaveLoading}
          advancesLoading={isLoading}
          incrementLoading={addIncrementLoading || updateIncrementLoading}
        />

        <div className="bg-white rounded-xl shadow-md border p-1 sm:p-6">
          {activeTab === 'leaves' && (
            <StaffLeavesTab
              staffId={staff?._id}
              leaves={safeLeaveData}
              leavesLoading={isLoading}
              showLeaveForm={showLeaveForm}
              setShowLeaveForm={setShowLeaveForm}
              handleRefreshLeaves={() => getPublicStaffById(staff?._id, dateFilter.startDate, dateFilter.endDate)}
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
              handleRefreshAdvances={() => getPublicStaffById(staff?._id, dateFilter.startDate, dateFilter.endDate)}
            />
          )}

          {activeTab === 'increments' && (
            <StaffIncrementsTab
              incrementHistory={wageInfo?.wageIncrements || []}
              incrementLoading={addIncrementLoading || updateIncrementLoading}
              incrementsThisMonth={wageInfo?.wageIncrementsThisMonth || []}
              currentWage={staff?.currentDailyWage ?? 0}
              onEditWage={handleEditWage}
              getPublicStaffById={getPublicStaffById}
            />
          )}
        </div>

        {showEditModal && (
          <AddStaff
            mode="edit"
            staff={basicStaff}
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

export default StaffDetail;

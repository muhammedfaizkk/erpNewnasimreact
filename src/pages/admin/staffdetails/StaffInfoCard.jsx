import React, { useState } from 'react';
import {
  MdEmail,
  MdPhone,
  MdAttachMoney,
  MdCalendarToday,
  MdPerson,
  MdEdit,
  MdDelete,
  MdExpandMore,
  MdExpandLess,
  MdInfo
} from 'react-icons/md';
import ConfirmationModal from '../../../components/admin/ConfirmationModal';
import AddWageIncrementForm from '../../../components/admin/forms/AddWageIncrementForm';

const StaffInfoCard = ({ staffData, salaryDetails, onEdit, onDelete, onEditWage }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditWage, setShowEditWage] = useState(false);
  const [showIncrementForm, setShowIncrementForm] = useState(false);
  
  const getCurrentWage = () => {
    return salaryDetails?.dailyWage || 
           salaryDetails?.currentDailyWage || 
           staffData.dailyWage || 
           '';
  };
  
  const [wageForm, setWageForm] = useState({
    previousWage: getCurrentWage(),
    newWage: '',
    incrementAmount: '',
    effectiveDate: '',
    reason: ''
  });

  const toggleExpand = () => setExpanded(!expanded);

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(staffData);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

 const confirmDelete = (e) => {
  e.stopPropagation();
- onDelete(staffData.id);
+ onDelete(staffData._id || staffData.id);
  setShowDeleteConfirm(false);
};


  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleOpenIncrementForm = (e) => {
    e.stopPropagation();
    setShowIncrementForm(true);
  };

  const handleCloseIncrementForm = () => {
    setShowIncrementForm(false);
  };

  const handleWageFormChange = (e) => {
    const { name, value } = e.target;
    setWageForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWageFormSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!wageForm.newWage || !wageForm.effectiveDate || !wageForm.reason) {
      alert('Please fill all required fields');
      return;
    }
    
    if (onEditWage) {
      onEditWage({ ...wageForm, staffId: staffData.id });
    }
    setShowEditWage(false);
  };

  const cancelEditWage = (e) => {
    e.stopPropagation();
    setShowEditWage(false);
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={toggleExpand}
    >
      {/* Dropdown Arrow */}
      <div
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-gray-700 cursor-pointer z-10"
        onClick={(e) => {
          e.stopPropagation();
          toggleExpand();
        }}
      >
        {expanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
      </div>

      {/* Header */}
      <div className="p-4 sm:p-6 cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
          <div className="flex justify-center sm:block">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50">
              <MdPerson className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </div>
          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {staffData.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 truncate mb-2">
              {staffData.role}
            </p>

            <div className="flex flex-wrap gap-2">
              <ActionButton onClick={handleEditClick} icon={<MdEdit />} label="Edit" color="blue" />
              <ActionButton onClick={handleDeleteClick} icon={<MdDelete />} label="Delete" color="red" />
              <ActionButton onClick={handleOpenIncrementForm} icon={<MdAttachMoney />} label="Wage" color="green" />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-gray-600">
              {staffData.contact?.email && (
                <div className="flex items-center gap-1">
                  <MdEmail className="w-4 h-4 text-gray-400" />
                  <span>{staffData.contact.email}</span>
                </div>
              )}
              {staffData.contact?.phone && (
                <div className="flex items-center gap-1">
                  <MdPhone className="w-4 h-4 text-gray-400" />
                  <span>{staffData.contact.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          {salaryDetails && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <MdInfo className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Salary Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <DetailItem icon={<MdAttachMoney className="w-5 h-5 text-gray-500" />} label="Daily Wage" value={`₹${salaryDetails.currentDailyWage || 'N/A'}`} />
                {salaryDetails.wagePerDay && (
                  <DetailItem icon={<MdAttachMoney className="w-5 h-5 text-gray-500" />} label="Wage Per Day" value={`₹${salaryDetails.wagePerDay}`} />
                )}
                <DetailItem icon={<MdCalendarToday className="w-5 h-5 text-gray-500" />} label="Days in Month" value={salaryDetails.daysInMonth || 'N/A'} />
                <DetailItem icon={<MdCalendarToday className="w-5 h-5 text-gray-500" />} label="Days Worked" value={salaryDetails.daysWorked || 'N/A'} />
                <DetailItem icon={<MdCalendarToday className="w-5 h-5 text-gray-500" />} label="Leave Days" value={salaryDetails.leaveDays || 'N/A'} />
                <DetailItem icon={<MdAttachMoney className="w-5 h-5 text-gray-500" />} label="Advance Paid" value={`₹${salaryDetails.advancePaid || '0'}`} />
                <DetailItem icon={<MdAttachMoney className="w-5 h-5 text-gray-500" />} label="Monthly Salary" value={`₹${salaryDetails.monthlySalary || 'N/A'}`} />
                <div className="sm:col-span-2 md:col-span-3">
                  <DetailItem icon={<MdAttachMoney className="w-5 h-5 text-green-600" />} label="Final Salary" value={`₹${salaryDetails.finalSalary || 'N/A'}`} highlight />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Wage Modal */}
      {showEditWage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <form
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-screen overflow-y-auto"
            onClick={e => e.stopPropagation()}
            onSubmit={handleWageFormSubmit}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Wage</h3>
            <div className="space-y-3">
              <FormInput label="Previous Wage" name="previousWage" value={wageForm.previousWage} readOnly />
              <FormInput label="New Wage" name="newWage" value={wageForm.newWage} onChange={handleWageFormChange} required />
              <FormInput label="Increment Amount" name="incrementAmount" value={wageForm.incrementAmount} onChange={handleWageFormChange} required />
              <FormInput label="Effective Date" name="effectiveDate" type="date" value={wageForm.effectiveDate} onChange={handleWageFormChange} required />
              <FormTextArea label="Reason" name="reason" value={wageForm.reason} onChange={handleWageFormChange} required />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={cancelEditWage}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          actionType="delete"
          itemName={staffData.name}
        />
      )}

      {/* Wage Increment Form */}
      {showIncrementForm && (
        <AddWageIncrementForm
          staffId={staffData.staff ? staffData.staff._id : staffData._id || staffData.id}
          currentWage={getCurrentWage()}
          onClose={handleCloseIncrementForm}
          onSubmit={() => setShowIncrementForm(false)}
          loading={false}
        />
      )}
    </div>
  );
};

// Reusable Components (keep these the same)
const ActionButton = ({ onClick, icon, label, color }) => {
  const base = {
    blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    red: 'bg-red-100 text-red-700 hover:bg-red-200',
    green: 'bg-green-100 text-green-800 hover:bg-green-200'
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${base[color]}`}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
};

const DetailItem = ({ icon, label, value, highlight = false }) => (
  <div className={`flex items-center gap-2 p-2 rounded ${highlight ? 'bg-green-50' : ''}`}>
    {icon}
    <span className="text-gray-600">{label}:</span>
    <span className={`font-medium ${highlight ? 'text-green-700' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const FormInput = ({ label, name, value, onChange, readOnly = false, type = 'number', required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      className={`w-full px-3 py-2 border rounded-md ${readOnly ? 'bg-gray-100 text-gray-700' : ''}`}
    />
  </div>
);

const FormTextArea = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border rounded-md"
    />
  </div>
);

export default StaffInfoCard;
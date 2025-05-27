import { useState } from 'react';
import StaffFilter from '../../components/admin/filters/StaffFilter';
import StaffCards from '../../components/admin/cards/StaffCards';
import StaffDetail from '../../pages/admin/StaffDetail';

const StaffManagement = () => {
  const dummyStaffData = [
    {
      id: 1,
      name: 'Alice Johnson',
      position: 'Manager',
      department: 'Sales',
      email: 'alice.johnson@example.com',
      phone: '9876543210',
    },
    {
      id: 2,
      name: 'Bob Smith',
      position: 'Technician',
      department: 'Maintenance',
      email: 'bob.smith@example.com',
      phone: '9123456780',
    },
    {
      id: 3,
      name: 'Clara Davis',
      position: 'HR Executive',
      department: 'Human Resources',
      email: 'clara.davis@example.com',
      phone: '9988776655',
    },
  ];

  const dummyLeavesData = [
    { staffId: 1, date: '2025-05-20', reason: 'Sick Leave' },
    { staffId: 2, date: '2025-05-21', reason: 'Personal' },
  ];

  const dummyAdvancePaymentsData = [
    { staffId: 3, amount: 5000, date: '2025-05-18' },
  ];

  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffData, setStaffData] = useState(dummyStaffData);
  const [leavesData, setLeavesData] = useState(dummyLeavesData);
  const [advancePaymentsData, setAdvancePaymentsData] = useState(dummyAdvancePaymentsData);
  const [filteredStaff, setFilteredStaff] = useState(dummyStaffData);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStaff(null);
  };

  const handleAddLeave = (newLeave) => {
    setLeavesData([...leavesData, newLeave]);
  };

  const handleAddAdvancePayment = (newPayment) => {
    setAdvancePaymentsData([...advancePaymentsData, newPayment]);
  };

  const handleFilterChange = (department) => {
    if (department === '') {
      setFilteredStaff(staffData);
    } else {
      setFilteredStaff(staffData.filter(staff => staff.department === department));
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredStaff(staffData);
    } else {
      setFilteredStaff(staffData.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  };

  if (currentView === 'detail' && selectedStaff) {
    return (
      <StaffDetail
        staff={selectedStaff}
        onBack={handleBackToList}
        onAddLeave={handleAddLeave}
        onAddAdvancePayment={handleAddAdvancePayment}
        leaves={leavesData}
        advancePayments={advancePaymentsData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
          <p className="text-gray-600">Manage your team members, their leaves, and advance payments</p>
        </div>

        <StaffFilter
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        <StaffCards
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
        />
      </div>
    </div>
  );
};

export default StaffManagement;

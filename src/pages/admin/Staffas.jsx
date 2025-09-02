// StaffManagement.jsx
import { useState, useEffect } from 'react';
import StaffFilter from '../../components/admin/filters/StaffFilter';
import StaffCards from '../../components/admin/cards/StaffCards';
import StaffDetail from '../../pages/admin/StaffDetail';
import { useNavigate } from 'react-router-dom';
import AddStaff from '../../components/admin/forms/AddStaff';
import {
  useGetAllStaff,
  useAddStaff,
  useDeleteStaff
} from '../../hooks/staff/Addstaffhooks';
import StaffCardsSkeleton from '../../skeletons/StaffCardSkeleton';

const StaffManagement = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({ department: '', search: '' });
  const { staff, loading, error, getAllStaff } = useGetAllStaff();
  const { addStaff, loading: addLoading, error: addError } = useAddStaff();
  const { deleteStaff, loading: deleteLoading } = useDeleteStaff();

  const navigate = useNavigate()
  useEffect(() => {
    getAllStaff();
  }, [getAllStaff]);


  useEffect(() => {
    let filtered = staff || [];

    // Apply department filter
    if (filterCriteria.department) {
      filtered = filtered.filter(member => member.role === filterCriteria.department);
    }

    // Apply search filter
    if (filterCriteria.search) {
      const searchTerm = filterCriteria.search.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.role.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phone.includes(searchTerm)
      );
    }

    setFilteredStaff(filtered);
  }, [staff, filterCriteria]);

  const handleStaffClick = (id) => {
    navigate(`/staffdetail/${id}`);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStaff(null);
  };

  const handleFilterChange = (department) => {
    setFilterCriteria(prev => ({ ...prev, department }));
  };

  const handleSearch = (searchTerm) => {
    setFilterCriteria(prev => ({ ...prev, search: searchTerm }));
  };

  const handleAddStaff = async (newStaffData) => {
    try {
      const result = await addStaff(newStaffData);
      if (result.success) {
        setShowAddStaff(false);
        // Refresh the staff list
        getAllStaff();
        // Show success message (you can use a toast library)
        console.log('Staff member added successfully!');
      } else {
        console.error('Failed to add staff member');
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };




  if (loading && !staff.length) {
    return (
      <div>
        <StaffCardsSkeleton />
      </div>
    );
  }

  // Error state
  if (error && !staff.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading staff members: {error.message}</p>
          <button
            onClick={getAllStaff}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex  justify-between sm:items-center mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Staffs
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredStaff.length} of {staff.length} staff members
            </p>
          </div>

          <button
            onClick={() => setShowAddStaff(true)}
            disabled={addLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {addLoading ? 'Adding...' : 'Add Staff'}
          </button>

        </div>

        <div className="mb-4 sm:mb-6">
          <StaffFilter
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            departments={[...new Set(staff.map(member => member.role))]}
          />
        </div>

        <StaffCards
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
          loading={loading}
        />

        {showAddStaff && (
          <AddStaff
            onClose={() => setShowAddStaff(false)}
            onSubmit={handleAddStaff}
            loading={addLoading}
            error={addError}
          />
        )}
      </div>
    </div>
  );

};

export default StaffManagement;


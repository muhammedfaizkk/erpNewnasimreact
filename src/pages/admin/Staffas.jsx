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

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member? This will also delete all related records.')) {
      try {
        const result = await deleteStaff(staffId);
        if (result.success) {
          // Refresh the staff list
          getAllStaff();
          // Navigate back to list if we're viewing the deleted staff member
          if (selectedStaff && selectedStaff._id === staffId) {
            handleBackToList();
          }
          console.log('Staff member deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  // Loading state
  if (loading && !staff.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff members...</p>
        </div>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
            <p className="text-gray-600">
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

        {/* Filter Component */}
        <div className="mb-6">
          <StaffFilter 
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            departments={[...new Set(staff.map(member => member.role))]} // Get unique roles
          />
        </div>

        
        <StaffCards
          staff={filteredStaff}
          onStaffClick={handleStaffClick}
          loading={loading}
        />

        {/* Add Staff Modal */}
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


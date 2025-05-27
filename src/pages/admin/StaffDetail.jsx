import { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Filter
} from 'lucide-react';
import StaffViewFilter from '../../components/admin/filters/StaffViewFilter';
import StaffLeave from '../../components/admin/StaffLeave';
import StaffAdvancePayment from '../../components/admin/StaffAdvancePayment';

const StaffDetail = ({
  staff = {
    id: 1,
    name: 'John Doe',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State',
    joinDate: '2023-01-15',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  onBack = () => console.log('Back clicked'),
  onAddLeave = () => console.log('Add leave'),
  onAddAdvancePayment = () => console.log('Add payment'),
  leaves = [],
  advancePayments = []
}) => {
  const [activeTab, setActiveTab] = useState('leaves');
  const [dateFilter, setDateFilter] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Staff List
        </button>

        {/* Staff Info Card */}
        <div className="bg-white rounded-xl shadow-md border p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              src={staff.avatar}
              alt={staff.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover self-center sm:self-start"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{staff.name}</h1>
                  <p className="text-sm sm:text-base text-gray-600">{staff.position}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0">
                  {staff.department}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start">
                  <Mail className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
                  <span>{staff.address}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filter Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="sm:hidden flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm"
            >
              <Filter className="w-4 h-4" /> {showFilter ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="w-full sm:w-auto border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('leaves')}
                  className={`flex-1 sm:flex-initial text-center py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'leaves'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="inline w-4 h-4 mr-1" /> Leaves
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex-1 sm:flex-initial text-center py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'payments'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="inline w-4 h-4 mr-1" /> Payments
                </button>
              </nav>
            </div>
          </div>

          {(showFilter || typeof window !== 'undefined' && window.innerWidth >= 640) && (
            <div className="mt-4">
              <StaffViewFilter onFilterChange={setDateFilter} />
            </div>
          )}
        </div>

        {/* Tab Contents */}
        {activeTab === 'leaves' ? (
          <StaffLeave
            staffId={staff.id}
            leaves={leaves}
            onAddLeave={onAddLeave}
            dateFilter={dateFilter}
          />
        ) : (
          <StaffAdvancePayment
            staffId={staff.id}
            advancePayments={advancePayments}
            onAddAdvancePayment={onAddAdvancePayment}
            dateFilter={dateFilter}
          />
        )}
      </div>
    </div>
  );
};

export default StaffDetail;
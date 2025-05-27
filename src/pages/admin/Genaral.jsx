import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Plus } from 'lucide-react';
import SiteCard from '../../components/admin/cards/SiteCard';
import SiteTable from '../../components/admin/tables/SiteTable';
import SiteDetailView from '../../components/admin/SiteDetailView';
import SiteFilter from '../../components/admin/filters/SiteFilter';
import Addsites from '../../components/admin/forms/Addsites';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { useGetAllSites, useAddSite, useEditSite, useDeleteSite } from '../../hooks/site/Sitehooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Genaral = () => {
  // State for site data and UI
  const [selectedSite, setSelectedSite] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentSite, setCurrentSite] = useState(null);

  // API hooks
  const {
    getAllSites,
    loading: loadingSites,
    error: sitesError,
    sites,
    count,
    reset: resetSites
  } = useGetAllSites();

  const { addSite, loading: adding, error: addError } = useAddSite();
  const { editSite, loading: editing, error: editError } = useEditSite();
  const { deleteSite, loading: deleting, error: deleteError } = useDeleteSite();

  // Combined loading and error states
  const loading = loadingSites || adding || editing || deleting;
  const error = sitesError || addError || editError || deleteError;

  // Load sites on component mount and when status filter changes
  useEffect(() => {
    const fetchSites = async () => {
      await getAllSites(statusFilter === 'all' ? undefined : statusFilter);
    };
    fetchSites();
  }, [statusFilter, getAllSites]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'on going': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'on going':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : 'N/A';
  };

  const calculateBalance = (site) => {
    return (site?.totalIncome || 0) - (site?.totalExpense || 0);
  };

  // Filter and search handlers
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };


  const refreshSites = async () => {
    resetSites();
    await getAllSites(statusFilter === 'all' ? undefined : statusFilter);
  };

  // Site actions
  const handleAddNew = () => {
    setModalMode('add');
    setCurrentSite(null);
    setIsSiteModalOpen(true);
  };

  const handleEdit = (site) => {
    setModalMode('edit');
    setCurrentSite(site);
    setIsSiteModalOpen(true);
  };

  const handleDelete = (site) => {
    setCurrentSite(site);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (currentSite) {
      const result = await deleteSite(currentSite.id || currentSite._id);
      if (result.success) {
        toast.success('Site deleted successfully');
        await refreshSites();
      } else {
        toast.error(result.message || 'Failed to delete site');
      }
    }
    setIsConfirmModalOpen(false);
    setCurrentSite(null);
  };

  const handleModalClose = () => {
    setIsSiteModalOpen(false);
    setCurrentSite(null);
    setModalMode('add');
  };

  const handleSubmitSite = async (formData) => {
    try {
      // Date validation
      const startDate = new Date(formData.startDate);
      const dueDate = new Date(formData.dueDate);
      
      if (dueDate <= startDate) {
        toast.error('Due date must be later than start date');
        return;
      }

      let result;
      if (modalMode === 'add') {
        const addData = {
          ...formData,
          totalIncome: 0,
          totalExpense: 0
        };
        result = await addSite(addData);
      } else {
        const editData = {
          ...formData,
          id: currentSite?.id || currentSite?._id
        };
        result = await editSite(editData);
      }

      if (result.success) {
        toast.success(`Site ${modalMode === 'add' ? 'added' : 'updated'} successfully`);
        await refreshSites();
        handleModalClose();
      } else {
        toast.error(result.message || `Failed to ${modalMode === 'add' ? 'add' : 'update'} site`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(`Failed to ${modalMode === 'add' ? 'add' : 'update'} site: ${err.message}`);
    }
  };

  // Filter sites to only show type === 'Site' and apply search
  const filteredSites = sites
    .filter(site => site.type === 'Site')
    .filter(site => 
      site.name?.toLowerCase().includes(searchTerm) ||
      site.place?.toLowerCase().includes(searchTerm) ||
      site.contactNumber?.includes(searchTerm)
    );

  // Get active sites count
  const getActiveCount = () => {
    return sites
      .filter(site => site.type === 'Site')
      .filter(site => {
        const status = site.status?.toLowerCase();
        return status === 'active' || status === 'on going';
      }).length;
  };

  // Get total count for type 'Site'
  const getSiteCount = () => {
    return sites.filter(site => site.type === 'Site').length;
  };

  // Get pending count for type 'Site'
  const getPendingCount = () => {
    return sites
      .filter(site => site.type === 'Site')
      .filter(s => s.status?.toLowerCase() === 'pending').length;
  };

  // Calculate total balance for type 'Site' only
  const getTotalBalance = () => {
    return sites
      .filter(site => site.type === 'Site')
      .reduce((sum, site) => sum + calculateBalance(site), 0);
  };

  if (selectedSite) {
    return (
      <SiteDetailView
        site={selectedSite}
        onBack={() => setSelectedSite(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        calculateBalance={calculateBalance}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Site Management</h1>
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New Site</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{getSiteCount()}</div>
              <div className="text-xs text-blue-500">Total Sites</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {getActiveCount()}
              </div>
              <div className="text-xs text-green-500">Active</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-yellow-600">
                {getPendingCount()}
              </div>
              <div className="text-xs text-yellow-500">Pending</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">
                {formatCurrency(getTotalBalance())}
              </div>
              <div className="text-xs text-purple-500">Total Balance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {error.message || 'An error occurred'}
                </p>
                {error.errors && (
                  <ul className="mt-1 text-sm text-red-600 list-disc pl-5">
                    {Object.entries(error.errors).map(([field, message]) => (
                      <li key={field}>{`${field}: ${message}`}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <SiteFilter
          onStatusFilterChange={handleStatusFilterChange}
          onSearch={handleSearch}
          currentStatus={statusFilter}
          searchTerm={searchTerm}
          loading={loading}
        />

        {isMobileView ? (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {filteredSites.map(site => (
              <SiteCard
                key={site.id || site._id}
                site={site}
                onClick={() => setSelectedSite(site)}
                onEdit={() => handleEdit(site)}
                onDelete={() => handleDelete(site)}
                formatCurrency={formatCurrency}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                calculateBalance={calculateBalance}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
            <SiteTable
              sites={filteredSites}
              onRowClick={setSelectedSite}
              onEdit={handleEdit}
              onDelete={handleDelete}
              calculateBalance={calculateBalance}
              loading={loading}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          </div>
        )}

        {/* Site Modal */}
        {isSiteModalOpen && (
          <Addsites
            mode={modalMode}
            site={currentSite}
            onClose={handleModalClose}
            onSubmit={handleSubmitSite}
            loading={adding || editing}
            error={addError || editError}
          />
        )}

        {/* Confirmation Modal */}
        {isConfirmModalOpen && (
          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => {
              setIsConfirmModalOpen(false);
              setCurrentSite(null);
            }}
            onConfirm={handleConfirmAction}
            title="Delete Site"
            message={`Are you sure you want to delete ${currentSite?.name || 'this site'}? This action cannot be undone.`}
            confirmText="Delete"
            loading={deleting}
          />
        )}
      </div>
    </div>
  );
};

export default Genaral;
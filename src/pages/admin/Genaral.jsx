import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Plus } from 'lucide-react';
import SiteCard from '../../components/admin/cards/SiteCard';
import SiteTable from '../../components/admin/tables/SiteTable';
import Addsites from '../../components/admin/forms/Addsites';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { useGetAllGenaral, useAddSite, useEditSite, useDeleteSite } from '../../hooks/site/Sitehooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SiteDetailView from '../../components/admin/SiteDetailView';
import { useNavigate } from 'react-router-dom';
import SiteFilter from '../../components/admin/filters/SiteFilter';
import SiteCardSkeleton from '../../skeletons/SiteCardSkeleton';

const Genaral = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentSite, setCurrentSite] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const {
    getAllSites,
    loading: loadingSites,
    error: sitesError,
    sites,
    totalCount,
    page,
    setPage,
    totalPages,
    reset: resetSites,
    addSiteToList,
    updateSiteInList,
    removeSiteFromList,
  } = useGetAllGenaral();

  const { addSite, loading: adding, error: addError } = useAddSite();
  const { editSite, loading: editing, error: editError } = useEditSite();
  const { deleteSite, loading: deleting, error: deleteError } = useDeleteSite();

  const loading = loadingSites || adding || editing || deleting;
  const error = sitesError || addError || editError || deleteError;

  const pageSize = 10;

  const getStatusColor = useCallback((status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'on going': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getStatusIcon = useCallback((status) => {
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
  }, []);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  }, []);

  const formatDate = useCallback((dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : 'N/A';
  }, []);

  const calculateBalance = useCallback((site) => {
    return (site?.totalIncome || 0) - (site?.totalExpense || 0);
  }, []);

  const loadSites = useCallback(async () => {
    try {
      await getAllSites({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        type: 'General',
        search: searchTerm || undefined,
      });
    } catch (err) {
      console.error('Error loading sites:', err);
      toast.error('Failed to load sites');
    }
  }, [getAllSites, statusFilter, searchTerm]);

  useEffect(() => {
    loadSites();
  }, [loadSites, page, statusFilter, searchTerm]);

  useEffect(() => {
    setPage(1); // Reset page when filters change
  }, [statusFilter, searchTerm, setPage]);

  const handleStatusFilterChange = useCallback((status) => {
    setStatusFilter(status);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statistics = useMemo(() => {
    const totalCount = sites.length;
    const activeCount = sites.filter(site => {
      const status = site.status?.toLowerCase();
      return status === 'active' || status === 'on going';
    }).length;
    const pendingCount = sites.filter(s => s.status?.toLowerCase() === 'pending').length;
    const totalBalance = sites.reduce((sum, site) => sum + calculateBalance(site), 0);

    return {
      totalCount,
      activeCount,
      pendingCount,
      totalBalance
    };
  }, [sites, calculateBalance]);

  const handleAddNew = useCallback(() => {
    setModalMode('add');
    setCurrentSite(null);
    setIsSiteModalOpen(true);
  }, []);

  const handleEdit = useCallback((site) => {
    setModalMode('edit');
    setCurrentSite(site);
    setIsSiteModalOpen(true);
  }, []);

  const handleDelete = useCallback((site) => {
    setCurrentSite(site);
    setIsConfirmModalOpen(true);
  }, []);

  const handleView = useCallback((site) => {
    navigate(`/sitedetailview/${site.id || site._id}`);
  }, [navigate]);

  const handleConfirmAction = useCallback(async () => {
    if (currentSite) {
      try {
        const result = await deleteSite(currentSite.id || currentSite._id);
        if (result.success) {
          toast.success('Site deleted successfully');
          await loadSites();
        } else {
          toast.error(result.message || 'Failed to delete site');
        }
      } catch (err) {
        console.error('Delete error:', err);
        toast.error('Failed to delete site');
      }
    }
    setIsConfirmModalOpen(false);
    setCurrentSite(null);
  }, [currentSite, deleteSite, loadSites]);

  const handleModalClose = useCallback(() => {
    setIsSiteModalOpen(false);
    setCurrentSite(null);
    setModalMode('add');
  }, []);

  const handleSubmitSite = useCallback(async (formData) => {
    try {
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
        await loadSites();
        handleModalClose();
      } else {
        toast.error(result.message || `Failed to ${modalMode === 'add' ? 'add' : 'update'} site`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(`Failed to ${modalMode === 'add' ? 'add' : 'update'} site: ${err.message}`);
    }
  }, [modalMode, addSite, editSite, currentSite, loadSites, handleModalClose]);

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
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">General Site Management</h1>
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New General Site</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{statistics.totalCount}</div>
              <div className="text-xs text-blue-500">Total General Sites</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-600">{statistics.activeCount}</div>
              <div className="text-xs text-green-500">Active</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-yellow-600">{statistics.pendingCount}</div>
              <div className="text-xs text-yellow-500">Pending</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-600">
                {formatCurrency(statistics.totalBalance)}
              </div>
              <div className="text-xs text-purple-500">Total Balance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <SiteFilter
          onStatusFilterChange={handleStatusFilterChange}
          onSearch={handleSearch}
          currentStatus={statusFilter}
          searchTerm={searchTerm}
          loading={loading}
        />

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

        {loading && (
          <div>
            <SiteCardSkeleton />
          </div>
        )}

        {!loading && sites.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg mb-2">No general sites found</div>
            <div className="text-gray-400 text-sm">
              {searchTerm ? 'Try adjusting your search criteria' : 'No sites match the current filter'}
            </div>
          </div>
        )}

        {!loading && sites.length > 0 && (
          <>
            {isMobileView ? (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {sites.map(site => (
                  <SiteCard
                    key={site._id || site.id}
                    site={site}
                    onViewClick={handleView}
                    onEditClick={() => handleEdit(site)}
                    onDeleteClick={() => handleDelete(site)}
                    formatCurrency={formatCurrency}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    calculateBalance={calculateBalance}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
                <SiteTable
                  sites={sites}
                  onRowClick={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={loading}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  calculateBalance={calculateBalance}
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            )}

            {totalPages > 1 && (
              <div>
                <div className="flex justify-center items-center space-x-1 my-6 ">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 border rounded ${page === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

            )}
          </>
        )}

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
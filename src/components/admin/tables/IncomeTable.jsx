import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, Plus } from 'lucide-react';
import IncomeForm from '../forms/IncomeForm';
import IncomeList from './IncomeList';
import ConfirmationModal from '../ConfirmationModal';
import { toast } from 'react-toastify';
import {
  useFetchSiteIncome,
  useAddSiteIncome,
  useUpdateSiteIncome,
  useDeleteSiteIncome
} from '../../../hooks/site/SiteIncomehook';

export default function IncomeTable({ siteId, onDataChange }) {
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({});
  const [selectedIncome, setSelectedIncome] = useState(null);

  const {
    incomes,
    loading,
    error,
    totalAmount,
    refetch: fetchIncomes
  } = useFetchSiteIncome(siteId, { category: filterCategory }, 1, 100);

  const {
    mutateAsync: addIncome,
    isLoading: isAdding,
    error: addError
  } = useAddSiteIncome();

  const {
    mutateAsync: updateIncome,
    isLoading: isUpdating,
    error: updateError
  } = useUpdateSiteIncome();

  const {
    mutateAsync: deleteIncome,
    isLoading: isDeleting,
    error: deleteError
  } = useDeleteSiteIncome();

  const categories = ['advance', 'milestone', 'final_payment', 'bonus', 'other'];

  useEffect(() => {
    if (siteId) {
      fetchIncomes();
    }
  }, [siteId, filterCategory, fetchIncomes]);

  const handleDeleteClick = (income) => {
    setSelectedIncome(income);
    setConfirmAction({ 
      type: 'delete', 
      message: `Are you sure you want to delete "${income.title}"?` 
    });
    setShowConfirmModal(true);
  };

  const handleEdit = (income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const confirmHandler = async () => {
    try {
      if (confirmAction.type === 'delete' && selectedIncome) {
        await deleteIncome(selectedIncome._id);
        toast.success('Income deleted successfully!');
        fetchIncomes();
        onDataChange?.();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete income');
    } finally {
      setShowConfirmModal(false);
      setSelectedIncome(null);
    }
  };

  const resetForm = () => {
    setEditingIncome(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingIncome) {
        await updateIncome({ id: editingIncome._id, data: formData });
        toast.success('Income updated successfully!');
      } else {
        await addIncome({ siteId, data: formData });
        toast.success('Income added successfully!');
      }
      fetchIncomes();
      resetForm();
      onDataChange?.();
    } catch (error) {
      toast.error(error.message || 'Error saving income');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredIncomes = incomes?.filter(income => {
    const title = income.title || '';
    const description = income.description || '';
    const searchString = `${title} ${description}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  }) || [];

  if (!siteId) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a site to view income records
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Income Management
          </h3>
          <div className="text-sm text-gray-500">
            Total: {formatCurrency(totalAmount)}
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Income</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search income records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {(error || addError || updateError || deleteError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error?.message || addError?.message || updateError?.message || deleteError?.message}
        </div>
      )}

      {showForm && (
        <IncomeForm
          income={editingIncome}
          onClose={resetForm}
          onSubmit={handleFormSubmit}
          loading={isAdding || isUpdating}
          siteId={siteId}
        />
      )}

      <IncomeList
        incomes={filteredIncomes}
        loading={loading || isDeleting}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        formatCurrency={formatCurrency}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmHandler}
        message={confirmAction.message}
        loading={isDeleting}
      />
    </div>
  );
}
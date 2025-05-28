import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, Plus } from 'lucide-react';
import IncomeForm from '../forms/IncomeForm';
import IncomeList from './IncomeList';
import ConfirmationModal from '../../admin/ConfirmationModal';
import { toast } from 'react-toastify';
import {
    useFetchSiteIncome,
    useAddSiteIncome,
    useUpdateSiteIncome,
    useDeleteSiteIncome,
} from '../../../hooks/site/SiteIncomehook';

export default function IncomeTable({ siteId, onDataChange }) {
    console.log('siteId', siteId);

    const [showForm, setShowForm] = useState(false);
    const [editingIncome, setEditingIncome] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedIncomeId, setSelectedIncomeId] = useState(null);

    const {
        incomes,
        loading,
        error,
        totalAmount,
        refetch,
        reset,
    } = useFetchSiteIncome(siteId);

    const {
        addIncome,
        loading: isAdding,
        error: addError,
        success,
        income,
        reset: resetAdd,
    } = useAddSiteIncome();

    const {
        updateIncome,
        isLoading: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = useUpdateSiteIncome();

    const {
        deleteIncome,
        isLoading: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = useDeleteSiteIncome();

    const categories = ['advance', 'milestone', 'final_payment', 'bonus', 'other'];

  useEffect(() => {
    if (!siteId) return;
    
    const controller = new AbortController();
    const signal = controller.signal;

    const delayDebounce = setTimeout(() => {
        refetch({ signal }); // Pass the signal to your fetch function
    }, 300);

    return () => {
        clearTimeout(delayDebounce);
        controller.abort();
    };
}, [siteId]);

    const handleDeleteClick = (incomeId) => {
        setSelectedIncomeId(incomeId);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedIncomeId) return;
        const success = await deleteIncome(selectedIncomeId);
        if (success) {
            toast.success('Income deleted successfully');
            await refetch();
            onDataChange?.();
        } else {
            toast.error(deleteError?.message || 'Failed to delete income');
        }
        setConfirmModalOpen(false);
        setSelectedIncomeId(null);
    };

    const handleEdit = (income) => {
        setEditingIncome(income);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingIncome(null);
        setShowForm(false);
        resetAdd();
        resetDelete();
    };

    const handleFormSubmit = async (formData) => {
        try {
            let success = false;
            if (editingIncome) {
                success = await updateIncome(editingIncome._id, formData);
                if (success) toast.success('Income updated successfully');
            } else {
                success = await addIncome(siteId, formData);

                if (success) toast.success('Income added successfully');
            }

            if (success) {
                await refetch();
                resetForm();
                onDataChange?.();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to save income');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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



            {(error || addError || updateError || deleteError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error?.message || addError?.message || updateError?.message || deleteError?.message}
                </div>
            )}

            {showForm && (
                <IncomeForm
                    income={editingIncome}
                    onSubmit={handleFormSubmit}
                    onClose={resetForm}
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
                isOpen={confirmModalOpen}
                onClose={() => {
                    setConfirmModalOpen(false);
                    setSelectedIncomeId(null);
                }}
                onConfirm={confirmDelete}
                actionType="delete"
                itemName="this income record"
                loading={isDeleting}
            />
        </div>
    );
}
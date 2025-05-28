import React, { useState, useEffect } from 'react';
import { TrendingDown, Plus } from 'lucide-react';
import ExpenseForm from '../forms/ExpenseForm';
import ExpenseList from './ExpenseList';
import ConfirmationModal from '../../admin/ConfirmationModal';
import { toast } from 'react-toastify';

import {
    useFetchSiteExpense,
    useAddSiteExpense,
    useUpdateSiteExpense,
    useDeleteSiteExpense,
} from '../../../hooks/site/SiteExhooks';

export default function ExpenseTable({ siteId, onDataChange }) {
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const {
        expenses,
        loading,
        error,
        totalAmount,
        refetch,
        reset,
    } = useFetchSiteExpense(siteId);

    const {
        addExpense,
        isLoading: isAdding,
        error: addError,
        reset: resetAdd,
    } = useAddSiteExpense();

    const {
        updateExpense,
        isLoading: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = useUpdateSiteExpense();

    const {
        deleteExpense,
        isLoading: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = useDeleteSiteExpense();

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

    const handleDeleteClick = (expenseId) => {
        setSelectedExpenseId(expenseId);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedExpenseId) return;
        const success = await deleteExpense(selectedExpenseId);
        if (success) {
            toast.success('Expense deleted successfully');
            await refetch();
            onDataChange?.();
        } else {
            toast.error(deleteError?.message || 'Failed to delete expense');
        }
        setConfirmModalOpen(false);
        setSelectedExpenseId(null);
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingExpense(null);
        setShowForm(false);
        resetAdd();
        resetUpdate();
        resetDelete();
    };

    const handleFormSubmit = async (formData) => {
        try {
            let success = false;
            if (editingExpense) {
                success = await updateExpense(editingExpense._id, formData);
                if (success) toast.success('Expense updated successfully');
            } else {
                success = await addExpense(siteId, formData);
                if (success) toast.success('Expense added successfully');
            }

            if (success) {
                await refetch();
                resetForm();
                onDataChange?.();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to save expense');
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <TrendingDown className="w-5 h-5 mr-2 text-red-500" />
                        Expense Management
                    </h3>
                    <div className="text-sm text-gray-500">
                        Total: {formatCurrency(totalAmount)}
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Expense</span>
                </button>
            </div>

            {(error || addError || updateError || deleteError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error?.message || addError?.message || updateError?.message || deleteError?.message}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <ExpenseForm
                    expense={editingExpense}
                    onSave={handleFormSubmit}
                    onClose={resetForm}
                    loading={isAdding || isUpdating}
                    siteId={siteId}
                />
            )}

            {/* Expense Table */}
            <ExpenseList
                expenses={expenses}
                loading={loading || isDeleting}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                formatCurrency={formatCurrency}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => {
                    setConfirmModalOpen(false);
                    setSelectedExpenseId(null);
                }}
                onConfirm={confirmDelete}
                actionType="delete"
                itemName="this expense record"
                loading={isDeleting}
            />
        </div>
    );
}

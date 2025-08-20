import React, { useState } from 'react';
import { TrendingDown, Plus } from 'lucide-react';
import ExpenseForm from '../forms/ExpenseForm';
import ExpenseList from './ExpenseList';
import ConfirmationModal from '../../admin/ConfirmationModal';
import { toast } from 'react-toastify';
import { useAddSiteExpense, useUpdateSiteExpense, useDeleteSiteExpense } from '../../../hooks/site/SiteExhooks';

export default function ExpenseTable({ data = [], onDataChange, siteId }) {
    const [showForm, setShowForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const { addExpense, loading: isAdding } = useAddSiteExpense();
    const { updateExpense, loading: isUpdating } = useUpdateSiteExpense();
    const { deleteExpense, loading: isDeleting } = useDeleteSiteExpense();

    const handleDeleteClick = (expenseId) => {
        setSelectedExpenseId(expenseId);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedExpenseId) return;
        const success = await deleteExpense(selectedExpenseId);
        if (success) {
            toast.success('Expense deleted successfully');
            onDataChange?.();
        } else {
            toast.error('Failed to delete expense');
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
    };

    const handleFormSubmit = async (formData) => {
        let success = false;
        if (editingExpense) {
            success = await updateExpense(editingExpense._id, formData);
            if (success) toast.success('Expense updated successfully');
        } else {
            success = await addExpense(siteId, formData);
            if (success) toast.success('Expense added successfully');
        }
        if (success) {
            resetForm();
            onDataChange?.();
        } else {
            toast.error('Failed to save expense');
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
                        Expense
                    </h3>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                </button>
            </div>

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
                expenses={data}
                loading={isAdding || isUpdating || isDeleting}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                formatCurrency={formatCurrency}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                actionType="delete"
                itemName={selectedExpenseId ? 'Expense' : ''}
                loading={isDeleting}
            />
        </div>
    );
}

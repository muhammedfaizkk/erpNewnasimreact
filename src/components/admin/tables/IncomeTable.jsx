import React, { useState } from 'react';
import { TrendingUp, Search, Plus } from 'lucide-react';
import IncomeForm from '../forms/IncomeForm';
import IncomeList from './IncomeList';
import ConfirmationModal from '../../admin/ConfirmationModal';
import { toast } from 'react-toastify';
import { useAddSiteIncome, useUpdateSiteIncome, useDeleteSiteIncome } from '../../../hooks/site/SiteIncomehook';

export default function IncomeTable({ data = [], onDataChange, siteId }) {
    const [showForm, setShowForm] = useState(false);
    const [editingIncome, setEditingIncome] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedIncomeId, setSelectedIncomeId] = useState(null);

    const { addIncome, loading: isAdding } = useAddSiteIncome();
    const { updateIncome, isLoading: isUpdating } = useUpdateSiteIncome();
    const { deleteIncome, isLoading: isDeleting } = useDeleteSiteIncome();

    const handleDeleteClick = (incomeId) => {
        setSelectedIncomeId(incomeId);
        setConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedIncomeId) return;
        const success = await deleteIncome(selectedIncomeId);
        if (success) {
            toast.success('Income deleted successfully');
            onDataChange?.();
        } else {
            toast.error('Failed to delete income');
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
    };

    const handleFormSubmit = async (formData) => {
        let success = false;
        if (editingIncome) {
            success = await updateIncome(editingIncome._id, formData);
            if (success) toast.success('Income updated successfully');
        } else {
            success = await addIncome(siteId, formData);
            if (success) toast.success('Income added successfully');
        }
        if (success) {
            resetForm();
            onDataChange?.();
        } else {
            toast.error('Failed to save income');
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

    const filteredIncomes = data.filter(income => {
        const title = income.title || '';
        const description = income.description || '';
        const searchString = `${title} ${description}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Income
                    </h3>

                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                </button>
            </div>

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
                loading={isAdding || isUpdating || isDeleting}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                formatCurrency={formatCurrency}
            />

            <ConfirmationModal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                actionType="delete"
                itemName={selectedIncomeId ? 'Income' : ''}
                loading={isDeleting}
            />
        </div>
    );
}
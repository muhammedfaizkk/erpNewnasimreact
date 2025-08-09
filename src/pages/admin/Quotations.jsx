import React, { useState, useEffect } from 'react';
import InvoiceTable from '../../components/admin/invoices/InvoiceTable';
import InvoiceForm from '../../components/admin/invoices/InvoiceForm';
import InvoiceCard from '../../components/admin/invoices/InvoiceCard';
import { useAddInvoice, useFetchInvoices, useUpdateInvoice, useDeleteInvoice } from '../../hooks/invoices/InvoiceHooks';

const Quotations = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { invoices, loading: fetchLoading, error: fetchError, refetch, setSearchTerm: setInvoiceSearchTerm } = useFetchInvoices();
    const { addInvoice, loading: addLoading, error: addError, success: addSuccess, reset: resetAdd } = useAddInvoice();
    const { updateInvoice, loading: updateLoading, error: updateError, success: updateSuccess, reset: resetUpdate } = useUpdateInvoice();
    const { deleteInvoice, loading: deleteLoading, error: deleteError, success: deleteSuccess, reset: resetDelete } = useDeleteInvoice();
  
    useEffect(() => {
      if (addSuccess || updateSuccess) {
        setCurrentView('list');
        setSelectedInvoice(null);
        resetAdd();
        resetUpdate();
        refetch();
      }
    }, [addSuccess, updateSuccess]);
  
    useEffect(() => {
      if (deleteSuccess) {
        resetDelete();
        refetch();
      }
    }, [deleteSuccess]);
  
    const handleNewInvoice = () => {
      setSelectedInvoice(null);
      setCurrentView('form');
    };
  
    const handleEdit = (invoice) => {
      setSelectedInvoice(invoice);
      setCurrentView('form');
    };
  
    const handleDelete = async (invoiceId) => {
      if (window.confirm('Are you sure you want to delete this invoice?')) {
        await deleteInvoice(invoiceId);
      }
    };
  
    const handleFormSubmit = async (invoiceData) => {
      if (selectedInvoice) {
        await updateInvoice(selectedInvoice._id, invoiceData);
      } else {
        await addInvoice(invoiceData);
      }
    };
  
    const handleFormCancel = () => {
      setCurrentView('list');
      setSelectedInvoice(null);
    };
  
    const handleSearchChange = (value) => {
      setSearchTerm(value);
      setInvoiceSearchTerm(value);
    };
  
    if (currentView === 'form') {
      return (
        <InvoiceForm
          invoice={selectedInvoice}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={addLoading || updateLoading}
          error={addError || updateError}
        />
      );
    }
  
    return (
      <>
        {/* Table for desktop */}
        <div className="hidden md:block">
          <InvoiceTable
            invoices={invoices}
            loading={fetchLoading}
            error={fetchError}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNewInvoice={handleNewInvoice}
            deleteLoading={deleteLoading}
          />
        </div>
        {/* Cards for mobile */}
        <div className="block md:hidden p-2">
          {invoices.length === 0 && !fetchLoading && (
            <div className="text-center text-gray-500 py-8">No invoices found</div>
          )}
          {fetchLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          )}
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice._id}
              invoice={invoice}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deleteLoading={deleteLoading}
            />
          ))}
        </div>
      </>
    );
  };
  
  export default Quotations;

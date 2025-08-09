// hooks/useAddInvoice.js
import { useState ,useEffect } from 'react';
import axiosInstance from '../api'; 

export const useAddInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [success, setSuccess] = useState(false);

  const addInvoice = async (invoiceData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.post('/invoices', invoiceData);
      if (res.data.success) {
        setInvoice(res.data.invoice);
        setSuccess(true);
        return res.data.invoice;
      } else {
        setError({ message: res.data.message || 'Failed to add invoice' });
        return null;
      }
    } catch (err) {
      setError({
        message: 'Failed to add invoice',
        details: err.response?.data?.message || err.message,
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setInvoice(null);
  };

  return { addInvoice, loading, error, invoice, success, reset };
};


export const useFetchInvoices = (initialSearch = '') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Or make this configurable
  const [totalPages, setTotalPages] = useState(1);

  const fetchInvoices = async ({ search = '', page = 1 } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get('/invoices', {
        params: {
          search,
          page,
          limit
        },
      });

      if (res.data.success) {
        setInvoices(res.data.invoices);
        setTotalPages(res.data.pages);
      } else {
        setError({ message: res.data.message || 'Failed to fetch invoices' });
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch invoices',
        details: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices({ search: searchTerm, page });
  }, [searchTerm, page]);

  return {
    invoices,
    loading,
    error,
    refetch: fetchInvoices,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    totalPages,
  };
};


export const useUpdateInvoice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const updateInvoice = async (invoiceId, invoiceData) => {
      if (!invoiceId) {
        setError({ message: 'Invoice ID is required' });
        return null;
      }
  
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      try {
        const res = await axiosInstance.put(`/invoices/${invoiceId}`, invoiceData);
        if (res.data.success) {
          setInvoice(res.data.invoice);
          setSuccess(true);
          return res.data.invoice;
        } else {
          setError({ message: res.data.message || 'Failed to update invoice' });
          return null;
        }
      } catch (err) {
        setError({
          message: 'Failed to update invoice',
          details: err.response?.data?.message || err.message,
        });
        return null;
      } finally {
        setLoading(false);
      }
    };
  
    const reset = () => {
      setError(null);
      setSuccess(false);
      setInvoice(null);
    };
  
    return { updateInvoice, loading, error, invoice, success, reset };
  };

export const useDeleteInvoice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const deleteInvoice = async (invoiceId) => {
      if (!invoiceId) {
        setError({ message: 'Invoice ID is required' });
        return false;
      }
  
      setLoading(true);
      setError(null);
      setSuccess(false);
  
      try {
        const res = await axiosInstance.delete(`/invoices/${invoiceId}`);
        if (res.data.success) {
          setSuccess(true);
          return true;
        } else {
          setError({ message: res.data.message || 'Failed to delete invoice' });
          return false;
        }
      } catch (err) {
        setError({
          message: 'Failed to delete invoice',
          details: err.response?.data?.message || err.message,
        });
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    const reset = () => {
      setError(null);
      setSuccess(false);
    };
  
    return { deleteInvoice, loading, error, success, reset };
  };
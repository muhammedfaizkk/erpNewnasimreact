import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../api';



export const useFetchSiteExpense = (siteId, page = 1, limit = 10) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [data, setData] = useState({
    expenses: [],
    currentMonthExpenses: [],
    totalPages: 0,
    totalAmount: 0,
    currentMonthTotalAmount: 0,
    loading: false,
    error: null,
  });

  const cancelTokenRef = useRef(null);

  const fetchSiteExpense = useCallback(async () => {
    if (!siteId) return;

    setData(prev => ({ ...prev, loading: true, error: null }));

    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('New request initiated');
    }

    const source = axios.CancelToken.source();
    cancelTokenRef.current = source;

    try {
      const query = new URLSearchParams({ page: currentPage, limit });
      const { data } = await axiosInstance.get(`/getAllsiteex/${siteId}?${query}`, {
        cancelToken: source.token,
      });

      if (data.success) {
        setData(prev => ({
          ...prev,
          expenses: data.expenses || [],
          currentMonthExpenses: data.currentMonthExpenses || [],
          totalPages: data.totalPages || 0,
          totalAmount: data.totalAmount || 0,
          currentMonthTotalAmount: data.currentMonthTotalAmount || 0,
          loading: false
        }));
      } else {
        throw new Error(data.message || 'Failed to fetch expenses');
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: {
            message: 'Failed to fetch expenses',
            details: err.response?.data?.message || err.message,
          },
        }));
      }
    } finally {
      cancelTokenRef.current = null;
    }
  }, [siteId, currentPage, limit]);

  useEffect(() => {
    fetchSiteExpense();
    return () => cancelTokenRef.current?.cancel('Component unmounted');
  }, [fetchSiteExpense]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setPage = useCallback((p) => setCurrentPage(p), []);

  const reset = () => {
    setData({
      expenses: [],
      currentMonthExpenses: [],
      totalPages: 0,
      totalAmount: 0,
      currentMonthTotalAmount: 0,
      loading: false,
      error: null,
    });
    setCurrentPage(1);
  };

  return {
    ...data,
    currentPage,
    refetch: fetchSiteExpense,
    setPage,
    reset,
  };
};



export const useAddSiteExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expense, setExpense] = useState(null);
  const [success, setSuccess] = useState(false);

  const addExpense = async (siteId, expenseData) => {
    if (!siteId) {
      setError({ message: 'Site ID is required' });
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.post(`/addSiteex/${siteId}`, expenseData);
      if (res.data.success) {
        setExpense(res.data.expense);
        setSuccess(true);
        return res.data.expense;
      } else {
        setError({ message: res.data.message || 'Failed to add expense' });
        return null;
      }
    } catch (err) {
      setError({
        message: 'Failed to add expense',
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
    setExpense(null);
  };

  return { addExpense, loading, error, expense, success, reset };
};

export const useUpdateSiteExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateExpense = async (expenseId, expenseData) => {
    if (!expenseId) {
      setError({ message: 'Expense ID is required' });
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.put(`/updateSiteex/${expenseId}`, expenseData);
      if (res.data.success) {
        setUpdatedExpense(res.data.expense);
        setSuccess(true);
        return res.data.expense;
      } else {
        setError({ message: res.data.message || 'Failed to update expense' });
        return null;
      }
    } catch (err) {
      setError({
        message: 'Failed to update expense',
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
    setUpdatedExpense(null);
  };

  return { updateExpense, loading, error, updatedExpense, success, reset };
};

export const useDeleteSiteExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteExpense = async (expenseId) => {
    if (!expenseId) {
      setError({ message: 'Expense ID is required' });
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.delete(`/deleteSiteExpense/${expenseId}`);
      if (res.data.success) {
        setSuccess(true);
        return true;
      } else {
        setError({ message: res.data.message || 'Failed to delete expense' });
        return false;
      }
    } catch (err) {
      setError({
        message: 'Failed to delete expense',
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

  return { deleteExpense, loading, error, success, reset };
};
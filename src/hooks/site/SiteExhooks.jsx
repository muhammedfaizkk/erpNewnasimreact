import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../api';



export const useFetchSiteExpense = (siteId) => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentMonthTotalAmount, setCurrentMonthTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cancelRef = useRef(null);

  const fetchSiteExpense = async () => {
    if (!siteId) return;

    // Cancel previous request if ongoing
    if (cancelRef.current) {
      cancelRef.current.cancel('Cancelled due to new request.');
    }

    cancelRef.current = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/getAllsiteex/${siteId}`, {
        cancelToken: cancelRef.current.token,
      });

      if (response.data.success) {
        setExpenses(response.data.expenses || []);
        setCurrentMonthExpenses(response.data.currentMonthExpenses || []);
        setTotalPages(response.data.totalPages || 0);
        setTotalAmount(response.data.totalAmount || 0);
        setCurrentMonthTotalAmount(response.data.currentMonthTotalAmount || 0);
      } else {
        setError(response.data.message || 'Failed to fetch site expenses');
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Error fetching site expenses:', err);
        setError(err.response?.data?.message || 'Failed to fetch site expenses');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (siteId) {
      fetchSiteExpense();
    }

    return () => {
      if (cancelRef.current) {
        cancelRef.current.cancel('Component unmounted.');
      }
    };
  }, [siteId]);

  return {
    expenses,
    currentMonthExpenses,
    totalPages,
    totalAmount,
    currentMonthTotalAmount,
    loading,
    error,
    refetch: fetchSiteExpense,
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
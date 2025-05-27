import { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../api';
import axios from 'axios';

export const useFetchSiteIncome = (siteId, filters = {}, page = 1, limit = 10) => {
  const [incomes, setIncomes] = useState([]);
  const [currentMonthIncomes, setCurrentMonthIncomes] = useState([]);
  const [totalCurrentMonthIncomes, setTotalCurrentMonthIncomes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentMonthTotalAmount, setCurrentMonthTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef(null);

  const fetchSiteIncome = useCallback(async () => {
    if (!siteId) return;

    try {
      setLoading(true);
      setError(null);

      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('New request initiated');
      }

      const source = axios.CancelToken.source();
      cancelTokenRef.current = source;

      const res = await axiosInstance.get(`/getAllSiteIncome/${siteId}`, {
        cancelToken: source.token
      });

      const data = res.data;
      if (data.success) {
        // ✅ Use the returned income data
        setIncomes(data.data.incomes || []);
        setTotalAmount(data.data.totals?.allTimeTotal || 0);
      } else {
        setError({ message: data.message || 'Failed to fetch incomes' });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      } else {
        setError({
          message: 'Failed to fetch incomes',
          details: err.response?.data?.message || err.message,
        });
      }
    } finally {
      setLoading(false);
      cancelTokenRef.current = null;
    }
  }, [siteId]);


  useEffect(() => {
    fetchSiteIncome();

    // Cleanup function to cancel request on unmount
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Component unmounted');
      }
    };
  }, [fetchSiteIncome]);

  // Update currentPage when page prop changes
  useEffect(() => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [page]);

  const setPage = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const reset = () => {
    setIncomes([]);
    setCurrentMonthIncomes([]);
    setTotalCurrentMonthIncomes(0);
    setTotalPages(0);
    setCurrentPage(1);
    setTotalAmount(0);
    setCurrentMonthTotalAmount(0);
    setError(null);
  };

  return {
    incomes,
    currentMonthIncomes,
    totalCurrentMonthIncomes,
    totalPages,
    currentPage,
    totalAmount,
    currentMonthTotalAmount,
    loading,
    error,
    refetch: fetchSiteIncome,
    setPage,
    reset,
  };
};

export const useAddSiteIncome = () => {
  const [loading, setLoading] = useState(false);

  const addIncome = async ({ siteId, data }) => {

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/addSiteIncome/${siteId}`, data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { mutateAsync: addIncome, isLoading: loading };
};

export const useUpdateSiteIncome = () => {
  const [loading, setLoading] = useState(false);

  const updateIncome = async ({ id, data }) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/updateSiteIncome/${id}`, data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { mutateAsync: updateIncome, isLoading: loading };
};

export const useDeleteSiteIncome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteIncome = async (incomeId) => {
    if (!incomeId) {
      setError({ message: 'Income ID is required' });
      return false;
    }

    console.log('incomeId',incomeId);
    

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.delete(`/deleteSiteIncome/${incomeId}`);
      if (res.data.success) {
        setSuccess(true);
        return true;
      } else {
        setError({ message: res.data.message || 'Failed to delete income' });
        return false;
      }
    } catch (err) {
      setError({
        message: 'Failed to delete income',
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

  return { deleteIncome, loading, error, success, reset };
};
import { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../api';
import axios from 'axios';

export const useFetchSiteIncome = (siteId) => {
    const [incomes, setIncomes] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cancelRef = useRef(null);

    const fetchSiteIncome = async () => {
        if (!siteId) return;

        // Cancel previous request if still ongoing
        if (cancelRef.current) {
            cancelRef.current.cancel('Cancelled due to new request.');
        }

        cancelRef.current = axios.CancelToken.source();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/getAllSiteIncome/${siteId}`, {
                cancelToken: cancelRef.current.token,
            });

            if (response.data.success) {
                setIncomes(response.data.data.incomes || []);
                setTotalAmount(response.data.data.totals?.allTimeTotal || 0);
            } else {
                setError(response.data.message || 'Failed to fetch site income');
            }
        } catch (err) {
            if (!axios.isCancel(err)) {
                console.error('Error fetching site income:', err);
                setError(err.response?.data?.message || 'Failed to fetch site income');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (siteId) {
            fetchSiteIncome();
        }

        return () => {
            if (cancelRef.current) {
                cancelRef.current.cancel('Component unmounted.');
            }
        };
    }, [siteId]);

    return { incomes, totalAmount, loading, error, refetch: fetchSiteIncome };
};


export const useAddSiteIncome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [income, setIncome] = useState(null);
  const [success, setSuccess] = useState(false);

  const addIncome = async (siteId, incomeData) => {
    if (!siteId) {
      setError({ message: 'Site ID is required' });
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.post(`/addSiteIncome/${siteId}`, incomeData);
      if (res.data.success) {
        setIncome(res.data.income);
        setSuccess(true);
        return res.data.income;
      } else {
        setError({ message: res.data.message || 'Failed to add income' });
        return null;
      }
    } catch (err) {
      setError({
        message: 'Failed to add income',
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
    setIncome(null);
  };

  return {
    addIncome,
    loading,
    error,
    income,
    success,
    reset,
  };
};

export const useUpdateSiteIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateIncome = async (id, data) => {
    if (!id) {
      setError({ message: 'Income ID is required' });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.put(`/updateSiteIncome/${id}`, data);
      if (res.data.success) {
        return true;
      } else {
        setError({ message: res.data.message || 'Failed to update income' });
        return false;
      }
    } catch (err) {
      setError({
        message: 'Failed to update income',
        details: err.response?.data?.message || err.message,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
  };

  return { updateIncome, isLoading, error, reset };
};

export const useDeleteSiteIncome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteIncome = async (incomeId) => {
    if (!incomeId) {
      setError({ message: 'Income ID is required' });
      return false;
    }

    console.log('Deleting income with ID:', incomeId);

    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { deleteIncome, isLoading, error, success, reset };
};
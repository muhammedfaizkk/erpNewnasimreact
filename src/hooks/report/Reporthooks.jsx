import { useRef, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api';

export const useFetchFullSiteStaffReport = (startDate = '', endDate = '') => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelRef = useRef(null);

  const fetchReport = useCallback(async (startDate, endDate) => {
    if (cancelRef.current) {
      cancelRef.current.cancel('Canceled previous request.');
    }
    cancelRef.current = axios.CancelToken.source();
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      const response = await axiosInstance.get(`/report`, {
        params,
        cancelToken: cancelRef.current.token,
      });
      if (response.data.success) {
        setReport(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch report');
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Error fetching report:', err);
        setError(err.response?.data?.message || 'Failed to fetch report');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch report when component mounts or dates change
  useEffect(() => {
    fetchReport(startDate, endDate);
  }, [startDate, endDate, fetchReport]);

  return {
    report,
    loading,
    error,
    fetchReport,
  };
};

export const useFetchdashboardReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelRef = useRef(null);

  const fetchReport = useCallback(async () => {
    if (cancelRef.current) {
      cancelRef.current.cancel('Canceled previous request.');
    }
    cancelRef.current = axios.CancelToken.source();
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/report/dashboard`, {
        cancelToken: cancelRef.current.token,
      });
      if (response.data.success) {
        setReport(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch report');
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Error fetching report:', err);
        setError(err.response?.data?.message || 'Failed to fetch report');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return {
    report,
    loading,
    error,
    fetchReport,
  };
};
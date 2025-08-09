import { useState, useCallback } from 'react';
import axiosInstance from '../api';


export const useSiteAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleError = (err) => {
    const errorObj = {
      message: err.response?.data?.message || err.message || 'Request failed',
      details: err.response?.data?.error,
      status: err.response?.status,
    };
    setError(errorObj);
    return { success: false, message: errorObj.message };
  };

  const getAllSiteAttendance = useCallback(async (siteId) => {
    if (!siteId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/site/getAllSiteAttendance/${siteId}`, {
        params: { page, limit }
      });
      
      const data = response.data.attendances || [];
      const count = response.data.totalCount || 0;

      setAttendances(data);
      setTotalCount(count);
      setTotalPages(Math.ceil(count / limit));

      return { success: true, attendances: data, totalCount: count };
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const addAttendance = useCallback(async (siteId, payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/site/markSiteAttendance/${siteId}`, payload);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceById = useCallback(async (attendanceId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/site/getSiteAttendanceById/${attendanceId}`);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAttendance = useCallback(async (attendanceId, updateData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/site/updateSiteAttendance/${attendanceId}`,
        updateData
      );
      const updated = response.data.attendance;

      setAttendances(prev => 
        prev.map(att => (att._id === attendanceId ? { ...att, ...updated } : att))
      );

      return { success: true, attendance: updated };
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAttendance = useCallback(async (attendanceId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/site/deleteSiteAttendance/${attendanceId}`);
      setAttendances(prev => prev.filter(att => att._id !== attendanceId));
      setTotalCount(prev => prev - 1);
      return { success: true };
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAttendances([]);
    setPage(1);
    setLimit(10);
    setTotalCount(0);
    setTotalPages(0);
    setError(null);
  }, []);

  return {
    attendances,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalCount,
    totalPages,
    getAllSiteAttendance,
    addAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    reset,
  };
};

// Specific hook exports for individual functionality
export const useAddSiteAttendance = () => {
  const { addAttendance, loading } = useSiteAttendance();
  return { addAttendance, loading };
};
export const useGetAllSiteAttendance = () => {
    const { getAllSiteAttendance, attendances, loading, error } = useSiteAttendance();
    return { getAllSiteAttendance, attendances, loading, error };
  };

export const useUpdateSiteAttendance = () => {
  const { updateAttendance, loading } = useSiteAttendance();
  return { updateAttendance, isLoading: loading };
};

export const useDeleteSiteAttendance = () => {
  const { deleteAttendance, loading } = useSiteAttendance();
  return { deleteAttendance, isLoading: loading };
};
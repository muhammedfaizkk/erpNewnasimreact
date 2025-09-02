import { useState, useCallback } from 'react';
import axiosInstance from '../api'; // Adjust path as needed
import { toast } from 'react-toastify';

// Hook for adding staff member
export const useAddStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addStaff = useCallback(async (staffData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/staff/addStaff', staffData);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, staff: responseData.staff, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to add staff member' });
        toast.error(responseData.message || 'Failed to add staff member');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to add staff member',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to add staff member');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, addStaff, reset };
};

// Hook for getting all staff members
export const useGetAllStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllStaff = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/staff/staff');
      const responseData = response.data;

      if (responseData.success) {
        setStaff(responseData.staff);
        return { success: true, staff: responseData.staff };
      } else {
        setError({ message: responseData.message || 'Failed to fetch staff members' });
        toast.error(responseData.message || 'Failed to fetch staff members');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch staff members',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch staff members');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setStaff([]);
    setError(null);
  };

  return { staff, loading, error, getAllStaff, reset };
};


export const useGetStaffById = (id) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStaffById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setStaff(null);

    try {
      const response = await axiosInstance.get(`/staff/${id}`);
      const responseData = response.data;

      if (responseData.success) {
        setStaff(responseData.staff);
        return { success: true, staff: responseData.staff };
      } else {
        setError({ message: responseData.message || 'Failed to fetch staff member' });
        toast.error(responseData.message || 'Failed to fetch staff member');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch staff member',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch staff member');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setStaff(null);
    setError(null);
  };

  return { staff, loading, error, getStaffById, reset };
};

// Hook for updating staff member
export const useUpdateStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStaff = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/staff/staff/${id}`, updateData);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, staff: responseData.staff, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to update staff member' });
        toast.error(responseData.message || 'Failed to update staff member');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to update staff member',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to update staff member');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, updateStaff, reset };
};

export const useDeleteStaff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStaff = useCallback(async (id) => {
    if (!id) return { success: false, message: 'Invalid staff ID' };

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/staff/staffdelete/${id}`);
      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message || 'Staff deleted successfully');
        return { success: true, message: responseData.message };
      } else {
        const errMsg = responseData.message || 'Failed to delete staff member';
        setError({ message: errMsg });
        toast.error(errMsg);
        return { success: false, message: errMsg };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to delete staff member';
      setError({ message: errMsg });
      toast.error(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, deleteStaff, reset };
};

export const useAddWageIncrement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addWageIncrement = useCallback(async (staffId, incrementData) => {
    console.log('Submitting increment data:', incrementData);
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/staff/addWageIncrement/${staffId}`, incrementData);
      console.log('API response:', response);

      const responseData = response.data;

      if (responseData.success) {
        return { success: true, wageIncrement: responseData.wageIncrement, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to add wage increment' });
        toast.error(responseData.message || 'Failed to add wage increment');
        return { success: false };
      }
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
      setError({
        message: 'Failed to add wage increment',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to add wage increment');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, addWageIncrement, reset };
};

export const useEditWageIncrement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editWageIncrement = useCallback(async (staffId, incrementId, incrementData) => {
    console.log('Submitting edit increment data:', incrementData);
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/staff/${staffId}/editWageIncrement/${incrementId}`, incrementData);
      console.log('API response:', response);

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message || 'Wage increment updated successfully');
        return {
          success: true,
          wageIncrement: responseData.data.incrementRecord,
          message: responseData.message
        };
      } else {
        setError({ message: responseData.message || 'Failed to update wage increment' });
        toast.error(responseData.message || 'Failed to update wage increment');
        return { success: false };
      }
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
      setError({
        message: 'Failed to update wage increment',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to update wage increment');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, editWageIncrement, reset };
};


export const useGetWageIncrementHistory = () => {
  const [incrementHistory, setIncrementHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWageIncrementHistory = useCallback(async (staffId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/staff/wageIncrementHistory/${staffId}`);
      const responseData = response.data;

      if (responseData.success) {
        setIncrementHistory(responseData.incrementHistory);
        return { success: true, incrementHistory: responseData.incrementHistory };
      } else {
        setError({ message: responseData.message || 'Failed to fetch wage increment history' });
        toast.error(responseData.message || 'Failed to fetch wage increment history');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch wage increment history',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch wage increment history');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setIncrementHistory([]);
    setError(null);
  };

  return { incrementHistory, loading, error, getWageIncrementHistory, reset };
};

// Hook for adding staff advance payment
export const useAddStaffAdvance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addStaffAdvance = useCallback(async (staffId, advanceData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/staff/addStaffAdvance/${staffId}`, advanceData);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, staffAdvance: responseData.staffAdvance, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to add staff advance' });
        toast.error(responseData.message || 'Failed to add staff advance');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to add staff advance',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to add staff advance');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, addStaffAdvance, reset };
};


export const useDeleteStaffAdvance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStaffAdvance = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/staff/staffAdvance/${id}`);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to delete staff advance' });
        toast.error(responseData.message || 'Failed to delete staff advance');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to delete staff advance',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to delete staff advance');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, deleteStaffAdvance, reset };
};

export const useAddStaffLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addStaffLeave = useCallback(async (staffId, leaveData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/staff/addStaffLeave/${staffId}`, leaveData);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, leave: responseData.leave, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to add staff leave' });
        toast.error(responseData.message || 'Failed to add staff leave');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to add staff leave',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to add staff leave');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, addStaffLeave, reset };
};


export const useGetStaffLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStaffLeaves = useCallback(async (staffId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/staff/getStaffLeaves/${staffId}`);
      const responseData = response.data;

      if (responseData.success) {
        setLeaves(responseData.leaves);
        return { success: true, leaves: responseData.leaves };
      } else {
        setError({ message: responseData.message || 'Failed to fetch staff leaves' });
        toast.error(responseData.message || 'Failed to fetch staff leaves');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch staff leaves',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch staff leaves');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setLeaves([]);
    setError(null);
  };

  return { leaves, loading, error, getStaffLeaves, reset };
};


export const useDeleteStaffLeave = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStaffLeave = useCallback(async (leaveId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/staff/deleteStaffLeave/${leaveId}`);
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to delete staff leave' });
        toast.error(responseData.message || 'Failed to delete staff leave');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to delete staff leave',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to delete staff leave');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, deleteStaffLeave, reset };
};

// Hook for updating leave status
export const useUpdateLeaveStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLeaveStatus = useCallback(async (leaveId, status) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/staff/updateLeaveStatus/${leaveId}`, { status });
      const responseData = response.data;

      if (responseData.success) {
        return { success: true, leave: responseData.leave, message: responseData.message };
      } else {
        setError({ message: responseData.message || 'Failed to update leave status' });
        toast.error(responseData.message || 'Failed to update leave status');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to update leave status',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to update leave status');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setError(null);
  };

  return { loading, error, updateLeaveStatus, reset };
};


export const useGetPublicStaffById = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPublicStaffById = useCallback(async (staffId, startDate, endDate) => {
    setLoading(true);
    setError(null);
    setStaff(null);
    try {
      let url = `staff/public/${staffId}`;
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      const responseData = response.data;
      if (responseData.success) {
        setStaff(responseData);
        return { success: true, staff: responseData };
      } else {
        setError({ message: responseData.message || 'Failed to fetch staff member' });
        toast.error(responseData.message || 'Failed to fetch staff member');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch staff member',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch staff member');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setStaff(null);
    setError(null);
  };

  return { staff, loading, error, getPublicStaffById, reset };
};


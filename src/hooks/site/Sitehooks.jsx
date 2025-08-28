import { useCallback, useState } from 'react';
import axiosInstance from '../api';

export const useAddSite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addSite = useCallback(async (siteData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axiosInstance.post('/addSite', siteData);
      if (res.data.success) {
        setSuccess(true);
        return { success: true, site: res.data.site };
      } else {
        const errorObj = {
          message: res.data.message || 'Failed to add site',
          errors: res.data.errors
        };
        setError(errorObj);
        return { success: false, message: errorObj.message };
      }
    } catch (err) {
      const errorObj = {
        message: err.response?.data?.message || 'Failed to add site',
        details: err.response?.data?.error || err.message,
        errors: err.response?.data?.errors
      };
      setError(errorObj);
      return { success: false, message: errorObj.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { addSite, loading, error, success, reset };
};

export const useEditSite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const editSite = useCallback(async (siteData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Extract id from siteData and pass the rest as payload
      const { id, ...updateData } = siteData;

      if (!id) {
        throw new Error('Site ID is required for editing');
      }

      const res = await axiosInstance.put(`/editSite/${id}`, updateData);

      if (res.data.success) {
        setSuccess(true);
        return { success: true, site: res.data.site };
      } else {
        const errorObj = {
          message: res.data.message || 'Failed to update site',
          errors: res.data.errors
        };
        setError(errorObj);
        return { success: false, message: errorObj.message };
      }
    } catch (err) {
      const errorObj = {
        message: err.response?.data?.message || 'Failed to update site',
        details: err.response?.data?.error || err.message,
        errors: err.response?.data?.errors
      };
      setError(errorObj);
      return { success: false, message: errorObj.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { editSite, loading, error, success, reset };
};

export const useGetAllSites = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllSites = useCallback(
    async ({ status, startDate, endDate, type } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/getAllsites', {
          params: {
            status: status || undefined,
            page,
            limit,
            startDate,
            endDate,
            type,
          },
        });

        const responseData = response.data;

        const sitesData = responseData.sites || [];
        const countData = responseData.totalSites || sitesData.length || 0;

        setSites(sitesData);
        setTotalCount(countData);
        setTotalPages(responseData.totalPages || 1);

        return { success: true, sites: sitesData, totalCount: countData };
      } catch (err) {
        const errorObj = {
          message: err.response?.data?.message || err.message || 'Failed to fetch sites',
          details: err.response?.data?.error || err.response?.data?.details,
          status: err.response?.status,
        };
        setError(errorObj);
        console.error('API Error:', err);
        return { success: false, message: errorObj.message };
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  const reset = useCallback(() => {
    setSites([]);
    setTotalCount(0);
    setTotalPages(0);
    setError(null);
  }, []);

  const updateSiteInList = useCallback((updatedSite) => {
    setSites((prevSites) =>
      prevSites.map((site) =>
        site._id === updatedSite._id || site.id === updatedSite.id
          ? { ...site, ...updatedSite }
          : site
      )
    );
  }, []);

  const addSiteToList = useCallback((newSite) => {
    setSites((prevSites) => [...prevSites, newSite]);
    setTotalCount((prevCount) => prevCount + 1);
  }, []);

  const removeSiteFromList = useCallback((siteId) => {
    setSites((prevSites) => prevSites.filter((site) => site._id !== siteId && site.id !== siteId));
    setTotalCount((prevCount) => Math.max(0, prevCount - 1));
  }, []);

  return {
    sites,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalCount,
    totalPages,
    getAllSites,
    reset,
    updateSiteInList,
    addSiteToList,
    removeSiteFromList,
  };
};




export const useGetAllGenaral = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllSites = useCallback(
    async ({ status, startDate, endDate, type } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/getAllGenaral', {
          params: {
            status: status || undefined,
            page,
            limit,
            startDate,
            endDate,
            type,
          },
        });

        const responseData = response.data;

        const sitesData = responseData.sites || [];
        const countData = responseData.totalSites || sitesData.length || 0;

        setSites(sitesData);
        setTotalCount(countData);
        setTotalPages(responseData.totalPages || 1);

        return { success: true, sites: sitesData, totalCount: countData };
      } catch (err) {
        const errorObj = {
          message: err.response?.data?.message || err.message || 'Failed to fetch sites',
          details: err.response?.data?.error || err.response?.data?.details,
          status: err.response?.status,
        };
        setError(errorObj);
        console.error('API Error:', err);
        return { success: false, message: errorObj.message };
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  const reset = useCallback(() => {
    setSites([]);
    setTotalCount(0);
    setTotalPages(0);
    setError(null);
  }, []);

  const updateSiteInList = useCallback((updatedSite) => {
    setSites((prevSites) =>
      prevSites.map((site) =>
        site._id === updatedSite._id || site.id === updatedSite.id
          ? { ...site, ...updatedSite }
          : site
      )
    );
  }, []);

  const addSiteToList = useCallback((newSite) => {
    setSites((prevSites) => [...prevSites, newSite]);
    setTotalCount((prevCount) => prevCount + 1);
  }, []);

  const removeSiteFromList = useCallback((siteId) => {
    setSites((prevSites) => prevSites.filter((site) => site._id !== siteId && site.id !== siteId));
    setTotalCount((prevCount) => Math.max(0, prevCount - 1));
  }, []);

  return {
    sites,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalCount,
    totalPages,
    getAllSites,
    reset,
    updateSiteInList,
    addSiteToList,
    removeSiteFromList,
  };
};



export const useGetSiteById = () => {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSiteById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setSite(null);

    try {
      const response = await axiosInstance.get(`/getSiteById/${id}`);
      const responseData = response.data;

      if (responseData.success) {
        setSite(responseData.site);
        return { success: true, site: responseData.site };
      } else {
        setError({ message: responseData.message || 'Failed to fetch site' });
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch site',
        details: err.response?.data?.message || err.message,
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setSite(null);
    setError(null);
  };

  return { site, loading, error, getSiteById, reset };
};

export const useUpdateSiteStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateSiteStatus = useCallback(async (siteId, status) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!siteId) {
        throw new Error('Site ID is required');
      }

      const res = await axiosInstance.put(`/site/status/${siteId}`, { status });

      if (res.data.success) {
        setSuccess(true);
        return { success: true, site: res.data.site };
      } else {
        const errorObj = {
          message: res.data.message || 'Failed to update site status',
          errors: res.data.errors
        };
        setError(errorObj);
        return { success: false, message: errorObj.message };
      }
    } catch (err) {
      const errorObj = {
        message: err.response?.data?.message || 'Failed to update site status',
        details: err.response?.data?.error || err.message,
        errors: err.response?.data?.errors
      };
      setError(errorObj);
      return { success: false, message: errorObj.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { updateSiteStatus, loading, error, success, reset };
};

export const useDeleteSite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteSite = useCallback(async (siteId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!siteId) {
        throw new Error('Site ID is required');
      }

      const res = await axiosInstance.delete(`/deleteSite/${siteId}`);

      if (res.data.success) {
        setSuccess(true);
        return { success: true, deletedSite: res.data.deletedSite };
      } else {
        const errorObj = {
          message: res.data.message || 'Failed to delete site',
          errors: res.data.errors
        };
        setError(errorObj);
        return { success: false, message: errorObj.message };
      }
    } catch (err) {
      const errorObj = {
        message: err.response?.data?.message || 'Failed to delete site',
        details: err.response?.data?.error || err.message,
        errors: err.response?.data?.errors
      };
      setError(errorObj);
      return { success: false, message: errorObj.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { deleteSite, loading, error, success, reset };
};

export const useDeleteSiteIncome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteIncome = useCallback(async (incomeId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!incomeId) {
        throw new Error('Income ID is required');
      }

      const res = await axiosInstance.delete(`/siteincome/delete/${incomeId}`);

      if (res.data.success) {
        setSuccess(true);
        return { success: true, deletedIncome: res.data.deletedIncome };
      } else {
        const errorObj = {
          message: res.data.message || 'Failed to delete income',
          errors: res.data.errors
        };
        setError(errorObj);
        return { success: false, message: errorObj.message };
      }
    } catch (err) {
      const errorObj = {
        message: err.response?.data?.message || 'Failed to delete income',
        details: err.response?.data?.error || err.message,
        errors: err.response?.data?.errors
      };
      setError(errorObj);
      return { success: false, message: errorObj.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { deleteIncome, loading, error, success, reset };
};


export const useGetSiteOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSiteOverview = useCallback(async (siteId, startDate, endDate, type, status) => {
    setLoading(true);
    setError(null);
    setOverview(null);

    try {
      let url = `site/overview/${siteId}`;
      const params = new URLSearchParams();

      // Add all filter parameters
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (type) params.append('type', type);
      if (status) params.append('status', status);

      if (params.toString()) url += `?${params.toString()}`;

      const response = await axiosInstance.get(url);
      const responseData = response.data;

      if (responseData.success) {
        setOverview(responseData);
        return { success: true, overview: responseData };
      } else {
        setError({ message: responseData.message || 'Failed to fetch site overview' });
        toast.error(responseData.message || 'Failed to fetch site overview');
        return { success: false };
      }
    } catch (err) {
      setError({
        message: 'Failed to fetch site overview',
        details: err.response?.data?.message || err.message,
      });
      toast.error(err.response?.data?.message || err.message || 'Failed to fetch site overview');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setOverview(null);
    setError(null);
  };

  return { overview, loading, error, getSiteOverview, reset };
};
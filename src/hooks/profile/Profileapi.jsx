import { useState, useCallback } from 'react';
import axiosInstance from '../api';




export const useSignin = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const signin = useCallback(async ({ email, password }) => {
        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const response = await axiosInstance.post('/login', { email, password });

            if (response.data.success) {
                setUserData(response.data.user);
                localStorage.setItem('adminToken', response.data.token);
                return { success: true, message: 'Login successful', user: response.data.user };
            } else {
                const msg = response.data.message || 'Signin failed.';
                setError(msg);
                return { success: false, message: msg };
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'An error occurred while signing in.';
            setError(msg);
            return { success: false, message: msg };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        signin,
        loading,
        userData,
        error,
    };
};

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const resetPassword = useCallback(async ({ userId, newPassword }) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await axiosInstance.put(`/resetPassword/${userId}`, {
                password: newPassword,
            });

            if (response.data.success) {
                setSuccessMessage(response.data.message || 'Password reset successfully.');
            } else {
                setError(response.data.message || 'Failed to reset password.');
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setError(err.response?.data?.message || 'An error occurred while resetting the password.');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        resetPassword,
        loading,
        successMessage,
        error,
    };
};

"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        if (typeof window !== 'undefined') { // Ensure code is running on the client side
            const token = localStorage.getItem('token') || Cookies.get('token');
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
            return token ? { token, user } : null;
        }
        return null;
    });

    const login = async (whatsappNumber, otp) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', {
                whatsappNumber,
                otp
            });
            const { token, user } = response.data;
            setAuthState({ token, user });
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                Cookies.set('token', token);
                Cookies.set('user', JSON.stringify(user));
            }
        } catch (error) {
            console.error("Login error:", error);
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    const logout = () => {
        setAuthState(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            Cookies.remove('token');
            Cookies.remove('user');
        }
    };

    const fetchUserProfile = async () => {
        if (!authState?.token) return;
        try {
            const response = await axios.get('http://localhost:5000/api/me', {
                headers: { Authorization: `Bearer ${authState.token}` },
            });
            setAuthState(prev => ({ ...prev, user: response.data }));
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Fetch profile error:", error);
        }
    };

    const updateUserProfile = async (updatedData) => {
        if (!authState?.token) return;
        try {
            const response = await axios.put('http://localhost:5000/api/user/profile', updatedData, {
                headers: { Authorization: `Bearer ${authState.token}` },
            });
            setAuthState(prev => ({ ...prev, user: response.data }));
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Update profile error:", error);
            throw new Error(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, fetchUserProfile, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

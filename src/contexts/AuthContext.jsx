import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginAPI, registerAPI, meAPI } from '../services/allAPI';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    };
                    const res = await meAPI(reqHeader);
                    if (res.status === 200 && res.data.success) {
                        setUser(res.data.data);
                    } else {
                        sessionStorage.removeItem('token');
                        setUser(null);
                    }
                } catch (error) {
                    sessionStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await loginAPI({ email, password });
            if (res.status === 200 && res.data.success) {
                sessionStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true };
            } else {
                return { success: false, error: res.response?.data?.message || res.data?.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, error: 'Server error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await registerAPI({ name, email, password });
            if (res.status === 201 && res.data.success) {
                sessionStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true };
            } else {
                return { success: false, error: res.response?.data?.message || res.data?.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, error: 'Server error' };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

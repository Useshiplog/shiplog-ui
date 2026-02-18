import { SYSTEM1_API_URL } from "../../constants/constants";

export const signup = async (email, password) => {
    if (!SYSTEM1_API_URL) {
        throw new Error('System 1 API URL is not configured. Please set VITE_SYSTEM1_API_URL environment variable.');
    }

    const response = await fetch(`${SYSTEM1_API_URL}/v1/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
    }
    return data;
};

export const login = async (email, password) => {
    if (!SYSTEM1_API_URL) {
        throw new Error('System 1 API URL is not configured. Please set VITE_SYSTEM1_API_URL environment variable.');
    }

    const response = await fetch(`${SYSTEM1_API_URL}/v1/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data;
};

export const logout = () => {
    // Session is managed via HttpOnly cookies by the backend
};


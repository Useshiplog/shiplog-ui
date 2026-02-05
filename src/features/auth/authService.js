const API_URL = 'http://localhost:5001/v1/user';

export const signup = async (email, password) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
    }
    return data;
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    if (data.data && data.data.external_id) {
        localStorage.setItem('external_id', data.data.external_id);
    }

    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('external_id');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getExternalId = () => {
    return localStorage.getItem('external_id');
};

const API_URL = 'http://localhost:5000/api';

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },

    getMe: async (token) => {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    },

    updateProfile: async (token, userData) => {
        const response = await fetch(`${API_URL}/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
};

// Content API
export const contentAPI = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.classId) params.append('classId', filters.classId);
        if (filters.board) params.append('board', filters.board);
        if (filters.type) params.append('type', filters.type);
        if (filters.subject) params.append('subject', filters.subject);
        if (filters.search) params.append('search', filters.search);

        const response = await fetch(`${API_URL}/content?${params}`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/content/${id}`);
        return response.json();
    },

    getPDFs: async (classId, board) => {
        const params = new URLSearchParams({ type: 'pdf' });
        if (classId) params.append('classId', classId);
        if (board) params.append('board', board);

        const response = await fetch(`${API_URL}/content?${params}`);
        return response.json();
    },

    getVideos: async (classId, board) => {
        const params = new URLSearchParams({ type: 'video' });
        if (classId) params.append('classId', classId);
        if (board) params.append('board', board);

        const response = await fetch(`${API_URL}/content?${params}`);
        return response.json();
    }
};

// Pricing API
export const pricingAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/pricing`);
        return response.json();
    },

    getByClass: async (classId) => {
        const response = await fetch(`${API_URL}/pricing/${classId}`);
        return response.json();
    }
};

// Orders API
export const ordersAPI = {
    create: async (token, orderData) => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        return response.json();
    },

    getMyOrders: async (token) => {
        const response = await fetch(`${API_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.json();
    }
};

export default { authAPI, contentAPI, pricingAPI, ordersAPI };

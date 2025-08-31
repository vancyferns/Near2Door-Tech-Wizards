const API_BASE_URL = 'https://jubilant-space-disco-r7qgx45qprcxq56-5000.app.github.dev';

const api = {
  // Authentication
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { response, data };
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { response, data };
  },

  // Products
  getProducts: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  },

  addProduct: async (shopId, productData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  },

  updateProduct: async (shopId, productId, updatedData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  },

  deleteProduct: async (shopId, productId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.ok;
  },
  
  // New function to securely fetch user data from the backend
  getUserById: async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  },
};

export default api;
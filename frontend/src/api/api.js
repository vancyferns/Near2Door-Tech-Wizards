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

  // Shops
  getShops: async () => {
    const response = await fetch(`${API_BASE_URL}/shops`);
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch shops');
  },
  
  getShopProfile: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`);
    if (response.ok) {
      return response.json();
    }
    return null;
  },

  updateShopProfile: async (shopId, profileData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to update shop profile');
  },

  getShopSalesSummary: async (shopId) => {
    console.log(`Fetching sales summary for shop ID: ${shopId}`);
    return {
      totalOrders: 15,
      totalProductsSold: 250,
      totalRevenue: 5000
    };
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
  
  // Image Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  },
};

// --- Delivery Agent APIs ---
api.getAgentOrders = async (agentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("Error fetching agent orders:", error);
    return { response: { ok: false }, data: { error: "Network error" } };
  }
};

api.getAgentEarnings = async (agentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/earnings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("Error fetching agent earnings:", error);
    return { response: { ok: false }, data: { error: "Network error" } };
  }
};

api.updateDeliveryStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/delivery-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("Error updating delivery status:", error);
    return { response: { ok: false }, data: { error: "Network error" } };
  }
};

export default api;
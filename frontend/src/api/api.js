const API_BASE_URL = 'https://jubilant-space-disco-r7qgx45qprcxq56-5000.app.github.dev';

const api = {
  // ---------------------
  // Authentication
  // ---------------------
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { response, data };
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { response, data };
  },

  getUserById: async (userId, token) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) return response.json();
    return null;
  },

  // ---------------------
  // Shops
  // ---------------------
  getShops: async () => {
    const response = await fetch(`${API_BASE_URL}/shops`);
    if (response.ok) return response.json();
    throw new Error('Failed to fetch shops');
  },

  getShopProfile: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`);
    if (response.ok) return response.json();
    return null;
  },

  updateShopProfile: async (shopId, profileData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(profileData),
    });
    if (response.ok) return response.json();
    throw new Error('Failed to update shop profile');
  },

  getShopSalesSummary: async (shopId) => {
    console.log(`Fetching sales summary for shop ID: ${shopId}`);
    return { totalOrders: 15, totalProductsSold: 250, totalRevenue: 5000 };
  },

  // ---------------------
  // Shop Orders
  // ---------------------
  getShopOrders: async (shopId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/shops/${shopId}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error("Failed to fetch shop orders");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching shop orders:", error);
      return [];
    }
  },

  // ---------------------
  // Products
  // ---------------------
  getProducts: async (shopId) => {
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`);
    return response.json();
  },

  addProduct: async (shopId, productData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  updateProduct: async (shopId, productId, updatedData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  },

  deleteProduct: async (shopId, productId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shops/${shopId}/products/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.ok;
  },

  // ---------------------
  // Image Upload
  // ---------------------
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${API_BASE_URL}/upload/image`, { method: 'POST', body: formData });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  },

  // ---------------------
  // Delivery Agent APIs
  // ---------------------
  getAgents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch agents');
      return response.json();
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  },

  getAgentOrders: async (agentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/orders`, { method: "GET", headers: { "Content-Type": "application/json" } });
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error("Error fetching agent orders:", error);
      return { response: { ok: false }, data: { error: "Network error" } };
    }
  },

  getAgentEarnings: async (agentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents/${agentId}/earnings`, { method: "GET", headers: { "Content-Type": "application/json" } });
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error("Error fetching agent earnings:", error);
      return { response: { ok: false }, data: { error: "Network error" } };
    }
  },

  updateDeliveryStatus: async (orderId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/delivery-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error("Error updating delivery status:", error);
      return { response: { ok: false }, data: { error: "Network error" } };
    }
  },

  // ---------------------
  // Customer Orders
  // ---------------------
  placeOrder: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return { ok: response.ok, data };
    } catch (error) {
      console.error("Order placement failed:", error);
      return { ok: false, data: { error: "Network error" } };
    }
  },

  getCustomerOrders: async (customerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}/orders`, { method: "GET", headers: { "Content-Type": "application/json" } });
      if (!response.ok) throw new Error("Failed to fetch customer orders");
      return response.json();
    } catch (error) {
      console.error("Error fetching customer orders:", error);
      return [];
    }
  },

  updateOrderStatus: async (shopId, orderId, status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/shops/${shopId}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return response.json();
    } catch (err) {
      console.error('Error updating order status:', err);
      throw err;
    }
  },

  // ---------------------
  // Optional: Helper to fetch customer geolocation
  // ---------------------
  getCustomerLocation: () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }),
};

// ---------------------
// Helper function outside of api
// ---------------------
export const fetchShopProfile = async (shopId, setShopProfile, setValues) => {
  try {
    const res = await api.getShopProfile(shopId);
    const data = res?.shop || res;

    if (data) {
      setShopProfile(data);
      setValues({
        name: data.name || "",
        type: data.type || "",
        location: data.location || "",
        status: data.status || "closed",
        profileImage: data.profileImage || "",
      });
    }
  } catch (e) {
    console.error("Failed to fetch shop profile:", e);
  }
};

export default api;

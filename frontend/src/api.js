// --- API Client Layer ---
const BASE_URL = 'https://60d48e5f-3695-416b-ba93-ee978e889583-00-1d75aq796m227.janeway.replit.dev:5000';

// Recursive function to transform snake_case keys to camelCase and convert _id to id
function transformKeys(data) {
  if (Array.isArray(data)) {
    return data.map(item => transformKeys(item));
  }
  if (typeof data === 'object' && data !== null) {
    const transformed = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let newKey = key;
        if (key === '_id') {
          newKey = 'id';
        } else {
          // Convert snake_case to camelCase
          newKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        }
        transformed[newKey] = transformKeys(data[key]);
      }
    }
    return transformed;
  }
  return data;
}

async function callApi(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  const transformedData = transformKeys(data);

  return { status: response.status, data: transformedData, message: data.error || data.message };
}

export const api = {
  // --- Auth Endpoints ---
  authRegisterPost: (body) => callApi('/auth/register', 'POST', {
    name: body.username,
    email: body.email,
    password: body.password,
    role: body.role
  }),
  authLoginPost: (body) => callApi('/auth/login', 'POST', body),

  // --- Customer Endpoints ---
  shopsGet: () => callApi('/shops'),
  shopsShopIdGet: (shopId) => callApi(`/shops/${shopId}`),
  ordersPost: (body, token) => callApi('/orders', 'POST', body, token),
  usersUserIdOrdersGet: (userId, token) => callApi(`/users/${userId}/orders`, 'GET', null, token),

  // --- Shop Owner Endpoints ---
  shopsShopIdOrdersGet: (shopId, token) => callApi(`/shops/${shopId}/orders`, 'GET', null, token),
  shopsShopIdOrdersOrderIdStatusPut: (shopId, orderId, body, token) => callApi(`/shops/${shopId}/orders/${orderId}/status`, 'PUT', body, token),
  shopsShopIdProductsGet: (shopId, token) => callApi(`/shops/${shopId}/products`, 'GET', null, token),
  shopsShopIdProductsPost: (shopId, body, token) => callApi(`/shops/${shopId}/products`, 'POST', body, token),
  shopsShopIdProductsProductIdPut: (shopId, productId, body, token) => callApi(`/shops/${shopId}/products/${productId}`, 'PUT', body, token),

  // --- Delivery Agent Endpoints (Placeholders) ---
  agentsAgentIdOrdersGet: (agentId, token) => callApi(`/agents/${agentId}/orders`, 'GET', null, token),
  ordersOrderIdDeliveryStatusPut: (orderId, body, token) => callApi(`/orders/${orderId}/delivery-status`, 'PUT', body, token),
  agentsAgentIdEarningsGet: (agentId, token) => callApi(`/agents/${agentId}/earnings`, 'GET', null, token),

  // --- Admin Endpoints ---
  adminAuthLoginPost: (body) => callApi('/admin/auth/login', 'POST', body),
  adminShopsGet: (status, token) => callApi(`/admin/shops?status=${status}`, 'GET', null, token),
  adminShopsShopIdApprovePut: (shopId, token) => callApi(`/admin/shops/${shopId}/approve`, 'PUT', null, token),
  adminOrdersGet: (token) => callApi('/admin/orders', 'GET', null, token),
  adminAgentsGet: (token) => callApi('/admin/agents', 'GET', null, token),
  adminFinancesGet: (token) => callApi('/admin/finances', 'GET', null, token),
};
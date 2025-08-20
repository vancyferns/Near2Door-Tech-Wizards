import React, { useState, useEffect, createContext, useContext } from 'react';

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

const api = {
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
  adminAuthLoginPost: (body) => callApi('/admin/auth/login', 'POST', body), // Note: contract has username, backend has email
  adminShopsGet: (status, token) => callApi(`/admin/shops?status=${status}`, 'GET', null, token),
  adminShopsShopIdApprovePut: (shopId, token) => callApi(`/admin/shops/${shopId}/approve`, 'PUT', null, token),
  adminOrdersGet: (token) => callApi('/admin/orders', 'GET', null, token),
  adminAgentsGet: (token) => callApi('/admin/agents', 'GET', null, token),
  adminFinancesGet: (token) => callApi('/admin/finances', 'GET', null, token),
};

// --- Global state and context setup ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('near2door_userId') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('near2door_userRole') || null);
  const [userToken, setUserToken] = useState(localStorage.getItem('near2door_userToken') || null);
  const [userShopId, setUserShopId] = useState(localStorage.getItem('near2door_userShopId') || null);

  const setAuthData = (id, role, token, shopId = null) => {
    setUserId(id);
    setUserRole(role);
    setUserToken(token);
    localStorage.setItem('near2door_userId', id);
    localStorage.setItem('near2door_userRole', role);
    localStorage.setItem('near2door_userToken', token);
    if (shopId) {
      setUserShopId(shopId);
      localStorage.setItem('near2door_userShopId', shopId);
    }
  };

  const clearAuthData = () => {
    setUserId(null);
    setUserRole(null);
    setUserToken(null);
    setUserShopId(null);
    localStorage.removeItem('near2door_userId');
    localStorage.removeItem('near2door_userRole');
    localStorage.removeItem('near2door_userToken');
    localStorage.removeItem('near2door_userShopId');
  };

  return (
    <AppContext.Provider value={{ userId, userRole, userToken, userShopId, setAuthData, clearAuthData }}>
      {children}
    </AppContext.Provider>
  );
};

// --- React Components ---

const Header = ({ onNavigate }) => {
  const { userRole, clearAuthData } = useContext(AppContext);
  const handleLogout = () => {
    clearAuthData();
    onNavigate({ name: 'home' });
  };
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 cursor-pointer"
          onClick={() => onNavigate({ name: 'home' })}>
          Near2Door
        </h1>
        <nav className="flex items-center space-x-4">
          {!userRole && (
            <>
              <button
                onClick={() => onNavigate({ name: 'login' })}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate({ name: 'register' })}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all"
              >
                Register
              </button>
            </>
          )}
          {userRole && (
            <>
              <span className="text-gray-300">Welcome, {userRole}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const CustomerLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Customer Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'shops' })} className="w-full text-left p-2 rounded hover:bg-gray-300">All Shops</button></li>
        <li><button onClick={() => onNavigate({ name: 'my-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">My Orders</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

const ShopOwnerLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Shop Owner Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'shop-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View Orders</button></li>
        <li><button onClick={() => onNavigate({ name: 'shop-products' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Manage Products</button></li>
        <li><button onClick={() => onNavigate({ name: 'add-product' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Add New Product</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

const AdminLayout = ({ onNavigate, children }) => (
  <div className="flex">
    <nav className="w-1/4 bg-gray-200 p-4 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Admin Menu</h3>
      <ul className="space-y-2">
        <li><button onClick={() => onNavigate({ name: 'admin-shops' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Manage Shops</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-orders' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View All Orders</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-agents' })} className="w-full text-left p-2 rounded hover:bg-gray-300">View Agents</button></li>
        <li><button onClick={() => onNavigate({ name: 'admin-finances' })} className="w-full text-left p-2 rounded hover:bg-gray-300">Finances</button></li>
      </ul>
    </nav>
    <main className="w-3/4 p-4">{children}</main>
  </div>
);

// --- Customer Pages ---
const CustomerShopListPage = ({ onNavigate }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.shopsGet().then(res => {
      setShops(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading shops...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Available Shops</h3>
      {shops.length === 0 ? (
        <p>No shops available.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map(shop => (
            <li key={shop.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onNavigate({ name: 'shop-detail', params: { shopId: shop.id } })}>
              <div>
                <p className="font-semibold text-lg">{shop.name}</p>
                <p className="text-sm text-gray-600">{shop.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full text-white ${shop.status === 'open' ? 'bg-green-500' : 'bg-red-500'}`}>
                {shop.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ShopDetailAndProductPage = ({ shopId }) => {
  const { userToken } = useContext(AppContext);
  const [shopDetails, setShopDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.shopsShopIdGet(shopId).then(res => {
      setShopDetails(res.data);
      setLoading(false);
    });
  }, [shopId, userToken]);

  if (loading) return <p>Loading shop details...</p>;
  if (!shopDetails) return <p>Shop not found.</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">{shopDetails.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{shopDetails.description}</p>
      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2">Products</h4>
        <ul className="space-y-2">
          {shopDetails.products.length === 0 ? <p>No products found.</p> : shopDetails.products.map(product => (
            <li key={product.id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
              <span className="font-medium">{product.name}</span>
              <span className="text-sm text-gray-500">₹{product.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CustomerOrdersPage = () => {
  const { userId, userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    api.usersUserIdOrdersGet(userId, userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userId, userToken]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- Shop Owner Pages ---
const ShopOwnerOrdersPage = () => {
  const { userShopId, userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userShopId) return;
    api.shopsShopIdOrdersGet(userShopId, userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userShopId, userToken]);

  const handleUpdateStatus = (orderId, status) => {
    api.shopsShopIdOrdersOrderIdStatusPut(userShopId, orderId, { status }, userToken).then(() => {
      api.shopsShopIdOrdersGet(userShopId, userToken).then(res => setOrders(res.data));
    });
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shop Orders</h3>
      {orders.length === 0 ? (
        <p>No new orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
              </div>
              {order.status === 'pending' && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'accepted')}
                    className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                    className="px-3 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ShopOwnerProductsPage = () => {
  const { userShopId, userToken } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userShopId) return;
    api.shopsShopIdProductsGet(userShopId, userToken).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [userShopId, userToken]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shop Products</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddProductPage = ({ onNavigate }) => {
  const { userShopId, userToken } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userShopId) return;
    api.shopsShopIdProductsPost(userShopId, { name, description, price, stock }, userToken).then(res => {
      if (res.status === 201) {
        onNavigate({ name: 'shop-products' });
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Admin Pages ---
const AdminShopsPage = () => {
  const { userToken } = useContext(AppContext);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminShopsGet(null, userToken).then(res => {
      setShops(res.data);
      setLoading(false);
    });
  }, [userToken]);

  const handleApproveShop = (shopId) => {
    api.adminShopsShopIdApprovePut(shopId, userToken).then(() => {
      api.adminShopsGet(null, userToken).then(res => setShops(res.data));
    });
  };

  if (loading) return <p>Loading shops...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Shops</h3>
      {shops.length === 0 ? (
        <p>No shops found.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map(shop => (
            <li key={shop.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{shop.name}</p>
                <p className="text-sm text-gray-600">Status: {shop.status}</p>
                <p className="text-sm text-gray-600">Owner ID: {shop.ownerId}</p>
              </div>
              {shop.status === 'pending' && (
                <button
                  onClick={() => handleApproveShop(shop.id)}
                  className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminOrdersPage = () => {
  const { userToken } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminOrdersGet(userToken).then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">All Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
                <p className="text-sm text-gray-600">Customer ID: {order.customerId}</p>
                <p className="text-sm text-gray-600">Shop ID: {order.shopId}</p>
                <p className="text-sm text-gray-600">Agent ID: {order.agentId}</p>
              </div>
              <span className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white">
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminAgentsPage = () => {
  const { userToken } = useContext(AppContext);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminAgentsGet(userToken).then(res => {
      setAgents(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading agents...</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Delivery Agents</h3>
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul className="space-y-4">
          {agents.map(agent => (
            <li key={agent.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{agent.name}</p>
                <p className="text-sm text-gray-600">{agent.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminFinancesPage = () => {
  const { userToken } = useContext(AppContext);
  const [finances, setFinances] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.adminFinancesGet(userToken).then(res => {
      setFinances(res.data);
      setLoading(false);
    });
  }, [userToken]);

  if (loading) return <p>Loading financial data...</p>;
  if (!finances) return <p>No financial data available.</p>;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{finances.totalOrders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">₹{finances.totalRevenue}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Commission</p>
          <p className="text-2xl font-bold">₹{finances.totalCommission}</p>
        </div>
      </div>
    </div>
  );
};

// --- Authentication Pages ---
const LoginPage = ({ onNavigate }) => {
  const { setAuthData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const body = { email, password };
    const res = await api.authLoginPost(body);

    if (res.status === 200) {
      const { user, token } = res.data;

      let shopId = null;
      if (user.role === 'shop') {
        const shopsRes = await api.shopsGet();
        const shop = shopsRes.data.find(s => s.ownerId === user.id);
        if (shop) shopId = shop.id;
      }
      setAuthData(user.id, user.role, token, shopId);
      onNavigate({ name: 'home' });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button onClick={() => onNavigate({ name: 'register' })} className="text-blue-500 hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

const RegisterPage = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    // Only allow registration for the 'customer' role for security
    const body = { username, email, password, role: 'customer' };

    const res = await api.authRegisterPost(body);

    if (res.status === 201) {
      onNavigate({ name: 'login' });
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-all"
          >
            Register as Customer
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <button onClick={() => onNavigate({ name: 'login' })} className="text-teal-500 hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

// --- Main App Component and Router ---
const App = () => {
  const { userRole, userId } = useContext(AppContext);
  const [route, setRoute] = useState({ name: 'home', params: {} });

  // Reset route on logout
  useEffect(() => {
    if (!userRole) {
      setRoute({ name: 'home', params: {} });
    }
  }, [userRole]);

  const renderPage = () => {
    switch (route.name) {
      case 'login': return <LoginPage onNavigate={setRoute} />;
      case 'register': return <RegisterPage onNavigate={setRoute} />;
      case 'shops': return <CustomerLayout onNavigate={setRoute}><CustomerShopListPage onNavigate={setRoute} /></CustomerLayout>;
      case 'shop-detail': return <CustomerLayout onNavigate={setRoute}><ShopDetailAndProductPage shopId={route.params.shopId} onNavigate={setRoute} /></CustomerLayout>;
      case 'my-orders': return <CustomerLayout onNavigate={setRoute}><CustomerOrdersPage /></CustomerLayout>;
      case 'shop-orders': return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerOrdersPage /></ShopOwnerLayout>;
      case 'shop-products': return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerProductsPage /></ShopOwnerLayout>;
      case 'add-product': return <ShopOwnerLayout onNavigate={setRoute}><AddProductPage onNavigate={setRoute} /></ShopOwnerLayout>;
      case 'admin-shops': return <AdminLayout onNavigate={setRoute}><AdminShopsPage /></AdminLayout>;
      case 'admin-orders': return <AdminLayout onNavigate={setRoute}><AdminOrdersPage /></AdminLayout>;
      case 'admin-agents': return <AdminLayout onNavigate={setRoute}><AdminAgentsPage /></AdminLayout>;
      case 'admin-finances': return <AdminLayout onNavigate={setRoute}><AdminFinancesPage /></AdminLayout>;
      case 'home':
        switch (userRole) {
          case 'customer': return <CustomerLayout onNavigate={setRoute}><CustomerShopListPage onNavigate={setRoute} /></CustomerLayout>;
          case 'shop': return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerOrdersPage /></ShopOwnerLayout>;
          case 'admin': return <AdminLayout onNavigate={setRoute}><AdminShopsPage /></AdminLayout>;
          default:
            return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Near2Door Home</h2>
                <p className="text-lg text-gray-600 mb-6">Your local delivery app.</p>
                <p className="text-sm text-gray-500">Please log in to continue.</p>
              </div>
            );
        }
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
      <Header onNavigate={setRoute} />
      <div className="p-4">
        {renderPage()}
      </div>
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Near2Door. All rights reserved. User ID: {userId || 'Not Logged In'}
        </p>
      </footer>
    </div>
  );
};

export default function Root() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
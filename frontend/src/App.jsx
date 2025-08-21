import React, { useState, useEffect, createContext, useContext } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutUsPage from "./components/AboutUsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CustomerLayout from "./components/CustomerLayout";
import ShopOwnerLayout from "./components/ShopOwnerLayout";
import AdminLayout from "./components/AdminLayout";
import CustomerShopListPage from "./components/CustomerShopListPage";
import ShopDetailAndProductPage from "./components/ShopDetailAndProductPage";
import CustomerOrdersPage from "./components/CustomerOrdersPage";
import ShopOwnerOrdersPage from "./components/ShopOwnerOrdersPage";
import ShopOwnerProductsPage from "./components/ShopOwnerProductsPage";
import AddProductPage from "./components/AddProductPage";
import AdminShopsPage from "./components/AdminShopsPage";
import AdminOrdersPage from "./components/AdminOrdersPage";
import AdminAgentsPage from "./components/AdminAgentsPage";
import AdminFinancesPage from "./components/AdminFinancesPage";
import AdminDashboardPage from "./components/AdminDashboardPage";
import { api } from "./api"

// --- Global state and context setup ---
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("near2door_userId") || null);
  const [userRole, setUserRole] = useState(localStorage.getItem("near2door_userRole") || null);
  const [userToken, setUserToken] = useState(localStorage.getItem("near2door_userToken") || null);
  const [userShopId, setUserShopId] = useState(localStorage.getItem("near2door_userShopId") || null);

  const setAuthData = (id, role, token, shopId = null) => {
    setUserId(id);
    setUserRole(role);
    setUserToken(token);
    localStorage.setItem("near2door_userId", id);
    localStorage.setItem("near2door_userRole", role);
    localStorage.setItem("near2door_userToken", token);
    if (shopId) {
      setUserShopId(shopId);
      localStorage.setItem("near2door_userShopId", shopId);
    }
  };

  const clearAuthData = () => {
    setUserId(null);
    setUserRole(null);
    setUserToken(null);
    setUserShopId(null);
    localStorage.removeItem("near2door_userId");
    localStorage.removeItem("near2door_userRole");
    localStorage.removeItem("near2door_userToken");
    localStorage.removeItem("near2door_userShopId");
  };

  return (
    <AppContext.Provider value={{ userId, userRole, userToken, userShopId, setAuthData, clearAuthData }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Main App Component and Router ---
const App = () => {
  const { userRole, userId } = useContext(AppContext);
  const [route, setRoute] = useState({ name: "home", params: {} });

  useEffect(() => {
    if (!userRole) {
      setRoute({ name: "home", params: {} });
    }
  }, [userRole]);

  const renderPage = () => {
    switch (route.name) {
      case "login": return <LoginPage onNavigate={setRoute} />;
      case "register": return <RegisterPage onNavigate={setRoute} />;
      case "about": return <AboutUsPage />;
      case "shops": return <CustomerLayout onNavigate={setRoute}><CustomerShopListPage onNavigate={setRoute} /></CustomerLayout>;
      case "shop-detail": return <CustomerLayout onNavigate={setRoute}><ShopDetailAndProductPage shopId={route.params.shopId} onNavigate={setRoute} /></CustomerLayout>;
      case "my-orders": return <CustomerLayout onNavigate={setRoute}><CustomerOrdersPage /></CustomerLayout>;
      case "shop-orders": return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerOrdersPage /></ShopOwnerLayout>;
      case "shop-products": return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerProductsPage /></ShopOwnerLayout>;
      case "add-product": return <ShopOwnerLayout onNavigate={setRoute}><AddProductPage onNavigate={setRoute} /></ShopOwnerLayout>;
      case "admin-shops": return <AdminLayout onNavigate={setRoute}><AdminShopsPage /></AdminLayout>;
      case "admin-orders": return <AdminLayout onNavigate={setRoute}><AdminOrdersPage /></AdminLayout>;
      case "admin-agents": return <AdminLayout onNavigate={setRoute}><AdminAgentsPage /></AdminLayout>;
      case "admin-finances": return <AdminLayout onNavigate={setRoute}><AdminFinancesPage /></AdminLayout>;
        case "admin-dashboard":
        return (
          <AdminLayout onNavigate={setRoute}>
            <AdminDashboardPage />
          </AdminLayout>
        );

      case "home":
        switch (userRole) {
          case "customer": return <CustomerLayout onNavigate={setRoute}><CustomerShopListPage onNavigate={setRoute} /></CustomerLayout>;
          case "shop": return <ShopOwnerLayout onNavigate={setRoute}><ShopOwnerOrdersPage /></ShopOwnerLayout>;
          case "admin": return <AdminLayout onNavigate={setRoute}><AdminShopsPage /></AdminLayout>;
          default: return <HomePage onNavigate={setRoute} />;
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
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen flex flex-col">
      {/* Shared Header */}
      <Header onNavigate={setRoute} />

      {/* Page content */}
      <main className="flex-grow p-4">
        {renderPage()}
      </main>

      {/* Shared Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Near2Door. All rights reserved. User ID: {userId || "Not Logged In"}
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

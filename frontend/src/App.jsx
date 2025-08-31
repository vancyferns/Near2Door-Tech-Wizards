import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Landing from './pages/Landing';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ShopDashboard from './pages/shop/ShopDashboard';
import ManageProducts from './pages/shop/ManageProducts';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import BrowseShops from './pages/customer/BrowseShops';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// --- Main App Component ---
function App() {
  const [page, setPage] = useState('landing');
  const { user, isAuthenticated, logout } = useAuth();

  const renderPage = () => {
    const userRole = user ? user.role : 'guest';
    const isProtected = ['shop-dashboard', 'manage-products', 'customer-dashboard', 'browse-shops', 'delivery-dashboard', 'admin-dashboard'].includes(page);
    
    if (isProtected && !isAuthenticated) {
      return <SignIn onNavigate={setPage} />;
    }
    
    const roleAccess = {
      'shop': ['shop-dashboard', 'manage-products'],
      'customer': ['customer-dashboard', 'browse-shops'],
      'delivery-agent': ['delivery-dashboard'],
      'admin': ['admin-dashboard'],
    };

    if (isProtected && !roleAccess[userRole]?.includes(page)) {
      if (userRole === 'shop') return <ShopDashboard onNavigate={setPage} />;
      if (userRole === 'customer') return <CustomerDashboard onNavigate={setPage} />;
      return <Landing onNavigate={setPage} />;
    }

    switch (page) {
      case 'landing': return <Landing onNavigate={setPage} />;
      case 'about': return <About />;
      case 'how-it-works': return <HowItWorks />;
      case 'signin': return <SignIn onNavigate={setPage} />;
      case 'signup': return <SignUp onNavigate={setPage} />;
      case 'shop-dashboard': return <ShopDashboard onNavigate={setPage} />;
      case 'manage-products': return <ManageProducts onNavigate={setPage} />;
      case 'customer-dashboard': return <CustomerDashboard onNavigate={setPage} />;
      case 'browse-shops': return <BrowseShops onNavigate={setPage} />;
      case 'delivery-dashboard': return <DeliveryDashboard onNavigate={setPage} />;
      case 'admin-dashboard': return <AdminDashboard onNavigate={setPage} />;
      default: return <Landing onNavigate={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-200 flex flex-col">
        <Header onNavigate={setPage} user={user} onLogout={logout} />
        <main className="flex-grow container mx-auto p-4 sm:p-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
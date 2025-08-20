import React from 'react';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      {/* Hero Section - 30% Yellow */}
      <div className="bg-yellow-400 py-16 px-4 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight">
            Near2Door
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-semibold text-gray-800">
            Where Every Home Matters.
          </p>
          <button
            onClick={() => onNavigate({ name: 'shops' })}
            className="mt-8 px-10 py-4 bg-gray-900 text-yellow-400 font-bold rounded-full shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            TRY NOW
          </button>
        </div>
      </div>

      {/* Who We Serve Section - 10% Black */}
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400">WHO WE SERVE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Customer Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/image_af2fab.png" alt="A person using a delivery app" className="h-24 w-auto mx-auto mb-4" />
              <h3 className="text-2xl font-bold mt-4 mb-2">Customers</h3>
              <p className="text-gray-400">
                Get your daily essentials delivered straight from your trusted local shops.
              </p>
            </div>
            {/* Delivery Agent Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/image_af2ca4.png" alt="A delivery agent on a scooter" className="h-24 w-auto mx-auto mb-4" />
              <h3 className="text-2xl font-bold mt-4 mb-2">Delivery Agents</h3>
              <p className="text-gray-400">
                Earn on your schedule. We empower local youth with flexible, dignified work.
              </p>
            </div>
            {/* Shop Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <img src="/image_af2cde.png" alt="A local shop front" className="h-24 w-auto mx-auto mb-4" />
              <h3 className="text-2xl font-bold mt-4 mb-2">Shops</h3>
              <p className="text-gray-400">
                Digitize your store in minutes – no apps, no tech stress. Serve more customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Near2Door Section - 60% White */}
      <div className="bg-white py-16 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">WHY Near2Door</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Trusted By Locals Card */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105">
              <span role="img" aria-label="trusted-icon" className="text-4xl text-yellow-500">🤝</span>
              <h3 className="text-2xl font-bold mt-4 mb-2 text-yellow-600">Trusted By Locals</h3>
              <p className="text-gray-600">
                Our unique approach means every time you order, you're placing your trust in someone from your community.
              </p>
            </div>
            {/* Cash & UPI Card */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105">
              <span role="img" aria-label="payment-icon" className="text-4xl text-yellow-500">💳</span>
              <h3 className="text-2xl font-bold mt-4 mb-2 text-yellow-600">Cash & UPI – Both Welcomed</h3>
              <p className="text-gray-600">
                We accept cash and all major UPI payments on delivery, offering seamless flexibility.
              </p>
            </div>
            {/* Community-Powered Card */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105">
              <span role="img" aria-label="community-icon" className="text-4xl text-yellow-500">🧑‍🤝‍🧑</span>
              <h3 className="text-2xl font-bold mt-4 mb-2 text-yellow-600">Community-Powered Delivery</h3>
              <p className="text-gray-600">
                Orders are fulfilled by a network of local youth, strengthening your community from the inside out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';

const Landing = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto text-center py-16 px-4 rounded-3xl bg-white shadow-xl mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Groceries, Essentials, and More — Delivered by People You Know.
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          Near2Door isn’t just a service; it’s a movement. We deliver with love, from people you know, right to your doorstep in minutes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => onNavigate('signup')}
            className="px-8 py-4 bg-lime-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1"
          >
            Get Started Today
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className="px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-gray-300 hover:-translate-y-1"
          >
            How It Works
          </button>
        </div>
      </div>
      
      {/* Who We Serve Section */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Who We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center text-lime-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Customers</h3>
            <p className="text-gray-600 text-center">
              Get your daily essentials delivered straight from your trusted local shops — without stepping out. Order from your favorite vendor, and we’ll bring it near to your door.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center text-lime-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.41 2h9.18a2 2 0 0 1 1.41.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M22 7H2"/><path d="M12 7v3"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Shops</h3>
            <p className="text-gray-600 text-center">
              Digitize your store in minutes — no apps, no tech stress. Serve more customers, track orders, and grow your reach across your area with a low monthly membership.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center text-lime-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6s1.5-2 4.5-2c3.5 0 4.5 3.5 4.5 3.5V9c0 1.5-1.5 1.5-3 1.5-1.5 0-3-1.5-4.5-3-1-1-4-1.5-6.5-.5-1.5 1-3 2.5-3 2.5v7"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Delivery Agents</h3>
            <p className="text-gray-600 text-center">
              Earn on your schedule. Whether you’re a student or someone looking for part-time work, Near2Door lets you deliver in your neighborhood and earn weekly.
            </p>
          </div>
        </div>
      </div>

      {/* Why Near2Door Section */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Why Near2Door
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg flex items-start space-x-4">
            <div className="flex-shrink-0 text-lime-600 text-4xl">
              <span className="font-extrabold">🤝</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Trusted By Locals</h3>
              <p className="text-gray-600">
                We’re not a faceless delivery app. Near2Door is built with your neighborhood in mind — your trusted local shops, your friendly delivery partners, your people. We believe in human-first connections and community-powered service.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg flex items-start space-x-4">
            <div className="flex-shrink-0 text-lime-600 text-4xl">
              <span className="font-extrabold">💳</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Cash & UPI — Both Welcomed</h3>
              <p className="text-gray-600">
                We understand that not everyone pays online. Whether you want to pay by UPI or prefer handing over cash at your door, Near2Door gives you the freedom to choose.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg flex items-start space-x-4">
            <div className="flex-shrink-0 text-lime-600 text-4xl">
              <span className="font-extrabold">📍</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Community-Powered Delivery</h3>
              <p className="text-gray-600">
                Our delivery agents are your neighbors — local youth and students looking to earn while serving their own community. This means faster, more reliable, and more personal deliveries.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg flex items-start space-x-4">
            <div className="flex-shrink-0 text-lime-600 text-4xl">
              <span className="font-extrabold">⭐</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">We Care About Community</h3>
              <p className="text-gray-600">
                Near2Door isn’t just a service, it’s a movement. To connect better, to support local. We believe in building a platform that supports small businesses and empowers young individuals.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final Call-to-Action */}
      <div className="w-full max-w-7xl mx-auto text-center py-12 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join our community of local shoppers, shops, and delivery agents today.
        </p>
        <button
          onClick={() => onNavigate('signup')}
          className="px-8 py-4 bg-lime-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Landing;
import React from 'react';

const Landing = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto text-center py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-16 rounded-3xl  bg-white shadow-2xl ring-4 ring-lime-100 mb-12 md:mb-16 relative overflow-hidden">
        {/*
          Using a specific, high-quality image of Goa to avoid a generic "AI-generated" feel.
          This image should be locally hosted or served via a reliable CDN for production.
        */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599879796030-2442478a8461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTI2MjV8MHwxfHNlYXJjaHw4fHxnb2ElMjBtYXJrZXR8ZW58MHx8fHwxNzE4NzQ3ODkzfDA&ixlib=rb-4.0.3&q=80&w=1080")' }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-lime-800 mb-4 md:mb-6 leading-tight">
            Groceries & Essentials, <br className="hidden sm:inline" />Delivered by People You Know.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8 md:mb-10 font-light">
            Near2Door isn’t just a service; it’s a movement. We deliver with love, from your trusted local vendors, right to your doorstep in minutes. In Goa, India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 md:px-10 md:py-5 bg-lime-600 text-white font-bold text-base md:text-lg rounded-full shadow-xl transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300"
            >
              Get Started Today
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="px-8 py-4 md:px-10 md:py-5 bg-white text-lime-800 font-bold text-base md:text-lg rounded-full shadow-xl border-2 border-lime-200 transition-all duration-300 transform hover:bg-lime-50 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-300"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Who We Serve Section */}
      <div className="w-full max-w-7xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-lime-800 mb-8 md:mb-12">
          Who We Serve in Goa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-center text-lime-600 mb-4 md:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-bag"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 md:mb-4">Customers</h3>
            <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed">
              Get your daily essentials from your trusted local shops in Goa — without stepping out. Order from your favorite vendor, and we’ll bring it near to your door with a smile.
            </p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-center text-lime-600 mb-4 md:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-store"
              >
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.41 2h9.18a2 2 0 0 1 1.41.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M22 7H2" />
                <path d="M12 7v3" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 md:mb-4">Shops</h3>
            <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed">
              Digitize your Goa store in minutes — no apps, no tech stress. Serve more customers, track orders, and grow your reach across your area with a low monthly membership.
            </p>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-center text-lime-600 mb-4 md:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bike"
              >
                <circle cx="18.5" cy="17.5" r="3.5" />
                <circle cx="5.5" cy="17.5" r="3.5" />
                <path d="M15 6s1.5-2 4.5-2c3.5 0 4.5 3.5 4.5 3.5V9c0 1.5-1.5 1.5-3 1.5-1.5 0-3-1.5-4.5-3-1-1-4-1.5-6.5-.5-1.5 1-3 2.5-3 2.5v7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 md:mb-4">Delivery Agents</h3>
            <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed">
              Earn on your schedule. Whether you’re a student or someone looking for part-time work in Goa, Near2Door lets you deliver in your neighborhood and earn weekly.
            </p>
          </div>
        </div>
      </div>

      {/* Why Near2Door Section */}
      <div className="w-full max-w-7xl mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-lime-800 mb-8 md:mb-12">
          Why Near2Door
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex-shrink-0 text-lime-600 text-4xl sm:text-5xl mx-auto sm:mx-0">
              <span className="font-extrabold">🤝</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Trusted By Locals</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                We’re not a faceless delivery app. Near2Door is built with your Goa neighborhood in mind — your trusted local shops, your friendly delivery partners, your people. We believe in human-first connections and community-powered service.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex-shrink-0 text-lime-600 text-4xl sm:text-5xl mx-auto sm:mx-0">
              <span className="font-extrabold">💳</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Cash & UPI — Both Welcomed</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                We understand that not everyone pays online. Whether you want to pay by UPI or prefer handing over cash at your door, Near2Door gives you the freedom to choose, supporting Goa's diverse payment preferences.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex-shrink-0 text-lime-600 text-4xl sm:text-5xl mx-auto sm:mx-0">
              <span className="font-extrabold">📍</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Community-Powered Delivery</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Our delivery agents are your neighbors in Goa — local youth and students looking to earn while serving their own community. This means faster, more reliable, and more personal deliveries, fostering local connections.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl ring-2 ring-lime-100 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex-shrink-0 text-lime-600 text-4xl sm:text-5xl mx-auto sm:mx-0">
              <span className="font-extrabold">⭐</span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">We Care About Community</h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Near2Door isn’t just a service, it’s a movement to connect better and support local businesses in Goa. We believe in building a platform that empowers small businesses and young individuals to thrive together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="w-full max-w-7xl mx-auto text-center py-12 md:py-16 bg-gradient-to-r from-lime-500 to-lime-700 rounded-3xl shadow-2xl ring-4 ring-lime-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg text-lime-100 max-w-3xl mx-auto mb-6 md:mb-8 font-light">
            Join our growing community of local shoppers, shops, and delivery agents in Goa today.
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="px-10 py-4 md:px-12 md:py-5 bg-white text-lime-700 font-bold text-lg md:text-xl rounded-full shadow-2xl transition-all duration-300 transform hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

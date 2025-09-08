import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-lime-400 drop-shadow-lg leading-tight mb-4">
            A Simple Path to Local Commerce
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Our platform is designed for simplicity and efficiency. Whether you're a shopper, a local shop, or a delivery agent, here’s how you can join the Near2Door community.
          </p>
        </div>

        {/* For Customers Section */}
        <div className="bg-slate-800 text-gray-100 p-8 md:p-12 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-8 text-center">
            For Customers: Shop Your Neighborhood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Browse & Order", "Place Your Order", "Receive Your Delivery"].map((title, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-700 text-gray-200 shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                <span className="text-4xl md:text-5xl mb-4 text-lime-400 font-bold">{i + 1}</span>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {i === 0
                    ? "Discover your favorite local shops, browse their products, and add items to your cart with a simple tap."
                    : i === 1
                    ? "Choose your preferred payment method—cash or UPI—and submit your order. Our system will notify the shop and a nearby agent."
                    : "Our trusted local delivery agent will pick up your order and bring it directly to your doorstep, fast and with a friendly smile."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* For Shops Section */}
        <div className="bg-slate-800 text-gray-100 p-8 md:p-12 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-8 text-center">
            For Shops: Go Digital in Minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Create Your Account", "Admin Review", "Manage Your Store", "Fulfill Orders"].map((title, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-700 text-gray-200 shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                <span className="text-4xl md:text-5xl mb-4 text-lime-400 font-bold">{i + 1}</span>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {i === 0
                    ? "Sign up and fill out a simple form with your shop’s details and location."
                    : i === 1
                    ? "Your application will be reviewed by our admin team to ensure all details are correct and secure."
                    : i === 2
                    ? "Once approved, you can add your products, track inventory, and get notified of new orders."
                    : "Accept orders, prepare them for pickup, and hand them off to a Near2Door agent for delivery."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* For Delivery Agents Section */}
        <div className="bg-slate-800 text-gray-100 p-8 md:p-12 rounded-3xl shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-400 mb-8 text-center">
            For Delivery Agents: Deliver & Earn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Apply Online", "Get Approved", "Accept Deliveries", "Deliver & Earn"].map((title, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-700 text-gray-200 shadow-md transform transition-transform hover:scale-[1.02] duration-300">
                <span className="text-4xl md:text-5xl mb-4 text-lime-400 font-bold">{i + 1}</span>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {i === 0
                    ? "Register on the platform and complete a short application form with your details."
                    : i === 1
                    ? "Your application will be verified and approved by our admin team. You will be notified when you are ready to start."
                    : i === 2
                    ? "Log into your dashboard to see nearby orders, accept them, and get details for pickup and drop-off."
                    : "Update the order status in real-time and get paid for every delivery you complete."}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;

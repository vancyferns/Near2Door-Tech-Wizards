import React from "react";

const HomePage = () => {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      {/* Hero Section */}
      <section className="bg-yellow-400 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 drop-shadow-md">
          Near2Door
        </h1>
        <p className="text-2xl md:text-3xl mt-6 font-medium text-gray-800 max-w-2xl">
          Connecting Customers, Shops & Delivery Agents – Right in Your Community.
        </p>
        <button className="mt-10 px-10 py-4 bg-gray-900 text-yellow-400 text-lg font-bold rounded-full shadow-xl hover:bg-gray-800 transform hover:scale-105 transition">
          Get Started
        </button>
      </section>

      {/* Who We Serve Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-14">
          Who We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Customers */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/shopping-bag.png"
              alt="Customers"
              className="h-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">Customers</h3>
            <p className="text-gray-400">
              Get your essentials delivered straight from your trusted local shops.
            </p>
          </div>
          {/* Delivery Agents */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/delivery.png"
              alt="Agents"
              className="h-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">Delivery Agents</h3>
            <p className="text-gray-400">
              Flexible work and dignified income for youth in your community.
            </p>
          </div>
          {/* Shops */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:scale-105 transition">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/shop.png"
              alt="Shops"
              className="h-20 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">Shops</h3>
            <p className="text-gray-400">
              Go digital in minutes – serve more customers without tech stress.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-14">
          Why Choose Near2Door
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <span className="text-5xl">🤝</span>
            <h3 className="text-xl font-bold text-yellow-600 mt-4 mb-2">
              Trusted by Locals
            </h3>
            <p className="text-gray-600">
              Every order supports and strengthens your local community.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <span className="text-5xl">💳</span>
            <h3 className="text-xl font-bold text-yellow-600 mt-4 mb-2">
              Cash & UPI Accepted
            </h3>
            <p className="text-gray-600">
              Pay however you like – we support both cash and UPI on delivery.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl shadow-md hover:scale-105 transition">
            <span className="text-5xl">🚀</span>
            <h3 className="text-xl font-bold text-yellow-600 mt-4 mb-2">
              Fast & Reliable
            </h3>
            <p className="text-gray-600">
              Quick deliveries powered by dedicated local agents near you.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-yellow-400 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          Join as a Customer, Shop, or Delivery Agent today.
        </p>
        <button className="px-8 py-3 bg-gray-900 text-yellow-400 text-lg font-bold rounded-full shadow-xl hover:bg-gray-800 transform hover:scale-105 transition">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default HomePage;

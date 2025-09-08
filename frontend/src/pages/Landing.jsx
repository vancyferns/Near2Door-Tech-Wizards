import React from 'react';

const Landing = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white font-sans">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto text-center py-16 md:py-20 lg:py-24 px-6 md:px-10 lg:px-16 rounded-3xl bg-slate-800 shadow-2xl ring-2 ring-lime-500/20 mb-12 md:mb-16 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1599879796030-2442478a8461?ixlib=rb-4.0.3&q=80&w=1080")',
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-lime-400 mb-4 md:mb-6 leading-tight">
            Groceries & Essentials,{" "}
            <br className="hidden sm:inline" />Delivered by People You Know.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 md:mb-10 font-light">
            Near2Door isn’t just a service; it’s a movement. We deliver with
            love, from your trusted local vendors, right to your doorstep in
            minutes. In Goa, India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => onNavigate("signup")}
              className="px-8 py-4 md:px-10 md:py-5 bg-lime-600 text-white font-bold text-base md:text-lg rounded-full shadow-xl transition-all duration-300 transform hover:bg-lime-700 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-500/50"
            >
              Get Started Today
            </button>
            <button
              onClick={() => onNavigate("how-it-works")}
              className="px-8 py-4 md:px-10 md:py-5 bg-slate-900 text-lime-400 font-bold text-base md:text-lg rounded-full shadow-xl border-2 border-lime-500/40 transition-all duration-300 transform hover:bg-slate-800 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-500/40"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Who We Serve Section */}
      <div className="w-full max-w-7xl mx-auto mb-12 md:mb-16 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-lime-400 mb-8 md:mb-12">
          Who We Serve in Goa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              title: "Customers",
              desc: "Get your daily essentials from your trusted local shops in Goa — without stepping out. Order from your favorite vendor, and we’ll bring it near to your door with a smile.",
              icon: "shopping-bag",
            },
            {
              title: "Shops",
              desc: "Digitize your Goa store in minutes — no apps, no tech stress. Serve more customers, track orders, and grow your reach across your area with a low monthly membership.",
              icon: "store",
            },
            {
              title: "Delivery Agents",
              desc: "Earn on your schedule. Whether you’re a student or someone looking for part-time work in Goa, Near2Door lets you deliver in your neighborhood and earn weekly.",
              icon: "bike",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl ring-1 ring-lime-500/20 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-center justify-center text-lime-400 mb-4 md:mb-6 text-5xl">
                {item.icon === "shopping-bag" && "🛍️"}
                {item.icon === "store" && "🏪"}
                {item.icon === "bike" && "🚲"}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-3 md:mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300 text-center text-base md:text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Near2Door Section */}
      <div className="w-full max-w-7xl mx-auto mb-12 md:mb-16 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-lime-400 mb-8 md:mb-12">
          Why Near2Door
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {[
            {
              emoji: "🤝",
              title: "Trusted By Locals",
              desc: "We’re not a faceless delivery app. Near2Door is built with your Goa neighborhood in mind — your trusted local shops, your friendly delivery partners, your people.",
            },
            {
              emoji: "💳",
              title: "Cash & UPI — Both Welcomed",
              desc: "Whether you want to pay by UPI or prefer handing over cash at your door, Near2Door gives you the freedom to choose, supporting Goa's diverse payment preferences.",
            },
            {
              emoji: "📍",
              title: "Community-Powered Delivery",
              desc: "Our delivery agents are your neighbors in Goa — local youth and students looking to earn while serving their own community.",
            },
            {
              emoji: "⭐",
              title: "We Care About Community",
              desc: "Near2Door isn’t just a service, it’s a movement to connect better and support local businesses in Goa. We empower small businesses and young individuals to thrive together.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800 p-8 md:p-10 rounded-3xl shadow-xl ring-1 ring-lime-500/20 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex-shrink-0 text-lime-400 text-4xl sm:text-5xl mx-auto sm:mx-0">
                {item.emoji}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="w-full max-w-7xl mx-auto text-center py-12 md:py-16 bg-gradient-to-r from-lime-500 to-lime-700 rounded-3xl shadow-2xl ring-4 ring-lime-500/30 relative overflow-hidden px-6">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-lime-100 max-w-3xl mx-auto mb-6 md:mb-8 font-light">
            Join our growing community of local shoppers, shops, and delivery
            agents in Goa today.
          </p>
          <button
            onClick={() => onNavigate("signup")}
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

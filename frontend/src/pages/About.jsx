import React from 'react';

const About = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-lime-400 drop-shadow-lg leading-tight mb-4">
            Our Mission: Empowering Local
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Near2Door is a community-powered movement, not just a service. We believe in strengthening local economies by connecting people with their trusted neighborhood shops and empowering flexible, fair-wage work for local youth.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white text-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Story Behind Near2Door
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            The idea for Near2Door was born from a simple observation: across India's vibrant communities, a gap exists. Local shops, the backbone of our neighborhoods, often struggle for visibility in a digital world. At the same time, young people seek flexible opportunities to earn a living without leaving their hometown.
          </p>
          <p className="text-lg leading-relaxed">
            We built Near2Door to bridge this gap. We're a hyperlocal solution that champions human connection. Our platform supports small businesses by giving them a digital presence, and it empowers local youth to serve as our delivery agents, fostering a sense of community and mutual growth. This is about more than just delivery; it's about rebuilding the joy of shopping local, one doorstep at a time.
          </p>
        </div>

        {/* Differentiators Section */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Why We're Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1: Hyperlocal */}
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center text-lime-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M12 2v20M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Hyperlocal & Trusted</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                We focus on your neighborhood, not a generic service area. Our platform is built by and for the local community, ensuring you get goods from shops you already know and trust.
              </p>
            </div>

            {/* Card 2: Human-First */}
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center text-lime-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M22 8a4 4 0 0 0-4-4"/></svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Human-First Delivery</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Our delivery agents are your neighbors, not a faceless workforce. We prioritize personal connections, fostering a system that's more reliable, friendly, and community-driven.
              </p>
            </div>

            {/* Card 3: Community over Commission */}
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105">
              <div className="flex items-center justify-center text-lime-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Community over Commission</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                We believe in fair compensation and a sustainable model for both shops and agents. Our focus is on building a thriving local ecosystem, not on maximizing our profits.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
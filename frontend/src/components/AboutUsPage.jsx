import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-white text-gray-900">

      {/* About Us Hero Section - Based on provided design */}
      <div className="bg-yellow-400 py-24 px-8 text-center relative overflow-hidden">
        <div className="container mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-tight">
            ABOUT US
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-semibold text-gray-800">
            "The Story Behind Near2Door"
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          At Near2Door, we believe that <span className="font-bold text-gray-800">local is powerful</span>. Our mission is simple: connect people with the trusted shops around them, enable local youth to earn through flexible delivery, and build a community-based delivery system that works for everyone — not just big cities.
        </p>
      </div>

      {/* Why We Started Section - With image illustration */}
      <div className="bg-gray-100 py-16 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Why We Started</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-8">
          <img src="/image_af2fe8.png" alt="Question mark illustration" className="w-48 h-48 mb-8 md:mb-0" />
          <div className="text-left">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">The Problem:</h3>
            <p className="text-gray-600 mb-8">
              In many of India’s towns and villages, big tech platforms often forget the very fabric of our society—the local vendor. They don’t provide the tools for these small businesses to thrive in a digital-first world. Meanwhile, local youth struggle to find flexible, dignified work.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">The Solution:</h3>
            <p className="text-gray-600">
              Near2Door bridges that gap. We're a platform built from the ground up to support small businesses, empower young individuals, and bring the joy of shopping local, all delivered right to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* What Makes Us Different Section - With map image */}
      <div className="py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">What Makes Us Different</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
          <img src="/image_af2cde.png" alt="Map of India with locations" className="w-full md:w-1/2 mb-8 md:mb-0" />
          <ul className="text-left space-y-4 text-lg">
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">Built for your area - By your people.</p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">We use real people, not warehouses.</p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">Shops get full freedom and visibility.</p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">Cash and UPI supported.</p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">Customers choose who serves them.</p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <p className="text-gray-600">We care about community over commission.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Who We Are Section - With team image */}
      <div className="bg-gray-100 py-16 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Who We Are</h2>
        <img src="/image_af2fab.png" alt="A diverse group of people" className="w-full max-w-lg mx-auto mb-8 rounded-lg shadow-lg" />
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Near2Door is a group of students, builders, and dreamers — working to make everyday life easier for people in communities across India. We’re here to show that technology can be a force for local good, not just corporate gain. We’re building a platform that grows with each locality and supports small dreams.
        </p>
      </div>

      {/* Our Vision for the Future Section - With lightbulb image */}
      <div className="py-16 px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Vision for the Future</h2>
        <img src="/image_af3023.png" alt="Lightbulb illustration" className="w-48 h-48 mb-8" />
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          As we grow, we hope to reach every home in India that can benefit from a people-powered, hyperlocal delivery system. We’re just getting started — and we’d love for you to be part of this journey.
        </p>
      </div>

      {/* Concluding Section - With raised fist image */}
      <div className="bg-gray-900 text-white py-16 px-8 text-center relative overflow-hidden">
        <div className="container mx-auto">
          <img src="/image_af2fe8.png" alt="Raised fist illustration" className="w-24 h-24 mx-auto mb-4" />
          <p className="text-2xl font-bold mb-2">
            Near2Door isn't just a service, it's a movement.
          </p>
          <p className="text-lg text-gray-400">
            To connect better, to support local. To deliver with love, from people you know.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
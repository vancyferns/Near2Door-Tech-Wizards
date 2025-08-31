import React from 'react';

const About = () => (
  <div className="p-8 bg-white rounded-2xl shadow-2xl mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">The Story Behind Near2Door</h2>
    <p className="text-gray-600 mb-4">
      At Near2Door, we believe that local is powerful. Our mission is simple: connect people with the trusted shops around them, enable local youth to earn through flexible delivery, and build a community-based delivery system that works for everyone — not just big cities.
    </p>
    <p className="text-gray-600 mb-6">
      This idea was born out of a simple need — people, especially in India’s small towns and villages, often don’t have the time, energy, or means to go out for daily essentials. At the same time, small local shops lack visibility and youth often struggle to find part-time work.
      Near2Door bridges that gap. We’re here to support small businesses, empower young individuals, and bring back the joy of shopping local — one doorstep at a time.
    </p>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">What Makes Us Different</h3>
    <ul className="list-disc list-inside text-gray-600 space-y-2">
      <li>Built for your area - By your people.</li>
      <li>We use real people, not warehouses.</li>
      <li>Shops get full freedom and visibility.</li>
      <li>Cash and UPI supported.</li>
      <li>Customers choose who serves them.</li>
      <li>We care about community over commission.</li>
    </ul>
  </div>
);

export default About;
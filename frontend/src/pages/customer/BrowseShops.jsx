import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const BrowseShops = ({ onNavigate }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await api.getShops();
        if (Array.isArray(data)) {
          setShops(data);
        } else {
          setError('Unexpected API response format.');
          console.error('API response is not an array:', data);
        }
      } catch (e) {
        setError('Failed to fetch shops. Please try again later.');
        console.error('Error fetching shops:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  if (loading) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center">
        <p className="text-gray-600 text-lg animate-pulse">Loading shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-xl sm:shadow-2xl mt-6 sm:mt-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">
        🏪 Browse Shops
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8 text-center sm:text-left text-base sm:text-lg">
        Explore a list of local shops and discover new favorites.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => onNavigate('shop-products', { shopId: shop.id })}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-6 sm:p-8 text-left transform transition-all duration-300 hover:-translate-y-1 hover:border-lime-400"
            >
              {/* Shop image or placeholder */}
              <div className="w-full h-40 sm:h-48 rounded-xl bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                {shop.image ? (
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-lime-700">
                {shop.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                {shop.description || 'No description available.'}
              </p>

              <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin mr-1"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{shop.location || 'Location not specified'}</span>
              </div>
            </button>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">No shops available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseShops;

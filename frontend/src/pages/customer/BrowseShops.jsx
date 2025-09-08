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
      <div className="bg-slate-900 text-white min-h-[calc(100vh-140px)] flex items-center justify-center py-16">
        <div className="p-10 bg-slate-800 rounded-3xl shadow-lg text-center">
          <p className="text-gray-300 text-lg animate-pulse">Loading shops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 text-white min-h-[calc(100vh-140px)] flex items-center justify-center py-16">
        <div className="p-10 bg-slate-800 rounded-3xl shadow-lg text-center text-red-400 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-[calc(100vh-140px)] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-lime-400 drop-shadow-lg leading-tight mb-2">
            Explore Local Shops
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Find and support a variety of businesses near you.
          </p>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => onNavigate('shop-products', { shopId: shop.id })}
                className="group bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl border border-slate-700 hover:border-lime-400 p-6 sm:p-8 text-left transform transition-all duration-300 hover:-translate-y-1"
              >
                {/* Shop image or placeholder */}
                <div className="w-full h-40 sm:h-48 rounded-2xl bg-slate-700 flex items-center justify-center mb-4 overflow-hidden">
                  {shop.profileImage ? (
                    <img
                      src={shop.profileImage}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-lime-400">
                  {shop.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base line-clamp-2">
                  {shop.type || 'No description available.'}
                </p>

                <div className="flex items-center text-sm text-gray-500 mt-4">
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
                  <span className="text-gray-400">
                    {shop.location || 'Location not specified'}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-10 bg-slate-800 rounded-3xl shadow-lg text-center col-span-full">
              <p className="text-gray-400 text-lg font-medium">
                We couldn't find any shops right now. Please check back later!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseShops;

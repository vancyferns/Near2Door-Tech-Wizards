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
    return <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center">Loading shops...</div>;
  }

  if (error) {
    return <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Shops</h2>
      <p className="text-gray-600 mb-6">Explore a list of available local shops.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.length > 0 ? (
          shops.map(shop => (
            <button 
              key={shop.id} 
              onClick={() => onNavigate('shop-products', { shopId: shop.id })}
              className="bg-gray-50 rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 duration-300 text-left"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{shop.name}</h3>
              <p className="text-gray-600 mb-2">{shop.description || 'No description available.'}</p>
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{shop.location || 'Location not specified'}</span>
              </div>
            </button>
          ))
        ) : (
          <p className="text-gray-600">No shops available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseShops;
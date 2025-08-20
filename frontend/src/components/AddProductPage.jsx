import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { api } from '../api';

const AddProductPage = ({ onNavigate }) => {
  const { userShopId, userToken } = useContext(AppContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userShopId) return;
    api.shopsShopIdProductsPost(userShopId, { name, description, price, stock }, userToken).then(res => {
      if (res.status === 201) {
        onNavigate({ name: 'shop-products' });
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Stock</label>
            <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} required className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
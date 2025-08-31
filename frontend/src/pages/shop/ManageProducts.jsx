import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '' });
  const { user } = useAuth();
  const shopId = user?.shop_id || '6686a3253b7074718817c1c2'; // Placeholder for shop_id

  useEffect(() => {
    const fetchProducts = async () => {
      if (shopId) {
        const data = await api.getProducts(shopId);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API response is not an array:', data);
        }
      }
    };
    fetchProducts();
  }, [shopId]);

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await api.updateProduct(shopId, currentProduct.id, currentProduct);
    } else {
      await api.addProduct(shopId, currentProduct);
    }
    const updatedProducts = await api.getProducts(shopId);
    setProducts(updatedProducts);
    setIsEditing(false);
    setCurrentProduct({ name: '', price: '', description: '' });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await api.deleteProduct(shopId, id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Products</h2>
      <button onClick={() => { setIsEditing(false); setCurrentProduct({ name: '', price: '', description: '' }); }} className="px-6 py-3 mb-6 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition duration-300">
        Add New Product
      </button>

      <div className="bg-gray-50 rounded-2xl shadow-md p-8 mb-8">
        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleFormSubmit}>
          <Input label="Product Name" name="name" value={currentProduct.name} onChange={handleFormChange} />
          <Input label="Price" name="price" type="number" value={currentProduct.price} onChange={handleFormChange} />
          <Input label="Description" name="description" value={currentProduct.description} onChange={handleFormChange} />
          <Button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</Button>
        </form>
      </div>

      <div className="bg-gray-50 rounded-2xl shadow-md p-8">
        <h3 className="text-xl font-semibold mb-4">Your Products</h3>
        <ul className="space-y-4">
          {Array.isArray(products) && products.length > 0 ? products.map(product => (
            <li key={product.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm">
              <div>
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Delete</button>
              </div>
            </li>
          )) : <p>No products added yet.</p>}
        </ul>
      </div>
    </div>
  );
};

export default ManageProducts;
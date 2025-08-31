import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

// Carousel component to display multiple images
const ProductCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-48 bg-gray-200 rounded-t-xl overflow-hidden">
      {images && images.length > 0 ? (
        <>
          <img
            src={images[currentImageIndex]}
            alt="Product"
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              >
                &#10094;
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              >
                &#10095;
              </button>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500">No Image</div>
      )}
    </div>
  );
};

// Main component for managing products
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '', images: [] });
  const [productImages, setProductImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { user } = useAuth();
  // Using a placeholder for shopId for demonstration purposes
  const shopId = user?.shop_id || '6686a3253b7074718817c1c2';

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

  const handleImageUpload = (e) => {
    setProductImages(Array.from(e.target.files));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrls = [];
    if (productImages.length > 0) {
      // Corrected: Await the upload of each image
      for (const file of productImages) {
        const imageUrl = await api.uploadImage(file);
        if (imageUrl) {
          uploadedImageUrls.push(imageUrl);
        }
      }
    }
    
    const productWithImages = { ...currentProduct, images: uploadedImageUrls };

    if (isEditing) {
      await api.updateProduct(shopId, currentProduct.id, productWithImages);
    } else {
      await api.addProduct(shopId, productWithImages);
    }
    const updatedProducts = await api.getProducts(shopId);
    setProducts(updatedProducts);
    setIsEditing(false);
    setCurrentProduct({ name: '', price: '', description: '', images: [] });
    setProductImages([]);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    await api.deleteProduct(shopId, productToDelete.id);
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Products</h2>
      <button 
        onClick={() => { setIsEditing(false); setCurrentProduct({ name: '', price: '', description: '', images: [] }); }} 
        className="px-6 py-3 mb-6 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700 transition duration-300"
      >
        Add New Product
      </button>

      {/* Form for adding/editing a product */}
      <div className="bg-gray-50 rounded-2xl shadow-md p-8 mb-8">
        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleFormSubmit}>
          <Input label="Product Name" name="name" value={currentProduct.name} onChange={handleFormChange} />
          <Input label="Price" name="price" type="number" value={currentProduct.price} onChange={handleFormChange} />
          <Input label="Description" name="description" value={currentProduct.description} onChange={handleFormChange} />
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
            <input 
              type="file" 
              multiple 
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-lime-50 file:text-lime-700
              hover:file:bg-lime-100"
            />
          </div>
          <Button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</Button>
        </form>
      </div>

      {/* Product Inventory section */}
      <div className="bg-gray-50 rounded-2xl shadow-md p-8">
        <h3 className="text-xl font-semibold mb-4">Your Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ProductCarousel images={product.images} />
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">${product.price}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(product)} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">Edit</button>
                    <button onClick={() => handleDelete(product)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products added yet.</p>
          )}
        </div>
      </div>
      
      {/* Custom delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete "{productToDelete?.name}"?
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={confirmDelete}>Yes, Delete</Button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
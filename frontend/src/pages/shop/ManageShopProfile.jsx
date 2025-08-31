import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/UseForm';
import api from '../../api/api';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const ManageShopProfile = ({ onNavigate }) => {
  const { user } = useAuth();
  const [shopProfile, setShopProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const shopId = user?.shop_id || '6686a3253b7074718817c1c2';

  // Form validation logic
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Shop name is required';
    if (!values.type) errors.type = 'Shop type is required';
    if (!values.location) errors.location = 'Location is required';
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm({
    name: '',
    type: '',
    location: '',
    status: 'pending',
    profileImage: '',
  }, validate);

  useEffect(() => {
    const fetchShopProfile = async () => {
      try {
        const data = await api.getShopProfile(shopId);
        if (data) {
          setShopProfile(data);
          setValues({
            name: data.name,
            type: data.type,
            location: data.location,
            status: data.status,
            profileImage: data.profileImage,
          });
        }
      } catch (e) {
        console.error('Failed to fetch shop profile:', e);
      }
    };
    fetchShopProfile();
  }, [shopId, setValues]);

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const onSubmit = async (vals) => {
    setStatusMessage('');
    let imageUrl = vals.profileImage;
    if (profileImage) {
      imageUrl = await api.uploadImage(profileImage);
      if (!imageUrl) {
        setStatusMessage('Image upload failed. Profile not saved.');
        return;
      }
    }

    const updatedProfile = { ...vals, profileImage: imageUrl };
    try {
      await api.updateShopProfile(shopId, updatedProfile);
      setShopProfile(updatedProfile);
      setStatusMessage('Profile updated successfully!');
    } catch (e) {
      setStatusMessage('Failed to update profile. Please try again.');
      console.error('Update profile error:', e);
    }
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Shop Profile</h2>
      <p className="text-gray-600 mb-6">Update your business information and status.</p>

      {statusMessage && (
        <div className={`p-4 rounded-lg mb-6 ${statusMessage.includes('successfully') ? 'bg-lime-100 text-lime-800' : 'bg-red-100 text-red-800'}`}>
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {shopProfile?.profileImage && (
          <div className="mb-6 text-center">
            <img src={shopProfile.profileImage} alt="Shop Profile" className="mx-auto h-32 w-32 rounded-full object-cover mb-2" />
            <p className="text-gray-600">Current Profile Image</p>
          </div>
        )}

        <Input label="Shop Name" name="name" type="text" value={values.name} onChange={handleChange} error={errors.name} />
        <Input label="Shop Type (e.g., Grocery, Cafe)" name="type" type="text" value={values.type} onChange={handleChange} error={errors.type} />
        <Input label="Location" name="location" type="text" value={values.location} onChange={handleChange} error={errors.location} />
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload Profile Image</label>
          <input 
            type="file" 
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-lime-50 file:text-lime-700
            hover:file:bg-lime-100"
          />
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <label className="block text-gray-700 text-sm font-bold">Shop Status:</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="status"
              value="open"
              checked={values.status === 'open'}
              onChange={handleChange}
              className="mr-2 text-lime-600 focus:ring-lime-500"
            />
            <label className="text-gray-700">Open</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="status"
              value="closed"
              checked={values.status === 'closed'}
              onChange={handleChange}
              className="mr-2 text-lime-600 focus:ring-lime-500"
            />
            <label className="text-gray-700">Closed</label>
          </div>
        </div>

        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
};

export default ManageShopProfile;
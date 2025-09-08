import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

// Custom `useForm` hook
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setValues({
      ...values,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    }
  };

  return { values, errors, handleChange, handleSubmit, setValues };
};

// Simple Input component
const Input = ({ label, name, type = "text", value, onChange, error }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-lime-500/50"
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

// Simple Button component
const Button = ({ children, type = "button", disabled }) => (
  <button
    type={type}
    disabled={disabled}
    className={`w-full py-3 px-4 rounded-full font-bold text-lg transition-all duration-300 ${
      disabled
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-lime-500 text-white hover:bg-lime-600 focus:outline-none focus:ring focus:ring-lime-500/50"
    }`}
  >
    {children}
  </button>
);

// ShopLogo component
const ShopLogo = ({ name, imageUrl, size = "20" }) => {
  const initial = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "S";
  const fontSizeClass = size === "20" ? "text-4xl" : "text-xl";
  const sizeClass = `w-${size} h-${size}`;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full overflow-hidden ${sizeClass} font-bold text-white bg-lime-600 border-4 border-lime-300`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Shop Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={fontSizeClass}>{initial}</span>
      )}
    </div>
  );
};

const ManageShopProfile = () => {
  const { user } = useAuth();
  const [shopProfile, setShopProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const shopId = user?.shop_id;

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Shop name is required";
    if (!values.type) errors.type = "Shop type is required";
    if (!values.location) errors.location = "Location is required";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    {
      name: "",
      type: "",
      location: "",
      status: "closed",
      profileImage: "",
    },
    validate
  );

  useEffect(() => {
    const fetchShopProfileData = async () => {
      if (!shopId) return;
      try {
        setLoading(true);
        const data = await api.getShopProfile(shopId);
        if (data) {
          setShopProfile(data);
          // Set values will now work correctly
          setValues({
            name: data.name || "",
            type: data.type || "",
            location: data.location || "",
            status: data.status || "closed",
            profileImage: data.profileImage || "",
          });
        }
      } catch (e) {
        console.error("Failed to fetch shop profile:", e);
        setStatusMessage("❌ Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchShopProfileData();
  }, [shopId, setValues]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValues({ ...values, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (vals) => {
    setStatusMessage("");
    setLoading(true);

    let imageUrl = vals.profileImage;

    if (profileImage) {
      try {
        imageUrl = await api.uploadImage(profileImage);
      } catch (e) {
        setStatusMessage("❌ Image upload failed. Profile not saved.");
        setLoading(false);
        return;
      }
    }

    const updatedProfile = { ...vals, profileImage: imageUrl };

    try {
      await api.updateShopProfile(shopId, updatedProfile);
      setShopProfile(updatedProfile);
      setStatusMessage("✅ Profile updated successfully!");
    } catch (e) {
      setStatusMessage("❌ Failed to update profile. Please try again.");
      console.error("Update profile error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-[calc(100vh-140px)] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-lime-400 drop-shadow-lg mb-3">
            Manage Shop Profile
          </h2>
          <p className="text-lg text-gray-300">
            Update your business information and keep customers informed.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-4 rounded-lg mb-6 text-center font-semibold ${
              statusMessage.includes("successfully")
                ? "bg-lime-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {statusMessage}
          </div>
        )}

        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <ShopLogo
                name={values.name}
                imageUrl={values.profileImage}
                size="20"
              />
              <div>
                <h3 className="text-2xl font-bold">
                  {values.name || "Your Shop"}
                </h3>
                <p className="text-gray-500">{values.type || "Shop Type"}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span
                className={`py-1 px-4 rounded-full font-bold text-sm ${
                  values.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {values.status === "open" ? "Open" : "Closed"}
              </span>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Shop Name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                label="Shop Type (e.g., Grocery, Cafe)"
                name="type"
                type="text"
                value={values.type}
                onChange={handleChange}
                error={errors.type}
              />
              <Input
                label="Location"
                name="location"
                type="text"
                value={values.location}
                onChange={handleChange}
                error={errors.location}
              />

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-lime-50 file:text-lime-700
                    hover:file:bg-lime-100"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="block text-gray-700 text-sm font-bold">
                  Shop Status:
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="open"
                    checked={values.status === "open"}
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
                    checked={values.status === "closed"}
                    onChange={handleChange}
                    className="mr-2 text-lime-600 focus:ring-lime-500"
                  />
                  <label className="text-gray-700">Closed</label>
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageShopProfile;

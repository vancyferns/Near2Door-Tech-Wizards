import React, { useState } from 'react';
import useForm from '../../hooks/UseForm'
import api from '../../api/api';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const SignUp = ({ onNavigate }) => {
  const { login } = useAuth();
  const [authError, setAuthError] = useState('');

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (!values.name) errors.name = 'Name is required'; // Validation for 'name'
    if (!values.role) errors.role = 'Role is required';
    return errors;
  };

  // Corrected: 'name' field is now in the initial state.
  const { values, errors, handleChange, handleSubmit } = useForm({ name: '', email: '', password: '', role: 'customer' }, validate);

  const onSubmit = async (vals) => {
    const { response, data } = await api.register(vals);
    if (response.ok) {
      login(data.user, data.token);
      onNavigate(data.user.role === 'shop' ? 'shop-dashboard' : 'customer-dashboard');
    } else {
      setAuthError(data.error || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Corrected: Added the Input component for the 'name' field */}
          <Input label="Name" name="name" type="text" value={values.name} onChange={handleChange} error={errors.name} />
          <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
          <Input label="Password" name="password" type="password" value={values.password} onChange={handleChange} error={errors.password} />
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              name="role"
              id="role"
              value={values.role}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-300 ${errors.role ? 'border-red-500' : ''}`}
            >
              <option value="customer">Customer</option>
              <option value="shop">Shop</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs italic mt-1">{errors.role}</p>}
          </div>
          <Button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => onNavigate('signin')} className="text-lime-600 hover:underline font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
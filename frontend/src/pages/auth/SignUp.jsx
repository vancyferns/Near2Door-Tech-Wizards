import React, { useState } from 'react';
import useForm from '../../hooks/UseForm';
import api from '../../api/api';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const SignUp = ({ onNavigate }) => {
  const { login } = useAuth();
  const [authError, setAuthError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (!values.role) errors.role = 'Role is required';
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', role: 'customer' },
    validate
  );

  const onSubmit = async (vals) => {
    const { response, data } = await api.register(vals);
    if (response.ok) {
      // For agent or shop, show message and don't sign in
      if (data.user.role === 'shop' || data.user.role === 'agent') {
        setSubmitted(true);
      } else if (data.user.role === 'customer') {
        login(data.user, data.token);
        onNavigate('customer-dashboard');
      } else if (data.user.role === 'admin') {
        login(data.user, data.token);
        onNavigate('admin-dashboard');
      } else {
        login(data.user, data.token);
        onNavigate('landing');
      }
    } else {
      setAuthError(data.error || 'Registration failed');
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-lime-600 mb-4">Application Submitted!</h2>
          <p className="text-gray-700 mb-4">
            Thank you for signing up.<br />
            Your account will be reviewed by an admin.<br />
            Please check back in 24 hours to login.
          </p>
          <Button onClick={() => onNavigate('landing')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <option value="agent">Delivery Agent</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs italic mt-1">{errors.role}</p>}
          </div>
          <Button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</Button>
        </form>
        {authError && <div className="text-red-500 text-center mt-4">{authError}</div>}
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
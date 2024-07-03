import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/FAST.png'; 

const LoginForm = () => {
  const [arnNumber, setArnNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!arnNumber || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simulate login process
    console.log('Login attempt with:', { arnNumber, password });
    setError('');
    // Navigate to home page on successful login
    navigate('/instructions');
    // You can add your actual login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <img src={logo} alt="Logo" className="mb-6 w-24 h-24" />
      <h1 className="text-3xl font-bold mb-2">Welcome to Fast Nuces</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="arnNumber" className="block mb-2">ARN Number</label>
          <input
            type="text"
            id="arnNumber"
            value={arnNumber}
            onChange={(e) => setArnNumber(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button type="submit" className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/FAST.png'; 
import { useTheme } from '../Context/Theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const LoginForm = () => {
  const [arnNumber, setArnNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${mode === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="absolute top-4 right-4">
        <Brightness4Icon onClick={toggleTheme} className="cursor-pointer" />
      </div>
      <img src={logo} alt="Logo" className="mb-6 w-24 h-24" />
      <h1 className={`text-3xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
        Welcome to Fast Nuces
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="arnNumber" className="block mb-2">ARN Number</label>
          <input
            type="text"
            id="arnNumber"
            value={arnNumber}
            onChange={(e) => setArnNumber(e.target.value)}
            className={`w-full p-2 ${mode === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-200 border-gray-300 text-black'} border rounded`}
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
            className={`w-full p-2 ${mode === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-200 border-gray-300 text-black'} border rounded`}
            required
          />
        </div>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <button type="submit" className={`w-full font-bold py-2 px-4 rounded transition-colors ${mode === 'dark' ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9098/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        onLoginSuccess(username);  // Update parent state
        navigate('/dashboard');   // Redirect to dashboard view
      } else {
        alert(data.message || 'Username or password entered wrong.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to registration page
  };

  return (
<div className="flex items-center justify-center min-h-100 min-w-90 bg-gradient-to-br from-pink-100 to-purple-200">
<form onSubmit={handleLogin} className="w-85 max-w-md bg-white rounded-3xl shadow-2xl p-8">      
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your username"
              required
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-full font-bold hover:bg-pink-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="text-pink-600 hover:underline"
          >
            Back to register
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


function RegistrationForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9098/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: await response.text() };
      }

      if (response.ok) {
        alert(data.message || 'Registration successful!');
        onSuccess();
        navigate('/login'); // 🔁 navigate to login
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };


  return (
    <div className="flex items-center justify-center min-h-100 min-w-90 bg-gradient-to-br from-pink-100 to-purple-200">
      <form onSubmit={handleSubmit} className="w-85 max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">Register</h2>
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
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-full font-bold hover:bg-pink-700 transition">
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
<button type="button" onClick={handleLoginRedirect} className="text-pink-600 hover:underline">
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8000/api/login/', { username, password });

// ✅ Save everything
// localStorage.setItem("token", response.data.access);

localStorage.setItem("username", res.data.username);
localStorage.setItem('loggedInUser', res.data.username);
localStorage.setItem('first_name', res.data.first_name);
localStorage.setItem('last_name', res.data.last_name);
localStorage.setItem('email', res.data.email);
localStorage.setItem('userRole', res.data.role); // ✅ This was missing

setLoggedInUser(res.data.username);
alert(`Hello, ${res.data.username}`);
navigate('/');

  } catch (error) {
    alert('Login failed. Invalid credentials.');
  }
};


  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded"
        value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded"
        value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

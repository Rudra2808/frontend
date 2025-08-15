import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [form, setForm] = useState({
  username: '', first_name: '', last_name: '',
  email: '', mobile_number: '', password: '', role: ''
});

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', form);
      alert('Registration successful!');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Convert error object to readable string
        const messages = Object.entries(errorData).map(
          ([field, errors]) => `${field}: ${errors.join(', ')}`
        );

        alert(messages.join('\n'));
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Register</h2>
      {['username', 'first_name', 'last_name', 'email', 'mobile_number', 'password'].map(field => (
        <input key={field}
          type={field === 'password' ? 'password' : 'text'}
          name={field}
          placeholder={field.replace('_', ' ').toUpperCase()}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      ))}
      <select
  name="role"
  value={form.role || ''}
  onChange={handleChange}
  className="w-full p-2 border rounded"
  required
>
  <option value="">Select Role</option>
  <option value="seller">Seller</option>
  <option value="buyer">Buyer</option>
</select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import FloatingInput from "./FloatingInput" // ✅ reuse same floating input style

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    password: "",
    role: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/register/", form)
      alert("Registration successful!")
      navigate("/login")
    } catch (error) {
      if (error.response?.data) {
        const messages = Object.entries(error.response.data).map(
          ([field, errors]) => `${field}: ${errors.join(", ")}`
        )
        alert(messages.join("\n"))
      } else {
        alert("An unexpected error occurred.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* ✅ Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.svg" // 🔄 replace with your logo
              alt="Logo"
              className="h-12 w-12"
            />
          </div>
          <h2 className="text-2xl font-semibold">Create Account</h2>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FloatingInput
            id="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            name="username"
            required
          />

          <FloatingInput
            id="first_name"
            label="First Name"
            value={form.first_name}
            onChange={handleChange}
            name="first_name"
            required
          />

          <FloatingInput
            id="last_name"
            label="Last Name"
            value={form.last_name}
            onChange={handleChange}
            name="last_name"
            required
          />

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
            required
          />

          <FloatingInput
            id="mobile_number"
            label="Mobile Number"
            type="tel"
            value={form.mobile_number}
            onChange={handleChange}
            name="mobile_number"
            required
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
            required
          />

          {/* ✅ Role Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">-- Choose Role --</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          {/* ✅ Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* ✅ Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

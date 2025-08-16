"use client"

import { useState } from "react"
import axios from "axios"

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://backend-1-x1gx.onrender.com//api/register/", form)
      alert("Registration successful!")
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data

        // Convert error object to readable string
        const messages = Object.entries(errorData).map(([field, errors]) => `${field}: ${errors.join(", ")}`)

        alert(messages.join("\n"))
      } else {
        alert("An unexpected error occurred.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our property platform today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { field: "username", icon: "👤", type: "text" },
            { field: "first_name", icon: "📝", type: "text" },
            { field: "last_name", icon: "📝", type: "text" },
            { field: "email", icon: "📧", type: "email" },
            { field: "mobile_number", icon: "📱", type: "tel" },
            { field: "password", icon: "🔒", type: "password" },
          ].map(({ field, icon, type }, index) => (
            <div key={field} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-xl">{icon}</span>
              </div>
              <input
                type={type}
                name={field}
                placeholder={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                value={form[field]}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500"
                required
              />
            </div>
          ))}

          <div className="relative animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-xl">👥</span>
            </div>
            <select
              name="role"
              value={form.role || ""}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
              required
            >
              <option value="">Select Your Role</option>
              <option value="seller">🏠 Seller</option>
              <option value="buyer">🛒 Buyer</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg animate-slide-up"
            style={{ animationDelay: "0.7s" }}
          >
            Create Account ✨
          </button>
        </form>

        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1 transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm

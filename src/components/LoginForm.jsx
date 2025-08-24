"use client"

import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, Home, ArrowRight } from 'lucide-react'
import axios from "axios"
import { useNavigate } from "react-router-dom"



const ModernPropertyIllustration = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-white overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Main building */}
        <div className="w-48 h-64 bg-gradient-to-t from-teal-500/20 to-teal-400/10 rounded-t-lg relative">
          {/* Building windows */}
          <div className="grid grid-cols-3 gap-3 p-4 pt-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded ${
                  Math.random() > 0.5 ? 'bg-teal-500/30' : 'bg-teal-400/10'
                } transition-colors duration-1000`}
              />
            ))}
          </div>
          {/* Building entrance */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-teal-500/40 rounded-t-lg" />
        </div>
        
        {/* Side building */}
        <div className="absolute -right-16 top-12 w-32 h-48 bg-gradient-to-t from-teal-500/15 to-teal-400/8 rounded-t-lg">
          <div className="grid grid-cols-2 gap-2 p-3 pt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded ${
                  Math.random() > 0.5 ? 'bg-teal-500/25' : 'bg-teal-400/8'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-8 -left-8 w-4 h-4 bg-teal-500/40 rounded-full animate-pulse" />
        <div className="absolute -top-4 right-8 w-3 h-3 bg-teal-400/30 rounded-full animate-pulse delay-300" />
        <div className="absolute top-16 -right-24 w-5 h-5 bg-teal-500/35 rounded-full animate-pulse delay-700" />
        
        {/* Ground line */}
        <div className="absolute -bottom-4 -left-24 w-80 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      </div>
    </div>
    
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-teal-500/20 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-teal-400/20 rounded-full" />
    </div>
  </div>
)

const HavenHuntLogin = ({ setLoggedInUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const res = await axios.post("http://localhost:8000//api/login/", { 
        username: formData.username,
        password: formData.password 
      });

      localStorage.setItem("username", res.data.username);
      localStorage.setItem("loggedInUser", res.data.username);
      localStorage.setItem("first_name", res.data.first_name);
      localStorage.setItem("last_name", res.data.last_name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userRole", res.data.role);

      setLoggedInUser(res.data.username);
      alert(`Hello, ${res.data.username}`);
      navigate("/");
    } catch (error) {
      alert("Login failed. Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[700px] overflow-hidden shadow-2xl border border-gray-200 rounded-lg">
        <div className="flex h-full">
          {/* Left side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <ModernPropertyIllustration />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute bottom-8 left-8 text-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-8 h-8 text-teal-500" />
                <span className="text-2xl font-bold text-gray-900">Havenhunt</span>
              </div>
              <p className="text-lg text-gray-600 max-w-sm">
                Discover your perfect home with our comprehensive real estate platform
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
                  <Home className="w-8 h-8 text-teal-500" />
                  <span className="text-2xl font-bold text-gray-900">Havenhunt</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-600">
                  Sign in to your account to continue your property search
                </p>
              </div>

              

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-900">
                      Username
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end text-sm">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      Sign in
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </form>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/registration" className="text-teal-600 hover:text-teal-500 font-medium transition-colors">
                  Sign up for free
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HavenHuntLogin

"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await axios.post("https://backend-1-x1gx.onrender.com//api/login/", { username, password })

      localStorage.setItem("username", res.data.username)
      localStorage.setItem("loggedInUser", res.data.username)
      localStorage.setItem("first_name", res.data.first_name)
      localStorage.setItem("last_name", res.data.last_name)
      localStorage.setItem("email", res.data.email)
      localStorage.setItem("userRole", res.data.role) // ✅ This was missing

      setLoggedInUser(res.data.username)
      alert(`Hello, ${res.data.username}`)
      navigate("/")
    } catch (error) {
      alert("Login failed. Invalid credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 peer bg-white/50 backdrop-blur-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder=" "
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 peer bg-white/50 backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75">
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/registration"
                className="text-blue-600 hover:text-indigo-600 font-semibold transition-colors duration-300"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

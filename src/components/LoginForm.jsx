"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import FloatingInput from "./FloatingInput" // ✅ still using your component

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await axios.post("https://back1-i39m.onrender.com/api/login/", { username, password })

      localStorage.setItem("username", res.data.username)
      localStorage.setItem("loggedInUser", res.data.username)
      localStorage.setItem("first_name", res.data.first_name)
      localStorage.setItem("last_name", res.data.last_name)
      localStorage.setItem("email", res.data.email)
      localStorage.setItem("userRole", res.data.role)

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* ✅ Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.svg" // 🔄 replace with your logo path
              alt="Logo"
              className="h-12 w-12"
            />
          </div>
          <h2 className="text-2xl font-semibold">Sign In</h2>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <FloatingInput
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      
        {/* ✅ Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/registration" className="text-blue-600 hover:underline no-underline">
            Don’t have an account? Sign up
          </a>
          
        </div>
      </div>
    </div>
  )
}

export default LoginForm

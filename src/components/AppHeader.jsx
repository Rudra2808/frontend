"use client"

import { useState } from "react"

const AppHeader = ({ loggedInUser, userData, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false)

  const initials = userData ? `${userData.first_name?.[0] ?? ""}${userData.last_name?.[0] ?? ""}`.toUpperCase() : ""

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
            🏠 Real Estate Pro
          </h1>

          {!loggedInUser ? (
            <div className="flex gap-3">
              <a
                href="/login"
                className="text-gray-700 no-underline hover:text-blue-600 font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Login
              </a>
              <a
                href="/registration"
                className="bg-gradient-to-r no-underline from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register
              </a>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                  {initials}
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-semibold text-gray-800">
                    {userData.first_name} {userData.last_name}
                  </div>
                  <div className="text-sm text-gray-500">@{userData.username}</div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showMenu ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showMenu && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
<div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200/50 rounded-2xl shadow-2xl z-50 animate-slide-down">
                    {/* User Info Section */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-lg text-gray-800">
                            {userData.first_name} {userData.last_name}
                          </div>
                          <div className="text-sm text-gray-500">@{userData.username}</div>
                          <div className="text-xs text-gray-400">{userData.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100/80 rounded-xl no-underline text-gray-700 transition-all duration-300 group"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">⚙️</span>
                        <span className="font-medium">Settings</span>
                      </a>
                      <a
                        href="/viewproperties"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100/80 rounded-xl no-underline text-gray-700 transition-all duration-300 group"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">🏠</span>
                        <span className="font-medium">Browse Properties</span>
                      </a>
                      <a
                        href="/predict-price"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100/80 rounded-xl no-underline text-gray-700 transition-all duration-300 group"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">📊</span>
                        <span className="font-medium">Price Predictor</span>
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600 transition-all duration-300 group"
                      >
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">🚪</span>
                        <span className="font-medium">Sign out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default AppHeader

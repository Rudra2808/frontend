"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const AppHeader = ({ loggedInUser, userData, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false)
   const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)
     const [showPredictorDropdown, setShowPredictorDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const initials = userData ? `${userData.first_name?.[0] ?? ""}${userData.last_name?.[0] ?? ""}`.toUpperCase() : ""
  const propertyDropdownRef = useRef(null)
    const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    const predictorDropdownRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        propertyDropdownRef.current &&
        !propertyDropdownRef.current.contains(event.target)
      ) {
        setShowPropertyDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/">
  <img
    src="/assests/Havenhunt_Logo_Earth_Tones_and_Turquoise-removebg-preview.png"
    alt="HavenHunt Real Estate"
    className="w-24 cursor-pointer"
  />
</Link>        
          {/* Left menu */}
          <div className="hidden md:flex gap-6 items-center relative text-teal-800">
              <a
                href="/"
                className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
              >
                Contact
              </a>
              
              {/* Additional menu items only for logged in users */}
              {loggedInUser && (
                <>
                  <a
                    href="/aggrement"
                    className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
                  >
                    aggrement
                  </a>
                  <a
                    href="/prop"
                    className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
                  >
                    properties
                  </a>
                  <a
                    href="/wishlist"
                    className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
                  >
                    wishlist
                  </a>
                  <a
                    href="/my-agreements"
                    className="text-teal-500 hover:text-teal-800 font-medium no-underline transition-colors duration-300"
                  >
                    My Agreements
                  </a>

                  <div className="relative" ref={predictorDropdownRef}>
                <button
                  onClick={() => setShowPredictorDropdown((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-teal-800 text-teal-500 font-medium transition-colors duration-300"
                >
                  Predictors
                  <svg
                    className={`w-4 h-4 mt-0.5 transition-transform duration-300 ${
                      showPredictorDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showPredictorDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <a
                        href="/predict-price"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">📊</span>
                        <span className="font-medium">Price Predictor</span>
                      </a>
                      <a
                        href="/rent-price"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">🏠</span>
                        <span className="font-medium">Rent Predictorr</span>
                      </a>
                  </div>
                )}
              </div>
                </>
              )}
            </div>

          {/* Right menu */}
          {!loggedInUser ? (
            <div className="flex gap-3">
              <a
                href="/login"
                className="text-gray-700 no-underline hover:text-teal-600 font-medium px-4 py-2 rounded-lg hover:bg-teal-50 transition-all"
              >
                Login
              </a>
              <a
                href="/registration"
                className="bg-gradient-to-r no-underline from-teal-600 to-teal-800 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-800 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {initials}
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-semibold text-gray-800">
                    {userData.first_name} {userData.last_name}
                  </div>
                  <div className="text-sm text-gray-500">@{userData.username}</div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    showMenu ? "rotate-180" : ""
                  }`}
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
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 animate-slide-down">
                    {/* User Info */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
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
                       <div className="lg:hidden border-t mt-2 pt-2">
                        <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">🏠</span>
                        <span className="font-medium">Home</span>
                      </a>
                      <a
                        href="/about"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">ℹ️</span>
                        <span className="font-medium">About</span>
                      </a>
                      <a
                        href="/contact"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">📞</span>
                        <span className="font-medium">Contact</span>
                      </a>
                      <a
                        href="/aggrement"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">📑</span>
                        <span className="font-medium">Aggrement</span>
                      </a>
                      <a
                        href="/prop"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">🏘</span>
                        <span className="font-medium">Properties</span>
                      </a>                      <a
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">❤️</span>
                        <span className="font-medium">Wishlist</span>
                      </a>
                      <a
                        href="/my-agreements"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">📋</span>
                        <span className="font-medium">My Agreements</span>
                      </a>
            <button
                        onClick={() => setShowPredictorDropdown(!showPredictorDropdown)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600"
                      >
                        <span className="text-lg">🔮</span>
                        <span className="font-medium">Predictors</span>
                      </button>
      {showPredictorDropdown && (
        <div className="pl-6">
          <a
                        href="/predict-price"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">📊</span>
                        <span className="font-medium">Price Predictor</span>
                      </a>
                      <a
                        href="/rent-price"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">🏠</span>
                        <span className="font-medium">Rent Predictorr</span>
                      </a>
        </div>
      )}
    </div>  
                      <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                      >
                        <span className="text-lg">⚙️</span>
                        <span className="font-medium">Settings</span>
                      </a>
                



                      
                       {userRole === "seller" && (
                <>
                  <a
                    href="/addproperty"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                  >
                    <span className="text-lg">+</span>
                    Add Property
                  </a>
                  <a
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-teal-500 hover:text-teal-800 no-underline"
                  >
                    <span className="text-lg">⚙</span>
                    Admin Panel
                  </a>
                </>
              )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600"
                      >
                        <span className="text-lg">🚪</span>
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

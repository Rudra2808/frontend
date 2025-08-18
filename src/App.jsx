"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom"

import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import ViewProperties from "./components/ViewProperties"
import AddProperty from "./components/AddProperty"
import PrivateRoute from "./components/PrivateRoute"
import LogoutConfirmModal from "./components/LogoutConfirmModal"
import AppHeader from "./components/AppHeader"
import Settings from "./components/Settings"
import AdminPage from "./components/AdminPage"
import WishlistPage from "./components/WishlistPage"
import PropertyDetails from "./components/PropertyDetails"
import PricePredictor from "./components/PricePredictor" // ✅ Import Predictor
import RentPredictor from "./components/RentPredictor"
import PropertiesPage from "./components/PropertiesPage"
import Aboutus from "./components/Aboutus"
import Contect from "./components/Contect"
import UserList from "./components/UserList"
import Agreement from "./components/Agreement"
import Footer from "./components/Footer"
function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"))
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = {
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("loggedInUser"),
    }
    setUserData(storedUser)
  }, [loggedInUser])

  const handleLogoutConfirm = () => {
    localStorage.clear()
    setLoggedInUser(null)
    setUserData(null)
    setShowLogoutConfirm(false)
    navigate("/")
  }

  const role = localStorage.getItem("userRole") // seller or buyer
  console.log(role)
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    
      <AppHeader loggedInUser={loggedInUser} userData={userData} handleLogout={() => setShowLogoutConfirm(true)} />

      <LogoutConfirmModal
        show={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center py-20">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
                    Welcome to Real Estate Pro
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 animate-slide-up">
                    Discover your dream property with our advanced search and prediction tools
                  </p>
                  {!loggedInUser && (
                    <div className="flex gap-4 justify-center animate-slide-up">
                      <Link
                        to="/login"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/viewproperties"
                        className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        Browse Properties
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route
  path="/login"
  element={
    loggedInUser ? (
      <Navigate to="/" replace />
    ) : (
      <LoginForm setLoggedInUser={setLoggedInUser} />
    )
  }
/>

<Route
  path="/registration"
  element={
    loggedInUser ? (
      <Navigate to="/" replace />
    ) : (
      <RegisterForm />
    )
  }
/>

          <Route path="/prop" element={<PropertiesPage />} />

          <Route
            path="/viewproperties"
            element={
              <PrivateRoute>
                <ViewProperties />
              </PrivateRoute>
            }
          />
          <Route
            path="/addproperty"
            element={
              loggedInUser && role === "seller" ? (
                <PrivateRoute>
                  <AddProperty listedBy={loggedInUser} />
                </PrivateRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              loggedInUser && role === "seller" ? (
                <PrivateRoute>
                  <AdminPage username={loggedInUser} />
                </PrivateRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/property/:id"
            element={
              <PrivateRoute>
                <PropertyDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/predict-price"
            element={
              <PrivateRoute>
                <PricePredictor />
              </PrivateRoute>
            }
          />
          <Route
            path="/rent-price"
            element={
              <PrivateRoute>
                <RentPredictor />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<div className="text-center">404 - Page Not Found</div>} />
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/contact" element={<Contect/>} />
          <Route path="/userlist" element={<UserList/>} />
          <Route path="/aggrement" element={<Agreement/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App

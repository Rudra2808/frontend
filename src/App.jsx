import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ViewProperties from './components/ViewProperties';
import AddProperty from './components/AddProperty';
import PrivateRoute from './components/PrivateRoute';
import LogoutConfirmModal from './components/LogoutConfirmModal';
import AppHeader from './components/AppHeader';
import Settings from './components/Settings';
import AdminPage from './components/AdminPage';
import WishlistPage from './components/WishlistPage';
import PropertyDetails from './components/PropertyDetails';
import PricePredictor from "./components/PricePredictor"; // ✅ Import Predictor
import RentPredictor from './components/RentPredictor';
function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'));
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = {
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
      email: localStorage.getItem('email'),
      username: localStorage.getItem('loggedInUser'), 
    };
    setUserData(storedUser);
  }, [loggedInUser]);

  const handleLogoutConfirm = () => {
    localStorage.clear();
    setLoggedInUser(null);
    setUserData(null);
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const role = localStorage.getItem('userRole'); // seller or buyer
  console.log(role)
  return (
    <div className="p-4 relative min-h-screen bg-gray-100">
      {/* Top Header */}
      {role === 'seller' && (
        <Link to="/addproperty">Add Property</Link>
      )}
      {role === 'seller' && (
        <Link to="/admin" className="text-blue-600">Admin Panel</Link>
      )}

      <AppHeader
        loggedInUser={loggedInUser}
        userData={userData}
        handleLogout={() => setShowLogoutConfirm(true)}
      />

      {/* Logout Modal */}
      <LogoutConfirmModal
        show={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<div className="text-center">Welcome to the Real Estate App!</div>} />
        <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
        <Route path="/registration" element={<RegisterForm />} />
        <Route path="/viewproperties" element={<PrivateRoute><ViewProperties /></PrivateRoute>} />
        <Route path="/addproperty" element={loggedInUser && role === 'seller' ? (<PrivateRoute><AddProperty listedBy={loggedInUser} /></PrivateRoute>) : (<Navigate to="/" />)} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/admin" element={loggedInUser && role === 'seller' ? (<PrivateRoute><AdminPage username={loggedInUser} /></PrivateRoute>) : (<Navigate to="/" />)} />
        <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />

        {/* ✅ New Price Predictor Route */}
        <Route path="/predict-price" element={<PrivateRoute><PricePredictor /></PrivateRoute>} />
        <Route path="/rent-price" element={<PrivateRoute><RentPredictor /></PrivateRoute>} />

        <Route path="*" element={<div className="text-center">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

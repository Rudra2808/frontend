import React, { useState } from 'react';

const AppHeader = ({ loggedInUser, userData, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

 const initials = userData
  ? `${userData.first_name?.[0] ?? ''}${userData.last_name?.[0] ?? ''}`.toUpperCase()
  : '';
  // console.log(userData.username)
  return (
    <nav className="flex justify-between items-center mb-6 px-4">
        {/* <div className="font-bold text-lg">{userData.first_name} {userData.last_name}</div> */}
      <h1 className="text-2xl font-bold">Real Estate App</h1>

      {!loggedInUser ? (
        <div className="space-x-4">
          <a href="/login" className="text-blue-600">Login</a>
          <a href="/registration" className="text-blue-600">Register</a>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
          >
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
              {initials}
            </div>
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
              <div className="p-4 border-b">
                <div className="font-bold text-lg">{userData.first_name} {userData.last_name}</div>
                <div className="text-sm text-gray-500">{userData.username}</div>
              </div>
              <ul className="text-sm">
  <li>
    <a
      href="/settings"
      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
    >
      Settings
    </a>
  </li>
  <li>
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
    >
      Sign out
    </button>
  </li>
</ul>

            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default AppHeader;

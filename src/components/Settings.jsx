"use client"

import { useState } from "react"

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "english",
  })

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">User Settings</h2>
            <p className="text-gray-600 text-lg">Customize your experience</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">👤</span>
                Profile Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🔔</span>
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  {
                    key: "notifications",
                    label: "Push Notifications",
                    desc: "Receive notifications about new properties and updates",
                  },
                  {
                    key: "emailUpdates",
                    label: "Email Updates",
                    desc: "Get weekly property recommendations via email",
                  },
                  { key: "darkMode", label: "Dark Mode", desc: "Switch to dark theme for better viewing experience" },
                ].map((setting, index) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-4 bg-white/40 rounded-xl border border-white/20 hover:bg-white/60 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{setting.label}</h4>
                      <p className="text-sm text-gray-600">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(setting.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        settings[setting.key] ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          settings[setting.key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🔒</span>
                Privacy & Security
              </h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-white/40 rounded-xl border border-white/20 hover:bg-white/60 transition-all duration-200 transform hover:scale-105">
                  <h4 className="font-semibold text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </button>
                <button className="w-full text-left p-4 bg-white/40 rounded-xl border border-white/20 hover:bg-white/60 transition-all duration-200 transform hover:scale-105">
                  <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </button>
                <button className="w-full text-left p-4 bg-white/40 rounded-xl border border-white/20 hover:bg-white/60 transition-all duration-200 transform hover:scale-105">
                  <h4 className="font-semibold text-gray-900">Privacy Settings</h4>
                  <p className="text-sm text-gray-600">Control who can see your profile and listings</p>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

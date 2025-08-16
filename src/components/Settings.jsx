"use client"

import { useState } from "react"
import FloatingInput from "./FloatingInput"

const Settings = () => {
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "english",
  })

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    alert("Settings saved ✅")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl">
        {/* ✅ Logo + Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.svg" // 🔄 replace with your logo
              alt="Logo"
              className="h-12 w-12"
            />
          </div>
          <h2 className="text-2xl font-semibold">User Settings</h2>
          <p className="text-gray-600 mt-1 text-sm">Manage your profile and preferences</p>
        </div>

        {/* ✅ Settings Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <FloatingInput
              id="fullName"
              name="fullName"
              label="Full Name"
              value={settings.fullName}
              onChange={handleChange}
            />
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={settings.email}
              onChange={handleChange}
            />
            <FloatingInput
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              value={settings.phone}
              onChange={handleChange}
            />
            <FloatingInput
              id="location"
              name="location"
              label="Location"
              value={settings.location}
              onChange={handleChange}
            />
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            {[
              {
                key: "notifications",
                label: "Push Notifications",
                desc: "Get alerts for new properties and updates",
              },
              {
                key: "emailUpdates",
                label: "Email Updates",
                desc: "Receive weekly recommendations via email",
              },
              {
                key: "darkMode",
                label: "Dark Mode",
                desc: "Switch to a dark theme for better viewing",
              },
            ].map((pref) => (
              <div
                key={pref.key}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{pref.label}</h4>
                  <p className="text-sm text-gray-500">{pref.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle(pref.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    settings[pref.key] ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      settings[pref.key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
            <button
              type="button"
              className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50 transition"
            >
              Change Password
            </button>
            <button
              type="button"
              className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50 transition"
            >
              Two-Factor Authentication
            </button>
            <button
              type="button"
              className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-50 transition"
            >
              Privacy Settings
            </button>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings

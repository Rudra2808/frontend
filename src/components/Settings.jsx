"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import FloatingInput from "./FloatingInput"

const Settings = () => {
  const storedUsername = typeof window !== "undefined" ? localStorage.getItem("username") : ""

  const [profile, setProfile] = useState({
    username: storedUsername || "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    role: "",
    id_card_type: "",
    id_card_number: "",
  })

  const [prefs, setPrefs] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: "english",
  })

  const [saving, setSaving] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [passwords, setPasswords] = useState({ old_password: "", new_password: "", confirm_password: "" })

  const initials = useMemo(
    () => `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase(),
    [profile.first_name, profile.last_name]
  )

  useEffect(() => {
    const username = storedUsername
    if (!username) return

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000//api/users/${username}/`)
        setProfile(res.data)
      } catch (e) {
        console.error(e)
        alert("Failed to load profile")
      }
    }
    fetchProfile()
  }, [storedUsername])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((p) => ({ ...p, [name]: value }))
  }

  const handlePrefToggle = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    if (!profile.username) return
    setSaving(true)
    try {
      const payload = { ...profile }
      delete payload.username
      delete payload.role
      await axios.put(`http://localhost:8000//api/users/${profile.username}/`, payload)
      alert("Profile updated ✅")
    } catch (e) {
      console.error(e)
      const msg = e.response?.data ? JSON.stringify(e.response.data) : "Update failed"
      alert(msg)
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    if (!profile.username) return
    if (passwords.new_password !== passwords.confirm_password) {
      alert("New password and confirmation do not match")
      return
    }
    setPwLoading(true)
    try {
      await axios.post(`http://localhost:8000//api/users/${profile.username}/change-password/`, {
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      })
      alert("Password updated ✅")
      setPasswords({ old_password: "", new_password: "", confirm_password: "" })
    } catch (e) {
      console.error(e)
      const msg = e.response?.data ? JSON.stringify(e.response.data) : "Password change failed"
      alert(msg)
    } finally {
      setPwLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-800 text-white flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {profile.first_name} {profile.last_name}
                </div>
                <div className="text-sm text-gray-500">@{profile.username}</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <div><span className="text-gray-500">Role:</span> {profile.role || "-"}</div>
              <div><span className="text-gray-500">Email:</span> {profile.email || "-"}</div>
              <div><span className="text-gray-500">Phone:</span> {profile.mobile_number || "-"}</div>
            </div>
          </div>

          {/* Preferences section removed as requested */}
        </div>

        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile form */}
          <form onSubmit={saveProfile} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 space-y-4 animate-slide-up">
            <div className="text-lg font-medium text-teal-700">Profile Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput id="first_name" name="first_name" label="First Name" value={profile.first_name} onChange={handleProfileChange} />
              <FloatingInput id="last_name" name="last_name" label="Last Name" value={profile.last_name} onChange={handleProfileChange} />
              <FloatingInput id="email" name="email" type="email" label="Email" value={profile.email} onChange={handleProfileChange} />
              <FloatingInput id="mobile_number" name="mobile_number" type="tel" label="Mobile Number" value={profile.mobile_number} onChange={handleProfileChange} />
              <div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Change password */}
          <form onSubmit={changePassword} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 space-y-4 animate-slide-up">
            <div className="text-lg font-medium text-teal-700">Change Password</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput id="old_password" label="Current Password" type="password" value={passwords.old_password} onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })} />
              <FloatingInput id="new_password" label="New Password" type="password" value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} />
              <FloatingInput id="confirm_password" label="Confirm New Password" type="password" value={passwords.confirm_password} onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })} />
            </div>
            <button
              type="submit"
              disabled={pwLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-60"
            >
              {pwLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings

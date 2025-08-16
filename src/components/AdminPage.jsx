"use client"

import { useEffect, useState } from "react"

const AdminPage = ({ username }) => {
  const [properties, setProperties] = useState([])
  const [callbacks, setCallbacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [propertiesRes, callbacksRes] = await Promise.all([
          fetch(`http://localhost:8000//api/properties/seller/${username}/`),
          fetch(`http://localhost:8000//api/callbacks/seller/${username}/`),
        ])

        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json()
          setProperties(propertiesData)
        }

        if (callbacksRes.ok) {
          const callbacksData = await callbacksRes.json()
          setCallbacks(callbacksData)
        }
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your properties and customer inquiries</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold">{properties.length}</div>
              <div className="text-blue-100">Listed Properties</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold">{callbacks.length}</div>
              <div className="text-green-100">Customer Inquiries</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              My Listed Properties
            </h2>

            {properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <p className="text-gray-500 text-lg">No properties listed yet</p>
                <a
                  href="/addproperty"
                  className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Add Your First Property
                </a>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Property</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((prop, index) => (
                      <tr
                        key={prop.id}
                        className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">{prop.title}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-green-600">₹{prop.price?.toLocaleString()}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-600">
                            {prop.city}, {prop.state}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              prop.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {prop.is_available ? "✅ Available" : "❌ Sold"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">📞</span>
              Customer Inquiries
            </h2>

            {callbacks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📞</div>
                <p className="text-gray-500 text-lg">No customer inquiries yet</p>
                <p className="text-gray-400 mt-2">
                  Inquiries will appear here when customers show interest in your properties
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Contact</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Property</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {callbacks.map((cb, index) => (
                      <tr
                        key={cb.id}
                        className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">{cb.buyer_name}</div>
                          <div className="text-sm text-gray-500">{cb.email_id}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-blue-600 font-medium">{cb.phone_no}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-700">{cb.property}</div>
                        </td>
                        <td className="py-4 px-6">
                          <a
                            href={`tel:${cb.phone_no}`}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                          >
                            <span>📞</span>
                            Call Now
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

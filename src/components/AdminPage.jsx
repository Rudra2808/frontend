"use client"

import { useEffect, useState } from "react"

const AdminPage = ({ username }) => {
  const [properties, setProperties] = useState([])
  const [callbacks, setCallbacks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rentals, setRentals] = useState([])
  const handleRemoveRental = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/rentals/${id}/remove/`, {
      method: "DELETE",
    });

    if (res.ok) {
      setRentals((prev) => prev.filter((r) => r.id !== id));
      alert("Rental removed successfully!");
    } else {
      console.error("Failed to remove rental");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

const rentedProperties = properties.filter((p) => p.is_rental === true)
  const handleMarkAsRented = async (id, file) => {
  const formData = new FormData()
  formData.append("agreement", file)

  try {
    const res = await fetch(`http://localhost:8000/api/properties/${id}/mark-as-rented/`, {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      alert("Property marked as rented successfully!")

      // update UI
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_available: false } : p))
      )
    } else {
      console.error("Failed to mark as rented")
    }
  } catch (err) {
    console.error("Error:", err)
  }
}

  // ✅ Mark inquiry as called
  const handleMarkCalled = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/callbacks/${id}/mark-called/`, {
        method: "POST",
      })

      if (res.ok) {
        // remove it from local state so only uncalled inquiries remain
        setCallbacks((prev) => prev.filter((cb) => cb.id !== id))
      } else {
        console.error("Failed to mark as called")
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  // ✅ Remove property (set is_available = false)
  const handleRemoveProperty = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/properties/${id}/remove/`, {
        method: "POST",
      })

      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, is_available: false } : p))
        )
      } else {
        console.error("Failed to remove property")
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [propertiesRes, callbacksRes, rentalsRes] = await Promise.all([
  fetch(`http://localhost:8000/api/properties/seller/${username}/`),
  fetch(`http://localhost:8000/api/callbacks/seller/${username}/`),
  fetch(`http://localhost:8000/api/rentals/seller/${username}/`)
])

if (rentalsRes.ok) {
  const rentalsData = await rentalsRes.json()
  setRentals(rentalsData)
}

        
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json()
          setProperties(propertiesData)
        }

        if (callbacksRes.ok) {
          const callbacksData = await callbacksRes.json()
          // 🔥 keep only uncalled inquiries
          setCallbacks(callbacksData.filter((cb) => !cb.called))
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
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
        <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Stats */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-teal-800 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
           <p className="text-gray-600 text-lg">Manage your properties and customer inquiries</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold">{properties.length}</div>
              <div className="text-teal-100">Listed Properties</div>
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold">{callbacks.length}</div>
              <div className="text-teal-100">Customer Inquiries</div>
            </div>
          </div>
        </div>

        {/* My Listed Properties */}
        <div className="mb-12">
 <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-100 p-8">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
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
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
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
                          <div className="font-bold text-green-600">
                            ₹{prop.price?.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-600">
                            {prop.city}, {prop.state}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      prop.is_available
        ? "bg-teal-100 text-teal-800"
        : "bg-gray-200 text-gray-600"
    }`}
  >
                            {prop.is_available ? "✅ Available" : "❌ Sold"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleRemoveProperty(prop.id)}
                            disabled={!prop.is_available}
                            className={`px-4 py-2 rounded-lg ${
                              prop.is_available
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
{/* ✅ Rented Properties Section */}
        <div className="mb-12">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-100 p-8">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">🏘️</span>
              My Rented Properties
            </h2>

            {rentedProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏘️</div>
                <p className="text-gray-500 text-lg">No rented properties listed yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Property</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Rent</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentedProperties.map((prop, index) => (
                      <tr
                        key={prop.id}
                        className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">{prop.title}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-green-600">
                            ₹{prop.price?.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-600">
                            {prop.city}, {prop.state}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              prop.is_available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {prop.is_available ? "✅ Available" : "❌ Not Available"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleRemoveProperty(prop.id)}
                            disabled={!prop.is_available}
                            className={`px-4 py-2 rounded-lg ${
                              prop.is_available
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            Remove
                          </button>
                        </td>
                        <td className="py-4 px-6 flex gap-2">
  <label className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
    Mark as Rented
    <input
      type="file"
      accept="application/pdf"
      className="hidden"
      onChange={(e) => {
        if (e.target.files[0]) {
          handleMarkAsRented(prop.id, e.target.files[0])
        }
      }}
    />
  </label>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* ✅ Currently Rented Properties */}
<div className="mb-12">
   <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-100 p-8">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
      <span className="text-2xl">📑</span>
      Currently Rented Properties
    </h2>

    {rentals.length === 0 ? (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📑</div>
        <p className="text-gray-500 text-lg">No active rentals</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Property</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Agreement</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Rented On</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th> {/* ✅ new */}

            </tr>
          </thead>
          <tbody>
            {rentals.map((rental, index) => (
              <tr
                key={rental.id}
                className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="py-4 px-6">
                  <div className="font-semibold text-gray-800">{rental.property.title}</div>
                  <div className="text-gray-500 text-sm">
                    {rental.property.city}, {rental.property.state}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {rental.tenant_agreement ? (
                    <a
                      href={rental.tenant_agreement}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline no-underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-gray-500">No agreement</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {new Date(rental.rented_on).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
        <button
          onClick={() => handleRemoveRental(rental.id)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Remove
        </button>
      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>

        {/* Customer Inquiries */}
        <div>
           <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-100 p-8">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">📞</span>
              Customer Inquiries
            </h2>

            {callbacks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📞</div>
                <p className="text-gray-500 text-lg">No customer inquiries yet</p>
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
                        <td className="py-4 px-6 flex gap-2">
                          <a
                            href={`tel:${cb.phone_no}`}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                          >
                            <span>📞</span>
                            Call Now
                          </a>

                          <button
                            onClick={() => handleMarkCalled(cb.id)}
                            className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600"
                          >
                            Mark as Called
                          </button>
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

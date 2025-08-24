"use client"

import { useEffect, useState } from "react"

const AdminPage = ({ username }) => {
  const [properties, setProperties] = useState([])
  const [callbacks, setCallbacks] = useState([])
  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rentals, setRentals] = useState([])
  const handleRemoveRental = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000//api/rentals/${id}/remove/`, {
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
    const res = await fetch(`http://localhost:8000//api/properties/${id}/mark-as-rented/`, {
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
      const res = await fetch(`http://localhost:8000//api/callbacks/${id}/mark-called/`, {
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
      const res = await fetch(`http://localhost:8000//api/properties/${id}/remove/`, {
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
  fetch(`http://localhost:8000//api/properties/seller/${username}/`),
  fetch(`http://localhost:8000//api/callbacks/seller/${username}/`),
  fetch(`http://localhost:8000//api/rentals/seller/${username}/`)
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
                        <td className="py-4 px-6 flex gap-2">
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
                          <button
                            onClick={() => { setEditing(prop); setEditOpen(true) }}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Update
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
      {editOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditOpen(false)} />
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Update Property</h3>
              <button onClick={() => setEditOpen(false)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">✕</button>
            </div>

            <EditPropertyForm
              initial={editing}
              onCancel={() => setEditOpen(false)}
              onSaved={(updated) => {
                setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
                setEditOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage

const EditPropertyForm = ({ initial, onCancel, onSaved }) => {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    price: initial.price || "",
    address: initial.address || "",
    city: initial.city || "",
    state: initial.state || "",
    zip_code: initial.zip_code || "",
    property_type: initial.property_type || "AP",
    is_rental: initial.is_rental || false,
    is_available: typeof initial.is_available === 'boolean' ? initial.is_available : true,
    project_area: initial.project_area || "",
    size: initial.size || "",
    project_size: initial.project_size || "",
    launch_date: initial.launch_date || "",
    avg_price: initial.avg_price || "",
    possession_status: initial.possession_status || "",
    configuration: initial.configuration || "",
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`http://localhost:8000//api/properties/${initial.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to update')
      const updated = await res.json()
      onSaved(updated)
    } catch (e) {
      alert('Update failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded-lg px-3 py-2" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded-lg px-3 py-2" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border rounded-lg px-3 py-2" />
      <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border rounded-lg px-3 py-2" />
      <input name="zip_code" value={form.zip_code} onChange={handleChange} placeholder="Zip Code" className="border rounded-lg px-3 py-2" />
      <select name="property_type" value={form.property_type} onChange={handleChange} className="border rounded-lg px-3 py-2">
        <option value="AP">Apartment</option>
        <option value="HS">House</option>
        <option value="VL">Villa</option>
        <option value="CM">Commercial</option>
      </select>
      <label className="flex items-center gap-2 mt-1">
        <input type="checkbox" name="is_rental" checked={form.is_rental} onChange={handleChange} /> For Rent
      </label>
      <label className="flex items-center gap-2 mt-1">
        <input type="checkbox" name="is_available" checked={form.is_available ?? true} onChange={(e)=> setForm((f)=> ({...f, is_available: e.target.checked}))} /> Available
      </label>
      <input name="project_area" value={form.project_area} onChange={handleChange} placeholder="Project Area" className="border rounded-lg px-3 py-2" />
      <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="border rounded-lg px-3 py-2" />
      <input name="project_size" value={form.project_size} onChange={handleChange} placeholder="Project Size" className="border rounded-lg px-3 py-2" />
      <input name="launch_date" value={form.launch_date} onChange={handleChange} placeholder="Launch Date" className="border rounded-lg px-3 py-2" />
      <input name="avg_price" value={form.avg_price} onChange={handleChange} placeholder="Avg Price" className="border rounded-lg px-3 py-2" />
      <input name="possession_status" value={form.possession_status} onChange={handleChange} placeholder="Possession Status" className="border rounded-lg px-3 py-2" />
      <input name="configuration" value={form.configuration} onChange={handleChange} placeholder="Configuration" className="border rounded-lg px-3 py-2 md:col-span-2" />
      <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border rounded-lg px-3 py-2 md:col-span-2" />

      <div className="md:col-span-2 flex justify-end gap-2 mt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import axios from "axios"

const AddPropertyForm = ({ listedBy }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "AP",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    is_available: true,
    is_rental: false,
    project_area: "",
    size: "",
    project_size: "",
    launch_date: "",
    avg_price: "",
    possession_status: "",
    configuration: "",
  })
  const [image, setImage] = useState(null)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleFileChange = (e) => {
    setImages(e.target.files) // multiple files
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const data = new FormData()
    for (const key in form) {
      data.append(key, form[key])
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i])
      }
    }

    data.append("listed_by", listedBy)

    try {
      await axios.post("https://backend-1-x1gx.onrender.com//api/properties/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("Property added successfully!")
      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        property_type: "AP",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        is_available: true,
        is_rental: false,
        project_area: "",
        size: "",
        project_size: "",
        launch_date: "",
        avg_price: "",
        possession_status: "",
        configuration: "",
      })
      setImages([])
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data)
        alert(`Error: ${JSON.stringify(error.response.data)}`)
      } else {
        alert("Something went wrong")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Add New Property
            </h2>
            <p className="text-gray-600">Fill in the details to list your property</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">📝</span>
                  Basic Information
                </h3>
              </div>

              <div className="relative">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Property Title"
                  required
                />
              </div>

              <div className="relative">
                <select
                  name="property_type"
                  value={form.property_type}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  required
                >
                  <option value="AP">🏢 Apartment</option>
                  <option value="HS">🏠 House</option>
                  <option value="VL">🏡 Villa</option>
                  <option value="CM">🏢 Commercial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm h-32 resize-none"
                  placeholder="Property Description"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Price (₹)"
                  required
                />
              </div>

              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-green-600">📍</span>
                  Location Details
                </h3>
              </div>

              <div className="md:col-span-2">
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Full Address"
                  required
                />
              </div>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="City"
                required
              />

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="State"
                required
              />

              <input
                name="zip_code"
                value={form.zip_code}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="ZIP Code"
                required
              />

              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-purple-600">🏗️</span>
                  Property Details
                </h3>
              </div>

              <input
                name="project_area"
                value={form.project_area}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Project Area (e.g. 6.8 Acres)"
              />

              <input
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Size (e.g. 3812 sq.ft.)"
              />

              <input
                name="project_size"
                value={form.project_size}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Project Size (e.g. 79 units)"
              />

              <input
                name="launch_date"
                value={form.launch_date}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Launch Date (e.g. Apr, 2025)"
              />

              <input
                name="avg_price"
                value={form.avg_price}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Avg. Price (e.g. 7.58 K/sq.ft)"
              />

              <input
                name="possession_status"
                value={form.possession_status}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Possession Status (e.g. Under Construction)"
              />

              <input
                name="configuration"
                value={form.configuration}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Configuration (e.g. 4 BHK Villa)"
              />

              <input
                name="url"
                value={form.url}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder="Google Maps Embed URL"
              />

              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-orange-600">📸</span>
                  Images & Options
                </h3>
              </div>

              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-300">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-4xl mb-4">📷</div>
                    <p className="text-gray-600 mb-2">Click to upload property images</p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={form.is_available}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    Available for Sale
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="is_rental"
                    checked={form.is_rental}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    Rental Property
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding Property...
                  </>
                ) : (
                  <>
                    <span className="text-lg">🏠</span>
                    Add Property
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPropertyForm

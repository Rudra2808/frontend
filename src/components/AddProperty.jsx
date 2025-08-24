"use client"

import { useState } from "react"
import axios from "axios"
import FloatingInput from "./FloatingInput" 

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
    url: "",
  })
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
    setImages(e.target.files)
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
      await axios.post("http://localhost:8000///api/properties/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("Property added successfully!")
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
        url: "",
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-200 p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-teal-800 bg-clip-text text-transparent mb-2">
              Add New Property
            </h2>
            <p className="text-gray-600">Fill in the details to list your property</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-500">📝</span>
                  Basic Information
                </h3>
              </div>

              <FloatingInput
                id="title"
                name="title"
                label="Title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <select
                  name="property_type"
                  value={form.property_type}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-teal-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300 bg-white/60"
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
                  className="w-full p-4 border-2 border-teal-200 rounded-xl focus:border-teal-500 focus:outline-none transition-all duration-300 bg-white/60 h-32 resize-none"
                  placeholder="Property Description"
                  required
                />
              </div>

              <FloatingInput
                id="price"
                name="price"
                type="number"
                label="Price (₹)"
                value={form.price}
                onChange={handleChange}
                required
              />

              {/* Location Section */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-500">📍</span>
                  Location Details
                </h3>
              </div>

              <div className="md:col-span-2">
                <FloatingInput
                  id="address"
                  name="address"
                  label="Full Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <FloatingInput
                id="city"
                name="city"
                label="City"
                value={form.city}
                onChange={handleChange}
                required
              />

              <FloatingInput
                id="state"
                name="state"
                label="State"
                value={form.state}
                onChange={handleChange}
                required
              />

              <FloatingInput
                id="zip_code"
                name="zip_code"
                label="ZIP Code"
                value={form.zip_code}
                onChange={handleChange}
                required
              />

              {/* Property Details */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-500">🏗️</span>
                  Property Details
                </h3>
              </div>

              <FloatingInput
                id="project_area"
                name="project_area"
                label="Project Area (e.g. 6.8 Acres)"
                value={form.project_area}
                onChange={handleChange}
              />

              <FloatingInput
                id="size"
                name="size"
                label="Size (e.g. 3812 sq.ft.)"
                value={form.size}
                onChange={handleChange}
              />

              <FloatingInput
                id="project_size"
                name="project_size"
                label="Project Size (e.g. 79 units)"
                value={form.project_size}
                onChange={handleChange}
              />

              <FloatingInput
                id="launch_date"
                name="launch_date"
                label="Launch Date (e.g. Apr, 2025)"
                value={form.launch_date}
                onChange={handleChange}
              />

              <FloatingInput
                id="avg_price"
                name="avg_price"
                label="Avg. Price (e.g. 7.58 K/sq.ft)"
                value={form.avg_price}
                onChange={handleChange}
              />

              <FloatingInput
                id="possession_status"
                name="possession_status"
                label="Possession Status (e.g. Under Construction)"
                value={form.possession_status}
                onChange={handleChange}
              />

              <FloatingInput
                id="configuration"
                name="configuration"
                label="Configuration (e.g. 4 BHK Villa)"
                value={form.configuration}
                onChange={handleChange}
              />

              <FloatingInput
                id="url"
                name="url"
                label="Google Maps Embed URL"
                value={form.url}
                onChange={handleChange}
              />

              {/* File upload & checkboxes remain same */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <span className="text-teal-500">📸</span>
                  Images & Options
                </h3>
              </div>

              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center hover:border-teal-500 transition-colors duration-300">
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
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors duration-300">
                    Available for Sale
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="is_rental"
                    checked={form.is_rental}
                    onChange={handleChange}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors duration-300">
                    Rental Property
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-800 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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

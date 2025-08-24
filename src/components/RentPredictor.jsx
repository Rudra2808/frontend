"use client"

import { useState } from "react"
import axios from "axios"

export default function RentPredictor() {
  const [formData, setFormData] = useState({
    area_sqft: "",
    bedrooms: "",
    bathrooms: "",
    floor_number: "",
    total_floors: "",
    furnishing_status: "",
    property_type: "",
    balcony_sqft: "",
    parking_spaces: "",
    amenities_score: "",
    nearby_school_km: "",
    nearby_hospital_km: "",
    nearby_metro_km: "",
    crime_rate: "",
    air_quality_index: "",
  })

  const [predictedRent, setPredictedRent] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePredict = async () => {
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000///api/predict-rent/", {
        area_sqft: Number.parseFloat(formData.area_sqft),
        bedrooms: Number.parseInt(formData.bedrooms),
        bathrooms: Number.parseInt(formData.bathrooms),
        floor_number: Number.parseInt(formData.floor_number),
        total_floors: Number.parseInt(formData.total_floors),
        furnishing_status: formData.furnishing_status, // if your backend expects this, you can encode it there
        property_type: formData.property_type, // same as above
        balcony_sqft: Number.parseFloat(formData.balcony_sqft),
        parking_spaces: Number.parseInt(formData.parking_spaces),
        amenities_score: Number.parseFloat(formData.amenities_score),
        nearby_school_km: Number.parseFloat(formData.nearby_school_km),
        nearby_hospital_km: Number.parseFloat(formData.nearby_hospital_km),
        nearby_metro_km: Number.parseFloat(formData.nearby_metro_km),
        crime_rate: Number.parseFloat(formData.crime_rate),
        air_quality_index: Number.parseFloat(formData.air_quality_index),
      })
      setPredictedRent(res.data.predicted_rent)
    } catch (err) {
      console.error(err)
      alert("Prediction failed. Check backend logs.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-teal-500 to-teal-800 mb-4 shadow-lg">
              <span className="text-3xl">🏠</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Property Rent Predictor</h2>
            <p className="text-gray-600 text-lg">Get accurate rent predictions using AI technology</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(formData).map((field, index) => {
                const fieldConfig = {
                  area_sqft: { icon: "📏", label: "Area (Sq Ft)", type: "number" },
                  bedrooms: { icon: "🛏️", label: "Bedrooms", type: "number" },
                  bathrooms: { icon: "🚿", label: "Bathrooms", type: "number" },
                  floor_number: { icon: "🏢", label: "Floor Number", type: "number" },
                  total_floors: { icon: "🏗️", label: "Total Floors", type: "number" },
                  furnishing_status: { icon: "🪑", label: "Furnishing Status", type: "text" },
                  property_type: { icon: "🏠", label: "Property Type", type: "text" },
                  balcony_sqft: { icon: "🌿", label: "Balcony (Sq Ft)", type: "number" },
                  parking_spaces: { icon: "🚗", label: "Parking Spaces", type: "number" },
                  amenities_score: { icon: "⭐", label: "Amenities Score", type: "number" },
                  nearby_school_km: { icon: "🏫", label: "School Distance (km)", type: "number" },
                  nearby_hospital_km: { icon: "🏥", label: "Hospital Distance (km)", type: "number" },
                  nearby_metro_km: { icon: "🚇", label: "Metro Distance (km)", type: "number" },
                  crime_rate: { icon: "🛡️", label: "Crime Rate", type: "number" },
                  air_quality_index: { icon: "🌬️", label: "Air Quality Index", type: "number" },
                }

                const config = fieldConfig[field] || {
                  icon: "📝",
                  label: field.replace(/_/g, " ").toUpperCase(),
                  type: "text",
                }

                return (
                  <div key={field} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2">{config.icon}</span>
                      {config.label}
                    </label>
                    <div className="relative">
                      <input
                        type={config.type}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder={`Enter ${config.label.toLowerCase()}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </form>

          <div className="text-center mb-8">
            <button
              onClick={handlePredict}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-900 text-white shadow-md hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Predicting...
                </div>
              ) : (
                "🔮 Predict Rent"
              )}
            </button>
          </div>

          {predictedRent !== null && (
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-8 text-center animate-slide-up border border-teal-200">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-800 flex items-center justify-center shadow-md">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Predicted Monthly Rent</h3>
              <p className="text-4xl font-bold text-teal-700 mb-2">₹{predictedRent.toLocaleString()}</p>
              <p className="text-gray-600">Based on current market analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

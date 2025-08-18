"use client"

import { useState } from "react"
import axios from "axios"
import FloatingInput from "./FloatingInput" // ✅ import your floating input

export default function PricePredictor() {
  const [formData, setFormData] = useState({
    area_sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    balcony_sqft: 50,
    year_built: 2015,
    parking_spaces: 1,
    amenities_score: 7,
    nearby_schools_km: 2.0,
    nearby_hospital_km: 1.5,
    nearby_metro_km: 3.0,
    crime_rate: 4.5,
    air_quality_index: 85,
    market_trend_score: 70,
  })

  const [predictedPrice, setPredictedPrice] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePredict = async () => {
    setLoading(true)
    try {
      const payload = {
        area_sqft: Number.parseFloat(formData.area_sqft) || 0,
        bedrooms: Number.parseInt(formData.bedrooms) || 0,
        bathrooms: Number.parseInt(formData.bathrooms) || 0,
        floors: Number.parseInt(formData.floors) || 0,
        balcony_sqft: Number.parseFloat(formData.balcony_sqft) || 0,
        year_built: Number.parseInt(formData.year_built) || 0,
        parking_spaces: Number.parseInt(formData.parking_spaces) || 0,
        amenities_score: Number.parseFloat(formData.amenities_score) || 0,
        nearby_schools_km: Number.parseFloat(formData.nearby_schools_km) || 0,
        nearby_hospital_km: Number.parseFloat(formData.nearby_hospital_km) || 0,
        nearby_metro_km: Number.parseFloat(formData.nearby_metro_km) || 0,
        crime_rate: Number.parseFloat(formData.crime_rate) || 0,
        air_quality_index: Number.parseFloat(formData.air_quality_index) || 0,
        market_trend_score: Number.parseFloat(formData.market_trend_score) || 0,
      }

      const res = await axios.post("https://back1-i39m.onrender.com/api/predict-price/", payload)
      setPredictedPrice(res.data.predicted_price)
    } catch (err) {
      console.error(err)
      alert("Prediction failed. Check backend logs.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-4">
              <span className="text-3xl">🏠</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Property Price Predictor</h2>
            <p className="text-gray-600 text-lg">Get accurate property price predictions using AI</p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(formData).map((field, index) => (
                <div key={field} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <FloatingInput
                    id={field}
                    name={field}
                    label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    type="number"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          </form>

          {/* Predict Button */}
          <div className="text-center mb-8">
            <button
              onClick={handlePredict}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:shadow-lg"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Predicting...
                </div>
              ) : (
                "🔮 Predict Price"
              )}
            </button>
          </div>

          {/* Prediction Result */}
          {predictedPrice !== null && (
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center animate-slide-up border border-green-200">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Predicted Property Price</h3>
              <p className="text-4xl font-bold text-green-600 mb-2">₹{predictedPrice.toLocaleString()}</p>
              <p className="text-gray-600">Based on current market analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

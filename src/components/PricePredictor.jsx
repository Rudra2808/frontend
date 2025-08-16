"use client"

import { useState } from "react"
import axios from "axios"

export default function PricePredictor() {
  const [formData, setFormData] = useState({
    location: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    area_sqft: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    balcony_sqft: "",
    year_built: "",
    property_type: "",
    condition: "",
    parking_spaces: "",
    amenities_score: "",
    nearby_schools_km: "",
    nearby_hospital_km: "",
    nearby_metro_km: "",
    crime_rate: "",
    air_quality_index: "",
    market_trend_score: "",
  })

  const [predictedPrice, setPredictedPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post("https://backend-1-x1gx.onrender.com//api/predict-price/", {
        ...formData,
        latitude: Number.parseFloat(formData.latitude),
        longitude: Number.parseFloat(formData.longitude),
        area_sqft: Number.parseFloat(formData.area_sqft),
        bedrooms: Number.parseInt(formData.bedrooms),
        bathrooms: Number.parseInt(formData.bathrooms),
        floors: Number.parseInt(formData.floors),
        balcony_sqft: Number.parseFloat(formData.balcony_sqft),
        year_built: Number.parseInt(formData.year_built),
        parking_spaces: Number.parseInt(formData.parking_spaces),
        amenities_score: Number.parseFloat(formData.amenities_score),
        nearby_schools_km: Number.parseFloat(formData.nearby_schools_km),
        nearby_hospital_km: Number.parseFloat(formData.nearby_hospital_km),
        nearby_metro_km: Number.parseFloat(formData.nearby_metro_km),
        crime_rate: Number.parseFloat(formData.crime_rate),
        air_quality_index: Number.parseFloat(formData.air_quality_index),
        market_trend_score: Number.parseFloat(formData.market_trend_score),
      })
      setPredictedPrice(res.data.predicted_price)
    } catch (err) {
      console.error(err)
      alert("Prediction failed. Check backend logs.")
    } finally {
      setIsLoading(false)
    }
  }

  const fieldGroups = {
    "Basic Information": ["location", "city", "state", "latitude", "longitude"],
    "Property Details": [
      "area_sqft",
      "bedrooms",
      "bathrooms",
      "floors",
      "balcony_sqft",
      "year_built",
      "property_type",
      "condition",
      "parking_spaces",
    ],
    "Amenities & Environment": [
      "amenities_score",
      "nearby_schools_km",
      "nearby_hospital_km",
      "nearby_metro_km",
      "crime_rate",
      "air_quality_index",
      "market_trend_score",
    ],
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              🏠 Property Price Predictor
            </h2>
            <p className="text-gray-600 text-lg">Get AI-powered price predictions for your property</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {Object.entries(fieldGroups).map(([groupName, fields]) => (
              <div key={groupName} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
                  <span className="text-2xl">
                    {groupName === "Basic Information" ? "📍" : groupName === "Property Details" ? "🏗️" : "🌟"}
                  </span>
                  {groupName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fields.map((field) => (
                    <div key={field} className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </label>
                      {field === "property_type" ? (
                        <select
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="">Select Type</option>
                          <option value="apartment">🏢 Apartment</option>
                          <option value="house">🏠 House</option>
                          <option value="villa">🏡 Villa</option>
                          <option value="commercial">🏢 Commercial</option>
                        </select>
                      ) : field === "condition" ? (
                        <select
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="">Select Condition</option>
                          <option value="excellent">✨ Excellent</option>
                          <option value="good">👍 Good</option>
                          <option value="fair">👌 Fair</option>
                          <option value="poor">👎 Poor</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          placeholder={`Enter ${field.replace(/_/g, " ")}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center pt-6">
              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analyzing Property...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🔮</span>
                    Predict Price
                  </>
                )}
              </button>
            </div>

            {predictedPrice !== null && (
              <div className="mt-8 text-center animate-slide-up">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-2xl font-bold mb-2">Predicted Property Value</h3>
                  <div className="text-4xl font-bold">₹{predictedPrice.toLocaleString()}</div>
                  <p className="text-green-100 mt-2">Based on AI analysis of market data</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

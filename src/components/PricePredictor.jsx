import React, { useState } from "react";
import axios from "axios";

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
    market_trend_score: ""
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/predict-price/", {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        area_sqft: parseFloat(formData.area_sqft),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        floors: parseInt(formData.floors),
        balcony_sqft: parseFloat(formData.balcony_sqft),
        year_built: parseInt(formData.year_built),
        parking_spaces: parseInt(formData.parking_spaces),
        amenities_score: parseFloat(formData.amenities_score),
        nearby_schools_km: parseFloat(formData.nearby_schools_km),
        nearby_hospital_km: parseFloat(formData.nearby_hospital_km),
        nearby_metro_km: parseFloat(formData.nearby_metro_km),
        crime_rate: parseFloat(formData.crime_rate),
        air_quality_index: parseFloat(formData.air_quality_index),
        market_trend_score: parseFloat(formData.market_trend_score)
      });
      setPredictedPrice(res.data.predicted_price);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend logs.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>🏠 Property Price Predictor</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {field.replace(/_/g, " ").toUpperCase()}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
          </div>
        ))}
      </form>

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Predicting..." : "Predict Price"}
      </button>

      {predictedPrice !== null && (
        <h3 style={{ marginTop: "20px", color: "green" }}>
          Predicted Price: ₹{predictedPrice.toLocaleString()}
        </h3>
      )}
    </div>
  );
}

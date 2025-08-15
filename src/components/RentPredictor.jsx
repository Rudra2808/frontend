import React, { useState } from "react";
import axios from "axios";

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
    air_quality_index: ""
  });

  const [predictedRent, setPredictedRent] = useState(null);
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
      const res = await axios.post("http://localhost:8000/api/predict-rent/", {
        area_sqft: parseFloat(formData.area_sqft),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        floor_number: parseInt(formData.floor_number),
        total_floors: parseInt(formData.total_floors),
        furnishing_status: formData.furnishing_status, // if your backend expects this, you can encode it there
        property_type: formData.property_type,         // same as above
        balcony_sqft: parseFloat(formData.balcony_sqft),
        parking_spaces: parseInt(formData.parking_spaces),
        amenities_score: parseFloat(formData.amenities_score),
        nearby_school_km: parseFloat(formData.nearby_school_km),
        nearby_hospital_km: parseFloat(formData.nearby_hospital_km),
        nearby_metro_km: parseFloat(formData.nearby_metro_km),
        crime_rate: parseFloat(formData.crime_rate),
        air_quality_index: parseFloat(formData.air_quality_index),
      });
      setPredictedRent(res.data.predicted_rent);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend logs.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>🏠 Property Rent Predictor</h2>
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
          background: loading ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Predicting..." : "Predict Rent"}
      </button>

      {predictedRent !== null && (
        <h3 style={{ marginTop: "20px", color: "green" }}>
          Predicted Rent: ₹{predictedRent.toLocaleString()}
        </h3>
      )}
    </div>
  );
}

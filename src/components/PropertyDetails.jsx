"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const PropertyDetails = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [callbackForm, setCallbackForm] = useState({
    buyer_name: "",
    email_id: "",
    phone_no: "",
  })

  useEffect(() => {
    axios
      .get(`https://backend-1-x1gx.onrender.com//api/properties/${id}/`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err))
  }, [id])

  const handleCallbackChange = (e) => {
    setCallbackForm({ ...callbackForm, [e.target.name]: e.target.value })
  }

  const submitCallback = async () => {
    if (!callbackForm.buyer_name || !callbackForm.email_id || !callbackForm.phone_no) {
      alert("Please fill in all fields")
      return
    }
    try {
      await axios.post("https://backend-1-x1gx.onrender.com//api/callback/", {
        buyer_name: callbackForm.buyer_name,
        email_id: callbackForm.email_id,
        phone_no: callbackForm.phone_no,
        property_id: property.id,
      })
      alert("Callback request sent successfully!")
      setCallbackForm({ buyer_name: "", email_id: "", phone_no: "" })
      setShowModal(false)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in">
          <div className="relative">
            <div
              id="propertyCarousel"
              className="carousel slide h-96 overflow-hidden rounded-t-3xl"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner h-full">
                {property.images && property.images.length > 0 ? (
                  property.images.map((img, index) => (
                    <div key={img.id} className={`carousel-item h-full ${index === 0 ? "active" : ""}`}>
                      <img
                        src={img.image || "/placeholder.svg"}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        alt={`Property ${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <p className="text-gray-500 text-xl">No images available</p>
                  </div>
                )}
              </div>

              <button
                className="carousel-control-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-200"
                type="button"
                data-bs-target="#propertyCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-200"
                type="button"
                data-bs-target="#propertyCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 animate-slide-up">{property.title}</h1>
                <p className="text-xl text-gray-600 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {property.city}, {property.state}
                </p>
                <p className="text-3xl font-bold text-green-600 mb-6">₹{property.price.toLocaleString()}</p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      label: "Seller",
                      value: `${property.seller_first_name} ${property.seller_last_name}`,
                      icon: "👤",
                    },
                    { label: "Contact", value: property.seller_contact, icon: "📞" },
                    { label: "Project Area", value: property.project_area, icon: "📏" },
                    { label: "Size", value: property.size, icon: "📐" },
                    { label: "Project Size", value: property.project_size, icon: "🏗️" },
                    { label: "Launch Date", value: property.launch_date, icon: "📅" },
                    { label: "Avg. Price", value: property.avg_price, icon: "💰" },
                    { label: "Possession Status", value: property.possession_status, icon: "🔑" },
                    { label: "Configuration", value: property.configuration, icon: "🏠" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:shadow-lg transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                          <p className="text-gray-900 font-semibold">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${property.is_rental ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                  >
                    {property.is_rental ? "🏠 Rental Property" : "🏡 For Sale"}
                  </span>
                </div>
              </div>

              <div className="lg:w-80">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg mb-4"
                  >
                    📞 Request Callback
                  </button>

                  <Link
                    to="/viewproperties"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg inline-block text-center"
                  >
                    ← Back to Properties
                  </Link>
                </div>
              </div>
            </div>
                  




                  




            {property.url && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">📍 Location</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <iframe
                    src={property.url}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="transition-all duration-300 hover:brightness-110"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">📞 Request a Callback</h2>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="buyer_name"
                  placeholder="Your Name"
                  value={callbackForm.buyer_name}
                  onChange={handleCallbackChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email_id"
                  placeholder="Your Email"
                  value={callbackForm.email_id}
                  onChange={handleCallbackChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="phone_no"
                  placeholder="Your Phone Number"
                  value={callbackForm.phone_no}
                  onChange={handleCallbackChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
          
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={submitCallback}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetails

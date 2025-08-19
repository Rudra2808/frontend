"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const ViewProperties = () => {
  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    city: "",
    property_type: "",
    is_rental: "",
  })
const [wishlist, setWishlist] = useState([])

useEffect(() => {
  setIsLoading(true)
  Promise.all([
    axios.get("https://one9back.onrender.com//api/properties/"),
    axios.get(`https://one9back.onrender.com//api/wishlist/?username=${localStorage.getItem("username")}`)
  ])
    .then(([propertiesRes, wishlistRes]) => {
      setProperties(propertiesRes.data)
      setFiltered(propertiesRes.data.filter((p) => p.is_available)) 

      // ✅ Only use property_id (no fallback needed)
     const wishlistIds = wishlistRes.data.map(item => Number(item.id));
setWishlist(wishlistIds);


      console.log("Extracted wishlist IDs:", wishlistIds)
      console.log("Wishlist API response:", wishlistRes.data)
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
    .finally(() => {
      setIsLoading(false)
    })
}, [])

// useEffect(() => {
//   console.log("Wishlist state updated:", wishlist)
// }, [wishlist])


  const addToWishlist = (propertyId) => {
  axios.post("https://one9back.onrender.com//api/wishlist/add/", {
    username: localStorage.getItem("username"),
    property_id: propertyId,
  })
  .then(() => setWishlist((prev) => [...prev, propertyId]))
  .catch(() => alert('already in wish list'))
}


const removeFromWishlist = (propertyId) => {
  axios.delete(`https://one9back.onrender.com//api/wishlist/remove/${propertyId}/`, {
    data: { username: localStorage.getItem("username") }
  })
  .then(() => setWishlist((prev) => prev.filter((id) => id !== propertyId)))
  .catch((err) => console.error(err))
}



  // useEffect(() => {
  //   setIsLoading(true)
  //   axios
  //     .get("https://one9back.onrender.com///api/properties/")
  //     .then((response) => {
  //       setProperties(response.data)
  //       setFiltered(response.data.filter(p => p.is_available)) // Only available properties
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching properties:", error)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [])

  useEffect(() => {
    const filteredData = properties
      .filter(p => p.is_available) // Only available properties
      .filter((p) => {
        return (
          (filters.city ? p.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
          (filters.property_type ? p.property_type === filters.property_type : true) &&
          (filters.is_rental !== "" ? p.is_rental === (filters.is_rental === "true") : true)
        )
      })
    setFiltered(filteredData)
  }, [filters, properties])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🏠 Available Properties
          </h2>
          <p className="text-gray-600 text-lg">Discover your perfect home from our curated collection</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8 animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🔍</span>
            Filter Properties
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                name="city"
                placeholder="Search by city..."
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <select
                name="property_type"
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Property Types</option>
                <option value="AP">🏢 Apartment</option>
                <option value="HS">🏠 House</option>
                <option value="VL">🏡 Villa</option>
                <option value="CM">🏢 Commercial</option>
              </select>
            </div>
            <div className="relative">
              <select
                name="is_rental"
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Listings</option>
                <option value="true">🏠 For Rent</option>
                <option value="false">💰 For Sale</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property, index) => (
              <div
                key={property.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  {property.first_image ? (
                    <img
                      src={property.first_image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <p className="text-gray-500 font-medium">No Image Available</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.property_type === "AP"
                        ? "🏢 Apartment"
                        : property.property_type === "HS"
                          ? "🏠 House"
                          : property.property_type === "VL"
                            ? "🏡 Villa"
                            : "🏢 Commercial"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.is_rental ? "bg-green-600 text-white" : "bg-purple-600 text-white"
                      }`}
                    >
                      {property.is_rental ? "🏠 Rent" : "💰 Sale"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <span className="text-lg">📍</span>
                    <span>
                      {property.city}, {property.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">💰</span>
                    <span className="text-2xl font-bold text-green-600">₹{property.price?.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-3">
                      
{wishlist.includes(property.id) ? (
  <>
    {console.log("properties", property.id)}
    <button onClick={() => removeFromWishlist(property.id)}>💔 Remove</button>
  </>
) : (
  <button onClick={() => addToWishlist(property.id)}>❤️ Wishlist</button>
)}








  <Link to={`/property/${property.id}`} className="flex-1">
    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
      <span className="text-lg">{property.is_rental ? "🏠" : "👁️"}</span>
      {property.is_rental ? "Book Now" : "View Details"}
    </button>
  </Link>
</div>


                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of{" "}
            <span className="font-semibold text-blue-600">{filtered.length}</span> properties
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewProperties

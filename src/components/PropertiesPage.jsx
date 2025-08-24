"use client"

import { useState, useEffect, useMemo } from "react"
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from "react-router-dom"
import axios from "axios"

import LogoutConfirmModal from "./LogoutConfirmModal"

function PropertiesPage() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"))
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "" })
  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [wishlistLoading, setWishlistLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("") 
  const [sortField, setSortField] = useState("") 
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState([])
  const ITEMS_PER_PAGE = 6

  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const [filters, setFilters] = useState({
    city: "",
    property_type: "",
    is_rental: "",
  })

  useEffect(() => {
    const filteredData = properties.filter((p) => {
      return (
        (filters.city ? p.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
        (filters.property_type ? p.property_type === filters.property_type : true) &&
        (filters.is_rental !== "" ? p.is_rental === (filters.is_rental === "true") : true)
      )
    })
    setFiltered(filteredData)
  }, [filters, properties])

  useEffect(() => {
    setUserData({
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      email: localStorage.getItem("email"),
      username: localStorage.getItem("loggedInUser"),
    })
  }, [loggedInUser])

  // Read query from URL (q) coming from hero search
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get("q") || ""
    if (q) {
      setSearchQuery(q)
    }
  }, [location.search])

  // Fetch properties
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("http://localhost:8000///api/properties/")
      .then((res) => {
        const availableProps = res.data.filter((p) => p.is_available)
        setProperties(availableProps)
        setFiltered(availableProps)
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setIsLoading(false))
  }, [])

  // Fetch wishlist for logged-in user
  useEffect(() => {
    if (loggedInUser) {
      setWishlistLoading(true)
      const username = localStorage.getItem("username")
      axios
        .get(`http://localhost:8000//api/wishlist/?username=${username}`)
        .then((res) => {
          // Extract property IDs from wishlist items
          const propertyIds = res.data.map((item) => Number(item.property_id))
          setWishlist(propertyIds)
          console.log("Wishlist property IDs:", propertyIds)
        })
        .catch((err) => {
          console.error("Error fetching wishlist:", err)
          setWishlist([])
        })
        .finally(() => {
          setWishlistLoading(false)
        })
    } else {
      setWishlist([])
      setWishlistLoading(false)
    }
  }, [loggedInUser])

  // Filtering + search + sort
  useEffect(() => {
    let data = [...properties]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q)
      )
    }

    if (filterType) {
      data = data.filter((p) => (filterType === "rent" ? p.is_rental : !p.is_rental))
    }

    if (sortField) {
      data = [...data].sort((a, b) => b[sortField] - a[sortField])
    }

    setFiltered(data)
    setCurrentPage(1)
  }, [searchQuery, filterType, sortField, properties])

  const handleLogoutConfirm = () => {
    localStorage.clear()
    setLoggedInUser(null)
    setUserData(null)
    setShowLogoutConfirm(false)
    navigate("/")
  }

  // Toggle wishlist for a property
  const toggleWishlist = async (propertyId) => {
    if (!loggedInUser) {
      alert("Please login to add properties to wishlist")
      return
    }

    const username = localStorage.getItem("username")
    
    if (wishlist.includes(propertyId)) {
      // Remove from wishlist
      try {
        // Find the wishlist item ID first
        const wishlistResponse = await axios.get(`http://localhost:8000//api/wishlist/?username=${username}`)
        const wishlistItem = wishlistResponse.data.find(item => Number(item.property_id) === propertyId)
        
        if (wishlistItem) {
          await axios.delete(`http://localhost:8000//api/wishlist/remove/${wishlistItem.id}/`)
          setWishlist(prev => prev.filter(id => id !== propertyId))
          console.log("Removed from wishlist:", propertyId)
        }
      } catch (err) {
        console.error("Error removing from wishlist:", err)
        alert("Failed to remove from wishlist")
      }
    } else {
      // Add to wishlist
      try {
        await axios.post("http://localhost:8000//api/wishlist/add/", {
          username: username,
          property_id: propertyId,
        })
        setWishlist(prev => [...prev, propertyId])
        console.log("Added to wishlist:", propertyId)
      } catch (err) {
        console.error("Error adding to wishlist:", err)
        alert("Failed to add to wishlist")
      }
    }
  }

  // Helper function to render heart icon
  const renderHeartIcon = (propertyId) => {
    if (wishlistLoading) {
      return <span className="p-2 text-xl text-gray-400">⏳</span> // Loading state
    }
    
    if (wishlist.includes(propertyId)) {
      return "💔" // In wishlist
    } else {
      return "❤️" // Not in wishlist
    }
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <LogoutConfirmModal
        show={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-4 animate-slide-up">
          <input
            type="text"
            placeholder="Search by title, city, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border-2 border-gray-200 rounded-xl px-4 py-3 mt-3 focus:outline-none focus:border-blue-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 mt-3"
          >
            <option value="">All Types</option>
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
          <select
            name="property_type"
            onChange={handleChange}
            className="border-2 border-gray-200 rounded-xl px-4 py-3 mt-3"
          >
            <option value="">All Property Types</option>
            <option value="AP">🏢 Apartment</option>
            <option value="HS">🏠 House</option>
            <option value="VL">🏡 Villa</option>
            <option value="CM">🏢 Commercial</option>
          </select>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-800">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((p) => (
              <div
                key={p.id}
                className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up hover-lift"
              >
                <span className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                  {p.property_type === "AP"
                    ? "Apartment"
                    : p.property_type === "HS"
                    ? "House"
                    : p.property_type === "VL"
                    ? "Villa"
                    : "Other"}
                </span>
                {p.is_rental && (
                  <span className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 rounded text-xs">
                    Rent
                  </span>
                )}
                <img
                  src={p.first_image || "/placeholder.svg"}
                  alt={p.title}
                  className="h-48 w-full object-cover hover:scale-110 transition duration-300"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-gray-600 text-sm">
                    📍 {p.city}, {p.state}
                  </p>
                  <p className="text-gray-600 text-sm">💰 ₹{p.price?.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleWishlist(p.id)} 
                      className="p-2 text-xl hover:scale-110 transition-transform"
                      title={wishlistLoading ? "Loading..." : wishlist.includes(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                      disabled={wishlistLoading}
                    >
                      {renderHeartIcon(p.id)}
                    </button>
                    <Link to={`/property/${p.id}`} className="flex-1">
                      <button className="mt-2 text-teal-500 hover:text-teal-800 font-medium transition">
                        {p.is_rental ? "Book Now →" : "View Details →"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border ${
                  currentPage === idx + 1
                    ? "bg-indigo-500 text-white"
                    : "border-gray-300"
                } rounded`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main> 
    </div>
  )
}

export default PropertiesPage;
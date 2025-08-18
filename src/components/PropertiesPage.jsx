"use client"

import { useState, useEffect, useMemo } from "react"
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom"
import axios from "axios"

import LogoutConfirmModal from "./LogoutConfirmModal"
// import AppHeader from "./AppHeader"


function PropertiesPage() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"))
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "" })
  const [properties, setProperties] = useState([])
  const [filtered, setFiltered] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("") // buy/rent
  const [sortField, setSortField] = useState("") // size/beds
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  const navigate = useNavigate()
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

  // ✅ Fetch properties (logic from ViewProperties.jsx)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://backend-1-x1gx.onrender.com//api/properties/")
      .then((res) => {
        setProperties(res.data)
        setFiltered(res.data)
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setIsLoading(false))
  }, [])

  // ✅ Filtering + search + sort (combination of both files)
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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // const addToWishlist = (propertyId) => {
  //   axios
  //     .post("https://backend-1-x1gx.onrender.com//api/wishlist/add/", {
  //       username: localStorage.getItem("username"),
  //       property_id: propertyId,
  //     })
  //     .then((res) => alert(res.data.message))
  //     .catch((err) => console.error(err))
  // }

//   const [properties1, setProperties1] = useState([]);
//   const [wishlist, setWishlist] = useState([])

// const [wishlist, setWishlist] = useState([])

useEffect(() => {
  if (loggedInUser) {
    axios
      .get(`https://backend-1-x1gx.onrender.com/api/wishlist/?username=${localStorage.getItem("username")}`)
      .then((res) => {
        console.log("Wishlist API response:", res.data)
        // force all ids to numbers
        const ids = res.data.map((item) => Number(item.id))
        setWishlist(ids)
      })
      .catch((err) => console.error("Error fetching wishlist:", err))
  }
}, [loggedInUser])


const toggleWishlist = (propertyId) => {
  if (wishlist.includes(propertyId)) {
    axios
      .post("https://backend-1-x1gx.onrender.com/api/wishlist/remove/", {
        username: localStorage.getItem("username"),
        property_id: propertyId,
      })
      .then(() => {
        setWishlist((prev) => prev.filter((id) => id !== propertyId))
      })
      .catch((err) => console.error(err))
  } else {
    axios
      .post("https://backend-1-x1gx.onrender.com/api/wishlist/add/", {
        username: localStorage.getItem("username"),
        property_id: propertyId,
      })
      .then(() => {
        setWishlist((prev) => [...prev, propertyId])
      })
      .catch((err) => console.error(err))
  }
}
const [wishlist, setWishlist] = useState([])

useEffect(() => {
  if (loggedInUser) {
    axios
      .get(`https://backend-1-x1gx.onrender.com/api/wishlist/?username=${localStorage.getItem("username")}`)
      .then((res) => {
        const ids = res.data.map((item) => Number(item.id)) // only property IDs
        setWishlist(ids)
        console.log("Extracted wishlist IDs:", ids)
      })
      .catch((err) => console.error("Error fetching wishlist:", err))
  }
}, [loggedInUser])

const addToWishlist = (propertyId) => {
  axios
    .post("https://backend-1-x1gx.onrender.com/api/wishlist/add/", {
      username: localStorage.getItem("username"),
      property_id: propertyId,
    })
    .then(() => setWishlist((prev) => [...prev, propertyId]))
    .catch(() => alert("Already in wishlist"))
}

const removeFromWishlist = (propertyId) => {
  axios
    .delete(`https://backend-1-x1gx.onrender.com/api/wishlist/remove/${propertyId}/`, {
      data: { username: localStorage.getItem("username") },
    })
    .then(() => setWishlist((prev) => prev.filter((id) => id !== propertyId)))
    .catch((err) => console.error(err))
}


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* <AppHeader
        loggedInUser={loggedInUser}
        userData={userData}
        handleLogout={() => setShowLogoutConfirm(true)}
      /> */}
      <LogoutConfirmModal
        show={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title, city, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">All Types</option>
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
          <select
  name="property_type"
  onChange={handleChange}
  className="border border-gray-300 rounded-lg px-4 py-2"
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
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
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
                  className="h-48 w-full object-cover hover:scale-105 transition"
                />
                {p.first_image}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-gray-600 text-sm">
                    📍 {p.city}, {p.state}
                  </p>
                  <p className="text-gray-600 text-sm">💰 ₹{p.price?.toLocaleString()}</p>
                  <div className="flex gap-2">
            
  <button onClick={() => addToWishlist(p.id)} className="p-2 text-xl">
    ❤️ Wishlist
  </button>

                    <Link to={`/property/${p.id}`} className="flex-1">
                      <button className="mt-2 text-teal-500 hover:text-teal-800 font-medium transition">
                        {p.is_rental ? "Book Now" : "View Details →"}
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

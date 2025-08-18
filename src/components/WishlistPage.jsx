"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`https://backend-1-x1gx.onrender.com//api/wishlist/?username=${localStorage.getItem("username")}`)
      .then((res) => {
        setWishlist(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  const removeFromWishlist = (itemId) => {
    axios
      .delete(`https://backend-1-x1gx.onrender.com//api/wishlist/remove/${itemId}/`)
      .then(() => {
        setWishlist(wishlist.filter((item) => item.id !== itemId))
      })
      .catch((err) => console.error(err))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-800 bg-clip-text text-transparent mb-4">
            ❤️ Your Wishlist
          </h2>
          <p className="text-gray-600 text-lg">Your favorite properties saved for later</p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-800 mx-auto mt-4 rounded-full"></div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 p-12 max-w-md mx-auto">
              <div className="text-8xl mb-6 animate-bounce">💔</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-8">Start exploring properties and add your favorites here!</p>
              <Link to="/viewproperties">
                <button className="bg-gradient-to-r from-teal-500 to-teal-800 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                  <span className="text-lg">🏠</span>
                  Browse Properties
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8 animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Wishlist Summary</h3>
                    <p className="text-gray-600">You have {wishlist.length} saved properties</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600">{wishlist.length}</div>
                  <div className="text-sm text-gray-500">Properties</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    
                    {item.image ? (
                      <img
                        src={`https://backend-1-x1gx.onrender.com/${item.image}`|| "/placeholder.svg"}
                        alt={item.image}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-teal-200 to-teal-400 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏠</div>
                          <p className="text-gray-600 font-medium">No Image Available</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <span>❤️</span>
                        Wishlist
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                      title="Remove from wishlist"
                    >
                      <span className="text-sm">🗑️</span>
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <span className="text-lg">📍</span>
                      <span className="line-clamp-1">{item.address}</span>
                    </div>

                    {item.price && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">💰</span>
                        <span className="text-2xl font-bold text-teal-600">₹{item.price.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex gap-3 mt-4">
                      <Link to={`/property/${item.property_id || item.id}`} className="flex-1">
                        <button className="mt-2 text-teal-500 hover:text-teal-800 font-medium transition">
                          <span className="text-lg">👁️</span>
                          View Details →
                        </button>
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span className="text-lg">💔</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Want to add more properties?</h3>
                <Link to="/viewproperties">
                  <button className="bg-gradient-to-r from-teal-500 to-teal-800 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                    <span className="text-lg">🏠</span>
                    Browse More Properties
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WishlistPage

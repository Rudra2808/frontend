"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Search } from "lucide-react"

// Animated rotating word component
const AnimatedTextCycle = ({ words, interval = 3000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState("auto")
  const measureRef = useRef(null)

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width
        setWidth(`${newWidth}px`)
      }
    }
  }, [currentIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, words.length])

  const containerVariants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
    exit: { y: 20, opacity: 0, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" } },
  }

  return (
    <>
      <div ref={measureRef} aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ visibility: "hidden" }}>
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}> {word} </span>
        ))}
      </div>
      <motion.span className="relative inline-block" animate={{ width, transition: { type: "spring", stiffness: 150, damping: 15, mass: 1.2 } }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}

const GetStartedButton = () => (
  <button className="group relative overflow-hidden bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
    <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">Get Started</span>
    <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
      <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
    </i>
  </button>
)

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [featured, setFeatured] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://one9back.onrender.com//api/properties/")
      .then((res) => {
        const available = (res.data || []).filter((p) => p.is_available)
        setFeatured(available.slice(0, 6))
      })
      .catch(() => setFeatured([]))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="space-y-24">
      {/* Hero (replaced) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 via-white to-cyan-50 border border-gray-200/50 shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative px-6 py-16 md:px-12 md:py-24">
          <div className="text-center">
            {/* Main Headline */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Find Your Perfect{' '}
                <span className="text-teal-600">
                  <AnimatedTextCycle words={["luxury homes", "modern apartments", "cozy condos", "family houses", "studio apartments"]} interval={3000} className="text-teal-600" />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Discover thousands of properties with our advanced search. From luxury condos to cozy apartments, find your dream home today.
            </motion.p>

            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="max-w-2xl mx-auto mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const q = searchQuery.trim()
                  if (q) navigate(`/prop?q=${encodeURIComponent(q)}`)
                  else navigate("/prop")
                }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter location, property type, or keywords..."
                  className="w-full pl-12 pr-32 py-4 text-lg border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-2 font-semibold transition">Search</button>
                </div>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/registration" className="no-underline"><GetStartedButton /></Link>
              <Link to="/prop" className="no-underline">
                <button className="border border-teal-200 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-xl font-semibold transition">Browse Properties</button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">10K+</div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">5K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">50+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20" animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-40 right-20 w-16 h-16 bg-cyan-200 rounded-full opacity-20" animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-20 left-1/4 w-12 h-12 bg-teal-300 rounded-full opacity-20" animate={{ x: [0, 30, 0], y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      </section>

      {/* Trusted brands - marquee */}
      <section className="text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-6">Trusted by leading real estate platforms and partners</p>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 items-center opacity-80 animate-scroll-x">
            {["ZILLOW", "REALTOR", "99ACRES", "MAGICBRICKS", "AIRBNB", "NESTAWAY", "HOUSING", "TRULIA", "APARTMENTS"].concat(["ZILLOW", "REALTOR", "99ACRES", "MAGICBRICKS", "AIRBNB", "NESTAWAY", "HOUSING", "TRULIA", "APARTMENTS"]).map((name, idx) => (
              <div key={`${name}-${idx}`} className="min-w-40 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 shadow-sm text-gray-600 dark:text-gray-300 font-semibold tracking-wider">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-400">Handpicked listings to get you started</p>
          </div>
          <Link to="/prop" className="no-underline text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-200 font-semibold">See all →</Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No properties to show yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, index) => (
              <div
                key={p.id}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800 overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  {p.first_image ? (
                    <img src={p.first_image} alt={p.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <p className="text-gray-500 font-medium">No Image Available</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {p.property_type === "AP" ? "Apartment" : p.property_type === "HS" ? "House" : p.property_type === "VL" ? "Villa" : "Other"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.is_rental ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}>
                      {p.is_rental ? "Rent" : "Sale"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{p.title}</h3>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">📍 {p.city}, {p.state}</div>
                  <div className="text-green-600 dark:text-green-400 font-bold text-xl mb-4">₹{p.price?.toLocaleString()}</div>
                  <Link to={`/property/${p.id}`} className="no-underline">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      {p.is_rental ? "Book Now" : "View Details"}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      

    </div>
  )
}

export default LandingPage



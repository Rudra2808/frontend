import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    is_rental: '',
  });

  const addToWishlist = (propertyId) => {
    axios.post("http://localhost:8000/api/wishlist/add/", {
      username: localStorage.getItem("username"),
      property_id: propertyId
    })
    .then(res => alert(res.data.message))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/properties/')
      .then(response => {
        setProperties(response.data);
        setFiltered(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  useEffect(() => {
    const filteredData = properties.filter(p => {
      return (
        (filters.city ? p.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
        (filters.property_type ? p.property_type === filters.property_type : true) &&
        (filters.is_rental !== '' ? p.is_rental === (filters.is_rental === 'true') : true)
      );
    });
    setFiltered(filteredData);
  }, [filters, properties]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Properties</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input type="text" name="city" placeholder="Filter by City" onChange={handleChange} className="border p-2 rounded" />
        <select name="property_type" onChange={handleChange} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="AP">Apartment</option>
          <option value="HS">House</option>
          <option value="VL">Villa</option>
          <option value="CM">Commercial</option>
        </select>
        <select name="is_rental" onChange={handleChange} className="border p-2 rounded">
          <option value="">All Listings</option>
          <option value="true">Rental</option>
          <option value="false">For Sale</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(property => (
          <div key={property.id} className="border rounded-lg shadow-md p-4">
            {property.first_image ? (
  <img src={property.first_image} alt={property.title} className="w-full h-48 object-cover mb-4 rounded" />
) : (
  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
    No Image
  </div>
)}

            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p>{property.city}, {property.state}</p>
            <p className="font-bold">₹{property.price.toLocaleString()}</p>
            <button
              onClick={() => addToWishlist(property.id)} // ✅ FIXED HERE
              className="bg-pink-500 text-white px-4 py-2 rounded mt-2 hover:bg-pink-600"
            >
              ❤️ Add to Wishlist
            </button>
            <Link to={`/property/${property.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
                {property.is_rental ? 'Book Now' : 'View Details'}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProperties;

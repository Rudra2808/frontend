import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);

  const [callbackForm, setCallbackForm] = useState({
    buyer_name: '',
    email_id: '',
    phone_no: ''
  });
  useEffect(() => {
    axios.get(`http://localhost:8000/api/properties/${id}/`)
      .then(res => setProperty(res.data))
      .catch(err => console.error(err));
  }, [id]);
  const handleCallbackChange = (e) => {
    setCallbackForm({ ...callbackForm, [e.target.name]: e.target.value });
  };
  const submitCallback = async () => {
    if (!callbackForm.buyer_name || !callbackForm.email_id || !callbackForm.phone_no) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/callback/", {
        buyer_name: callbackForm.buyer_name,
        email_id: callbackForm.email_id,
        phone_no: callbackForm.phone_no,
       property_id: property.id 
      });
      alert("Callback request sent successfully!");
      setCallbackForm({ buyer_name: '', email_id: '', phone_no: '' });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  if (!property) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg mt-6">
      {/* {property.image && ( */}
       {/* <img */}
        {/* //   src={property.image}
        //   alt={property.title}
        //   className="w-full h-96 object-cover rounded"
        // /> */}


        <div id="propertyCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {property.images && property.images.length > 0 ? (
            property.images.map((img, index) => (
              <div
                key={img.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img src={img.image} />
          <h1>hello</h1>
                
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <p>No images available</p>
            </div>
          )}
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      {/* )} */}
    
    <p><strong>Seller:</strong> {property.seller_first_name} {property.seller_last_name}</p>
      <p><strong>Contact:</strong> {property.seller_contact}</p>
      <p><strong>Project Area:</strong> {property.project_area}</p>
<p><strong>Size:</strong> {property.size}</p>
<p><strong>Project Size:</strong> {property.project_size}</p>
<p><strong>Launch Date:</strong> {property.launch_date}</p>
<p><strong>Avg. Price:</strong> {property.avg_price}</p>
<p><strong>Possession Status:</strong> {property.possession_status}</p>
<p><strong>Configuration:</strong> {property.configuration}</p>
{property.url && (
  <div className="mt-4">
    <iframe
      src={property.url}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
)}

      <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-600">{property.city}, {property.state}</p>
      <p className="text-xl font-semibold mt-2">₹{property.price.toLocaleString()}</p>
      <p className="mt-4">{property.description}</p>
      <p className="text-sm mt-2 text-gray-500">
        {property.is_rental ? "Rental Property" : "For Sale"}
      </p>
 <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Callback
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Request a Callback</h2>

            <input
              type="text"
              name="buyer_name"
              placeholder="Your Name"
              value={callbackForm.buyer_name}
              onChange={handleCallbackChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="email"
              name="email_id"
              placeholder="Your Email"
              value={callbackForm.email_id}
              onChange={handleCallbackChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="phone_no"
              placeholder="Your Phone Number"
              value={callbackForm.phone_no}
              onChange={handleCallbackChange}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitCallback}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Link to="/viewproperties" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Properties
      </Link>
    </div>
  );
};

export default PropertyDetails;

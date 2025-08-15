import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = ({ listedBy }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    property_type: 'AP',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    is_available: true,
    is_rental: false,
    project_area: '',
    size: '',
    project_size: '',
    launch_date: '',
    avg_price: '',
    possession_status: '',
    configuration: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

console.log(listedBy)

const [images, setImages] = useState([]);
const handleFileChange = (e) => {
  setImages(e.target.files); // multiple files
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (let key in form) {
    data.append(key, form[key]);
  }

  if (images) {
  for (let i = 0; i < images.length; i++) {
    data.append('images', images[i]);
  }
}

  // ✅ Add this line
  data.append('listed_by', listedBy);
  // listedBy should be passed as prop from App
  // listed_by = request.user.username

  try {
    await axios.post('http://localhost:8000/api/properties/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Property added successfully!');
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      alert(`Error: ${JSON.stringify(error.response.data)}`);
    } else {
      alert('Something went wrong');
    }
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Add New Property</h2>

      <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" required />
      <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Price" required />

      <select name="property_type" value={form.property_type} onChange={handleChange} className="w-full p-2 border rounded" required>
        <option value="AP">Apartment</option>
        <option value="HS">House</option>
        <option value="VL">Villa</option>
        <option value="CM">Commercial</option>
      </select>

      <input name="address" value={form.address} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Address" required />
      <input name="city" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" placeholder="City" required />
      <input name="state" value={form.state} onChange={handleChange} className="w-full p-2 border rounded" placeholder="State" required />
      <input name="zip_code" value={form.zip_code} onChange={handleChange} className="w-full p-2 border rounded" placeholder="ZIP Code" required />
      <input name="project_area" value={form.project_area} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Project Area (e.g. 6.8 Acres)" />

<input name="size" value={form.size} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Size (e.g. 3812 sq.ft.)" />

<input name="project_size" value={form.project_size} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Project Size (e.g. 79 units)" />

<input name="launch_date" value={form.launch_date} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Launch Date (e.g. Apr, 2025)" />

<input name="avg_price" value={form.avg_price} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Avg. Price (e.g. 7.58 K/sq.ft)" />

<input name="possession_status" value={form.possession_status} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Possession Status (e.g. Under Construction)" />

<input name="configuration" value={form.configuration} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Configuration (e.g. 4 BHK Villa)" />
<input
  name="url"
  value={form.url}
  onChange={handleChange}
  className="w-full p-2 border rounded"
  placeholder="Google Maps Embed URL"
/>

<input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <label className="block">
        <input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
        {' '}Available
      </label>

      <label className="block">
        <input type="checkbox" name="is_rental" checked={form.is_rental} onChange={handleChange} />
        {' '}Rental Property
      </label>

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
        Submit Property
      </button>
    </form>
  );
};

export default AddPropertyForm;

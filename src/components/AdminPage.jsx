import React, { useEffect, useState } from "react";

const AdminPage = ({ username }) => {
  const [properties, setProperties] = useState([]);
  console.log(username)
  useEffect(() => {
    fetch(`http://localhost:8000/api/properties/seller/${username}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setProperties(data))
      .catch((err) =>
        console.error("Error fetching seller properties:", err)
      );
  }, [username]);

const [callbacks, setcallbacks] = useState([]);
  console.log(username)
  useEffect(() => {
    fetch(`http://localhost:8000/api/callbacks/seller/${username}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setcallbacks(data))
      .catch((err) =>
        console.error("Error fetching seller properties:", err)
      );
  }, [username]);

  console.log()

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Listed Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>City</th>
              <th>State</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.id}>
                <td>{prop.title}</td>
                <td>{prop.price}</td>
                <td>{prop.city}</td>
                <td>{prop.state}</td>
                <td>{prop.is_available ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}





<h2>My Listed Callbacks</h2>
      {callbacks.length === 0 ? (
        <p>No callback found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Buyer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Property</th>
            <th>Seller</th>
            </tr>
          </thead>
          <tbody>
            {callbacks.map((cb) => (
              <tr key={cb.id}>
              <td>{cb.buyer_name}</td>
              <td>{cb.email_id}</td>
              <td>{cb.phone_no}</td>
              <td>{cb.property}</td>
              <td>{cb.seller}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}





    </div>
  );
};

export default AdminPage;

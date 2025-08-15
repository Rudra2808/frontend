import React, { useEffect, useState } from "react";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/wishlist/?username=${localStorage.getItem("username")}`)
      .then(res => setWishlist(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Wishlist</h2>
      <ul>
        {wishlist.map(item => (
          <li key={item.id}>{item.title} — {item.address}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;

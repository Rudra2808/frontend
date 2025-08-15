// UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.first_name}</td>
              <td className="border px-4 py-2">{user.last_name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

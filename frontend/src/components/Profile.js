import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from local storage

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>User Type: {user.userType}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default Profile;

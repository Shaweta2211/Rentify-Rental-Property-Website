import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [error, setError] = useState('');
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [updatedProperty, setUpdatedProperty] = useState({
    title: '',
    description: '',
    price: 0,
    propertyLocation: '',
    ownerContactAddress: '',
    ownerContactNumber: '',
    ownerAlternateContactNumber: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    imageUrl: '',
    image: null
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchUserProperties();
  }, [userDetails]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details. Please try again.');
    }
  };

  const fetchUserProperties = async () => {
    try {
      if (userDetails) {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/userproperties/${userDetails._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProperties(response.data);
      }
    } catch (error) {
      console.error('Error fetching user properties:', error);
      setError('Failed to fetch user properties. Please try again.');
    }
  };

  const handleEditProperty = (propertyId, propertyDetails) => {
    setEditPropertyId(propertyId);
    setUpdatedProperty({ ...propertyDetails });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty({ ...updatedProperty, [name]: value });
  };

  const handleImageChange = (e) => {
    setUpdatedProperty({ ...updatedProperty, image: e.target.files[0] });
  };

  const handleUpdateProperty = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      for (const key in updatedProperty) {
        formData.append(key, updatedProperty[key]);
      }

      await axios.put(`${BASE_URL}/properties/${editPropertyId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchUserProperties();
      setEditPropertyId(null);
      setUpdatedProperty({
        title: '',
        description: '',
        price: 0,
        propertyLocation: '',
        ownerContactAddress: '',
        ownerContactNumber: '',
        ownerAlternateContactNumber: '',
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        imageUrl: '',
        image: null
      });
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Failed to update property. Please try again.');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUserProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-6 ml-10">User Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {userDetails && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 ml-10">User Details</h3>
          <p className="text-lg mb-2 ml-10"><span className="font-bold">Name:</span> {userDetails.name}</p>
          <p className="text-lg mb-2 ml-10"><span className="font-bold">Email:</span> {userDetails.email}</p>
        </div>
      )}

      {userProperties.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 ml-10">Uploaded Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userProperties.map(property => (
              <div key={property._id} className="bg-white shadow-md p-6 rounded-lg mb-6">
                {editPropertyId === property._id ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Edit Property</h3>
                    <input type="text" name="title" value={updatedProperty.title} onChange={handleInputChange} placeholder="Title" className="w-full border rounded px-3 py-2 mb-2" />
                    <textarea name="description" value={updatedProperty.description} onChange={handleInputChange} placeholder="Description" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="number" name="price" value={updatedProperty.price} onChange={handleInputChange} placeholder="Price" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="text" name="propertyLocation" value={updatedProperty.propertyLocation} onChange={handleInputChange} placeholder="Location" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="text" name="ownerContactAddress" value={updatedProperty.ownerContactAddress} onChange={handleInputChange} placeholder="Contact Address" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="text" name="ownerContactNumber" value={updatedProperty.ownerContactNumber} onChange={handleInputChange} placeholder="Contact Number" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="text" name="ownerAlternateContactNumber" value={updatedProperty.ownerAlternateContactNumber} onChange={handleInputChange} placeholder="Alternate Contact Number" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="number" name="bedrooms" value={updatedProperty.bedrooms} onChange={handleInputChange} placeholder="Bedrooms" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="number" name="bathrooms" value={updatedProperty.bathrooms} onChange={handleInputChange} placeholder="Bathrooms" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="number" name="size" value={updatedProperty.size} onChange={handleInputChange} placeholder="Size (sq ft)" className="w-full border rounded px-3 py-2 mb-2" />
                    <input type="file" name="image" onChange={handleImageChange} className="w-full mb-4" />
                    <div className="flex justify-between mt-4">
                      <button onClick={handleUpdateProperty} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                      <button onClick={() => setEditPropertyId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
                    <div>
                      {property.imageUrls && property.imageUrls.length > 1 ? (
                        <Slider dots infinite slidesToShow={1} slidesToScroll={1}>
                          {property.imageUrls.map((imageUrl, index) => (
                            <div key={index}>
                              <img src={`${BASE_URL}${imageUrl}`} alt={`Image ${index}`} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            </div>
                          ))}
                        </Slider>
                      ) : property.imageUrls && property.imageUrls.length === 1 ? (
                        <div key={property._id}>
                          <img src={`${BASE_URL}${property.imageUrls[0]}`} alt="Property Image" className="w-full h-full object-cover mb-4 rounded-lg" />
                        </div>
                      ) : (
                        <div key={property._id}>No images available</div>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Description:</span> {property.description}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Price:</span> ${property.price}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Location:</span> {property.propertyLocation}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Contact Address:</span> {property.ownerContactAddress}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Contact Number:</span> {property.ownerContactNumber}</p>
                    {property.ownerAlternateContactNumber && <p className="text-gray-700 mb-4"><span className="font-bold">Alternate Contact Number:</span> {property.ownerAlternateContactNumber}</p>}
                    <p className="text-gray-700 mb-4"><span className="font-bold">Bedrooms:</span> {property.bedrooms}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Bathrooms:</span> {property.bathrooms}</p>
                    <p className="text-gray-700 mb-4"><span className="font-bold">Size:</span> {property.size} sq ft</p>
                    <div className="flex justify-between mt-4">
                      <button onClick={() => handleEditProperty(property._id, property)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit Property</button>
                      <button onClick={() => handleDeleteProperty(property._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Property</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

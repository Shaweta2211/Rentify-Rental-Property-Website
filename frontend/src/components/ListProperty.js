import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListProperty = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [ownerContactAddress, setOwnerContactAddress] = useState('');
    const [ownerContactNumber, setOwnerContactNumber] = useState('');
    const [ownerAlternateContactNumber, setOwnerAlternateContactNumber] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [size, setSize] = useState('');
    const [bhk, setbhk] = useState('');
    const [kitchen, setkitchen] = useState('');
    const [images, setImages] = useState([]);
    const [propertyType, setPropertyType] = useState('');
    const [error, setError] = useState('');
    const [ownerDetails, setOwnerDetails] = useState(null);

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOwnerDetails(response.data);
            } catch (error) {
                console.error('Error fetching owner details:', error);
                setError('Failed to fetch owner details. Please try again.');
            }
        };
        fetchOwnerDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            alert("Submitting Property");
            const formData = new FormData();
            formData.append('userId', ownerDetails._id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('propertyLocation', propertyLocation);
            formData.append('ownerContactAddress', ownerContactAddress);
            formData.append('ownerContactNumber', ownerContactNumber);
            formData.append('ownerAlternateContactNumber', ownerAlternateContactNumber);
            formData.append('bedrooms', bedrooms);
            formData.append('bathrooms', bathrooms);
            formData.append('size', size);
            formData.append('bhk', bhk);
            formData.append('kitchen', kitchen);
            formData.append('propertyType', propertyType);

            images.forEach((img) => {
                formData.append('image', img);
            });

            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/properties`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear form
            setTitle('');
            setDescription('');
            setPrice('');
            setPropertyLocation('');
            setOwnerContactAddress('');
            setOwnerContactNumber('');
            setOwnerAlternateContactNumber('');
            setBedrooms('');
            setBathrooms('');
            setSize('');
            setImages([]);
            setPropertyType('');
            setbhk('');
            setkitchen('');
            setError('');
        } catch (error) {
            setError('Failed to add property. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Fill Your Property Details</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title and Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                                required
                                placeholder="e.g. Spacious 2BHK Apartment"
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={1000}
                                required
                                placeholder="Provide a detailed description..."
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Price & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="propertyLocation" className="block text-gray-700 font-bold mb-2">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="propertyLocation"
                                value={propertyLocation}
                                onChange={(e) => setPropertyLocation(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="ownerContactAddress" className="block text-gray-700 font-bold mb-2">
                                Contact Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="ownerContactAddress"
                                value={ownerContactAddress}
                                onChange={(e) => setOwnerContactAddress(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="ownerContactNumber" className="block text-gray-700 font-bold mb-2">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="ownerContactNumber"
                                value={ownerContactNumber}
                                onChange={(e) => setOwnerContactNumber(e.target.value)}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                required
                                placeholder="10-digit number"
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Alternate Contact & Property Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="ownerAlternateContactNumber" className="block text-gray-700 font-bold mb-2">
                                Alternate Contact
                            </label>
                            <input
                                type="tel"
                                id="ownerAlternateContactNumber"
                                value={ownerAlternateContactNumber}
                                onChange={(e) => setOwnerAlternateContactNumber(e.target.value)}
                                pattern="[0-9]{10}"
                                maxLength={10}
                                placeholder="10-digit number"
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="propertyType" className="block text-gray-700 font-bold mb-2">
                                Property Type
                            </label>
                            <select
                                id="propertyType"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select Property Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="flat">Flat</option>
                                <option value="builderFloor">Builder Floor</option>
                                <option value="villa">Villa</option>
                                <option value="independentHouse">Independent House</option>
                                <option value="studioApartment">Studio Apartment</option>
                            </select>
                        </div>
                    </div>

                    {/* Property Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="bhk" className="block text-gray-700 font-bold mb-2">
                                BHK <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="bhk"
                                value={bhk}
                                onChange={(e) => setbhk(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-gray-700 font-bold mb-2">
                                Bathrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="bathrooms"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="bedrooms" className="block text-gray-700 font-bold mb-2">
                                Bedrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Kitchen and Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="kitchen" className="block text-gray-700 font-bold mb-2">
                                Kitchen <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="kitchen"
                                value={kitchen}
                                onChange={(e) => setkitchen(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="size" className="block text-gray-700 font-bold mb-2">
                                Size (sqft) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                required
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Upload Images */}
                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                            Upload Images <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="image"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages(Array.from(e.target.files))}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListProperty;

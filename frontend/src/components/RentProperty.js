// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const RentProperty = () => {
//     const [properties, setProperties] = useState([]);
//     const [error, setError] = useState('');
//     const [filters, setFilters] = useState({
//         location: '',
//         minPrice: '',
//         maxPrice: '',
//         bhk: '',
//         bedrooms: '',
//         propertyType: ''
//     });
//     const [showFilters, setShowFilters] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const fetchProperties = async () => {
//             try {
//                 console.log('Filtering data...');
//                 const response = await axios.get(`${BASE_URL}/properties`, {
//                     params: filters
//                 });
//                 setProperties(response.data);
//             } catch (error) {
//                 console.error('Error fetching properties:', error);
//                 setError('Failed to fetch properties. Please try again.');
//             }
//         };

//         fetchProperties();

//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         handleResize();
//         window.addEventListener('resize', handleResize);

//         return () => window.removeEventListener('resize', handleResize);
//     }, [filters]);

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [name]: value
//         }));
//     };

//     return (
//         <div className='flex flex-col w-full h-full items-center justify-center py-8 bg-gradient-to-br bg-[#fcfcfc] text-stone-800'>
//             <div className="w-full bg-transparent p-3 mb-4 rounded-lg shadow-2xl mx-auto">
//                 <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex flex-wrap gap-3'}`}>
//                     <div className="flex flex-col flex-1">
//                         <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                         <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                         <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                         <input type="number" name="bhk" placeholder="BHK" value={filters.bhk} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                         <input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`} />
//                     </div>
//                     <div className="flex flex-col flex-1">
//                         <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange} className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}>
//                             <option value="">Select Property Type</option>
//                             <option value="Apartment">Apartment</option>
//                             <option value="Flat">Flat</option> {/* ✅ New option added here */}
//                             <option value="BuilderFloor">Builder Floor</option>
//                             <option value="Villa">Villa</option>
//                             <option value="IndependentHouse">Independent House</option>
//                             <option value="Studio Apartment">Studio Apartment</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             <div className="w-full">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto">
//                     {error && <p className="text-red-500 col-span-full">{error}</p>}
//                     {properties.map(property => (
//                         <div key={property._id} className="shadow-2xl rounded-lg p-4">
//                             <div>
//                                 {property.imageUrls && property.imageUrls.length > 1 ? (
//                                     <Slider dots infinite slidesToShow={1} slidesToScroll={1}>
//                                         {property.imageUrls.map((imageUrl, index) => (
//                                             <div key={index}>
//                                                 <img src={`${BASE_URL}${imageUrl}`} alt={`Image ${index}`} className="w-full h-48 object-cover mb-2 rounded-lg" />
//                                             </div>
//                                         ))}
//                                     </Slider>
//                                 ) : property.imageUrls && property.imageUrls.length === 1 ? (
//                                     <img src={`${BASE_URL}${property.imageUrls[0]}`} alt="Property" className="w-full h-full object-cover mb-2 rounded-lg" />
//                                 ) : (
//                                     <div>No images available</div>
//                                 )}
//                             </div>

//                             <div className='flex flex-col p-4 bg-white shadow-lg rounded-lg'>
//                                 <h2 className="mt-4 text-lg font-semibold text-gray-700 mb-2 pl-3">{property.title}</h2>
//                                 <p className="text-gray-800 mb-4">{property.description}</p>
//                                 <p className="text-gray-700 mb-2"><strong>Location:</strong> {property.propertyLocation}</p>
//                                 <div className='flex justify-between mb-4'>
//                                     <p className="text-gray-700"><strong>Price:</strong> ₹{property.price}</p>
//                                     <p className="text-gray-700"><strong>Size (sqft):</strong> {property.size}</p>
//                                 </div>
//                                 <div className="flex justify-between mb-4">
//                                     <p className="text-gray-700"><strong>BHK:</strong> {property.bhk}</p>
//                                     <p className="text-gray-700"><strong>Bedrooms:</strong> {property.bedrooms}</p>
//                                     <p className="text-gray-700"><strong>Kitchen:</strong> {property.kitchen}</p>
//                                 </div>
//                                 <p className="text-gray-700 mb-4"><strong>Property Type:</strong> {property.propertyType}</p>
//                                 <div className='flex justify-between mb-4'>
//                                     <p className="text-gray-700"><strong>Contact:</strong> {property.ownerContactNumber}</p>
//                                     <p className="text-gray-700"><strong>Alt. Contact:</strong> {property.ownerAlternateContactNumber}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RentProperty;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const RentProperty = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        bhk: '',
        bedrooms: '',
        propertyType: ''
    });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                console.log('Filtering data...');
                const response = await axios.get(`${BASE_URL}/properties`, {
                    params: filters
                });
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('Failed to fetch properties. Please try again.');
            }
        };

        fetchProperties();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className='flex flex-col w-full h-full items-center justify-center py-8 bg-gradient-to-br bg-[#fcfcfc] text-stone-800'>
            <div className="w-full bg-transparent p-3 mb-4 rounded-lg shadow-2xl mx-auto">
                <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex flex-wrap gap-3'}`}>
                    <div className="flex flex-col flex-1">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <input
                            type="number"
                            name="bhk"
                            placeholder="BHK"
                            value={filters.bhk}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <input
                            type="number"
                            name="bedrooms"
                            placeholder="Bedrooms"
                            value={filters.bedrooms}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <select
                            name="propertyType"
                            value={filters.propertyType}
                            onChange={handleFilterChange}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 ${isMobile ? 'py-1' : ''}`}
                        >
                            <option value="">Select Property Type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Flat">Flat</option>
                            <option value="BuilderFloor">Builder Floor</option>
                            <option value="Villa">Villa</option>
                            <option value="IndependentHouse">Independent House</option>
                            <option value="Studio Apartment">Studio Apartment</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto">
                    {error && <p className="text-red-500 col-span-full">{error}</p>}
                    {properties.map(property => (
                        <div key={property._id} className="shadow-2xl rounded-lg p-4">
                            <div>
                                {property.imageUrls && property.imageUrls.length > 1 ? (
                                    <Slider dots infinite slidesToShow={1} slidesToScroll={1}>
                                        {property.imageUrls.map((imageUrl, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`${BASE_URL}${imageUrl}`}
                                                    alt={`${property.title} ${index + 1}`}
                                                    className="w-full h-48 object-cover mb-2 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : property.imageUrls && property.imageUrls.length === 1 ? (
                                    <img
                                        src={`${BASE_URL}${property.imageUrls[0]}`}
                                        alt={property.title || 'Property'}
                                        className="w-full h-full object-cover mb-2 rounded-lg"
                                    />
                                ) : (
                                    <div>No images available</div>
                                )}
                            </div>

                            <div className='flex flex-col p-4 bg-white shadow-lg rounded-lg'>
                                <h2 className="mt-4 text-lg font-semibold text-gray-700 mb-2 pl-3">{property.title}</h2>
                                <p className="text-gray-800 mb-4">{property.description}</p>
                                <p className="text-gray-700 mb-2"><strong>Location:</strong> {property.propertyLocation}</p>
                                <div className='flex justify-between mb-4'>
                                    <p className="text-gray-700"><strong>Price:</strong> ₹{property.price}</p>
                                    <p className="text-gray-700"><strong>Size (sqft):</strong> {property.size}</p>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <p className="text-gray-700"><strong>BHK:</strong> {property.bhk}</p>
                                    <p className="text-gray-700"><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                    <p className="text-gray-700"><strong>Kitchen:</strong> {property.kitchen}</p>
                                </div>
                                <p className="text-gray-700 mb-4"><strong>Property Type:</strong> {property.propertyType}</p>
                                <div className='flex justify-between mb-4'>
                                    <p className="text-gray-700"><strong>Contact:</strong> {property.ownerContactNumber}</p>
                                    <p className="text-gray-700"><strong>Alt. Contact:</strong> {property.ownerAlternateContactNumber}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentProperty;

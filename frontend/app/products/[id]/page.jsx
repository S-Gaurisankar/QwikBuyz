"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const fetchData = async (id) => {
  const response = await fetch(`https://qwikbuyz.onrender.com/api/products/query?product_id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  } 
  return response.json();
};

var productDetails = null;

const Page = ({ params }) => {
  const { id } = React.use(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Added state for image navigation

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(id);
        console.log(result);
        setData(result[0]);
        productDetails = result[0];
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const productImages = productDetails.images;

  // Handler for navigation arrows
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images Gallery Section */}
        <div className="space-y-4 relative">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={productImages[currentImageIndex]}
              alt={`${productDetails.title} - Main`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700"
            aria-label="Previous Image"
          >
            &larr;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none hover:bg-gray-700"
            aria-label="Next Image"
          >
            &rarr;
          </button>
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 rounded-lg overflow-hidden cursor-pointer ${
                  currentImageIndex === index
                    ? "ring-2 ring-blue-500"
                    : "hover:opacity-75"
                }`}
                onClick={() => setCurrentImageIndex(index)} // Set current image on thumbnail click
              >
                <Image
                  src={image}
                  alt={`${productDetails.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {productDetails.title}
          </h1>
          
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {productDetails.category}
            </span>
            <span className="text-2xl font-bold text-blue-600">
              ${productDetails.price}
            </span>
          </div>

          <div className="prose prose-sm text-gray-600">
            <p>{productDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

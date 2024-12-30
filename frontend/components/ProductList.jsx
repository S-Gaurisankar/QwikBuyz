"use client"
import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    let pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    
    if (end === totalPages) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {getVisiblePages()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg hover:bg-gray-100 
              ${currentPage === 1 ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}`}
          >
            1
          </button>
          {getVisiblePages()[0] > 2 && <span className="px-1 sm:px-2">...</span>}
        </>
      )}

      {getVisiblePages().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg hover:bg-gray-100 
            ${currentPage === page ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}`}
        >
          {page}
        </button>
      ))}

      {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
        <>
          {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
            <span className="px-1 sm:px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-lg hover:bg-gray-100 
              ${currentPage === totalPages ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://qwikbuyz.onrender.com/api/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard key={product.product_id || index} product={product} />
        ))}
      </div>

      {/* Show pagination only if there are products */}
      {products.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* No products message */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-10">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
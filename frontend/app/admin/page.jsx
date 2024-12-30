"use client"
import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://qwikbuyz.onrender.com/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Logs Button at the top right */}

      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <div className="absolute top-13 right-4">
        <a
          href="https://qwikbuyz.onrender.com/api/logs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          API Logs
        </a>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Error message */} 
      {error && <p className="text-red-500">{error}</p>}

      {/* Displaying the List of Orders */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md shadow-md">
              <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
              
              <div className="my-4">
                <h3 className="font-bold">Customer Details:</h3>
                <p>Name: {order.userDetails.name}</p>
                <p>Email: {order.userDetails.email}</p>
                <p>Phone: {order.userDetails.phone}</p>
                <p>Address: {order.userDetails.address}</p>
              </div>

              <div className="my-4">
                <h3 className="font-bold">Order Details:</h3>
                {order.cart.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p>Title: {item.title}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="my-4">
                <h3 className="font-bold">Total Amount: ${order.totalAmount}</h3>
                <p>Order Status: {order.orderStatus}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;

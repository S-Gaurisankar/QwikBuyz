"use client";
import React, { useState, useEffect } from "react";

const Orders = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [cart, setCart] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [quantity, setQuantity] = useState("");

  const totalAmount = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://qwikbuyz.onrender.com/api/products");
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();
        setAllData(data); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  const handleProductInputChange = (e) => {
    const value = e.target.value;
    setProductInput(value);

    if (value.trim()) {
      const filteredSuggestions = allData
        .filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((product) => product.title)
        .filter((item, index, self) => self.indexOf(item) === index)
        .slice(0, 5);
      setProductSuggestions(filteredSuggestions);
    } else {
      setProductSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setProductInput(value);
    setProductSuggestions([]);
  };

  const addToCart = () => {
    const selectedProduct = allData.find((product) => product.title === productInput);
    if (!selectedProduct || !quantity) {
      alert("Please select a valid product and quantity.");
      return;
    }

    const { title, price, _id } = selectedProduct;

    const existingItem = cart.find((item) => item.id === _id); 
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === _id ? { ...item, quantity: item.quantity + Number(quantity) } : item
        )
      );
    } else {
      setCart([...cart, { id: _id, title, quantity: Number(quantity), price }]);
    }

    setProductInput("");
    setQuantity("");
    setProductSuggestions([]);
  };

  const updateCartItem = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: Number(quantity) } : item))
    );
  };

  const removeCartItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    if (!userDetails.name || !userDetails.address || cart.length === 0) {
      alert("Please fill in all details and add items to the cart.");
      return;
    }

    const orderData = { userDetails, cart, totalAmount };

    try {
      const response = await fetch("https://qwikbuyz.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Order submission failed.");

      alert("Order placed successfully!");
      setUserDetails({ name: "", phone: "", email: "", address: "" });
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Place Your Order</h1>

        {/* User Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone No"
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* Add to Cart */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Products</h2>
          <input
            type="text"
            placeholder="Search Product"
            value={productInput}
            onChange={handleProductInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-lg"
          />
          {productSuggestions.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded-lg mb-2 max-h-40 overflow-y-auto">
              {productSuggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>

        {/* Cart */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>
                      {item.quantity} x ${item.price} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.id, e.target.value)}
                      className="w-16 p-1 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total Amount */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700">Total Amount: ${totalAmount.toFixed(2)}</h2>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Orders;

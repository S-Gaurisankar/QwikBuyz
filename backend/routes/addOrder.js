const Order = require('../models/orderModel');

//Add a new Order to the database
const addOrder =  async (req, res) => {
    try {
      await Order.create(req.body);
      res.status(200).json({ message: "Order added successfully" });
      console.log("Order added successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = addOrder;
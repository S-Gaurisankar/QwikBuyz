const Order = require("../models/orderModel");

//Fetches all the Orders in the database
const getOrders = async (req, res) => {
  try {
    const getOrders = await Order.find({});
    res.status(200).json(getOrders);
    console.log("Fetched all the Orders");
  } catch (error) {
    console.error("Error fetching Orders:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getOrders;

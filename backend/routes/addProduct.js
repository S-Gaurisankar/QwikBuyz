const Product = require('../models/schemaModel');

//Add a new product to the database
const addProduct =  async (req, res) => {
    try {
      await Product.create(req.body);
      res.status(200).json({ message: "Product added successfully" });
      console.log("Product added successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = addProduct;
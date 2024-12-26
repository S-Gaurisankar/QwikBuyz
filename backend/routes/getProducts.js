const Product = require('../models/schemaModel');

//Fetches all the products in the database
const getProducts = async (req, res) => {
    try {
      const allProducts = await Product.find({});
      res.status(200).json(allProducts);
      console.log("Fetched all the products");
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = getProducts;
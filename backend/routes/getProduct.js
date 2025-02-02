const Product = require('../models/schemaModel');

const getProduct =  async (req, res) => {
    try {
      const { id } = req.params;
      const searchedProduct = await Product.findById(id)
      .select('title description product_id category price discount images thumbnail');
      
      if (!searchedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      console.log("Fetched Product");
  
      res.status(200).json(searchedProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = getProduct;
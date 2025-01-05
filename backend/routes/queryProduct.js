const Product = require('../models/schemaModel');

//Query a product by a property eg. ..query?product_id=1

const queryProduct = async (req, res) => {
    console.log("Received Query:", req.query);
    const userQuery = { ...req.query };
    if (userQuery.product_id) {
      userQuery.product_id = parseInt(userQuery.product_id, 10);
    }
  
    try {
      console.log("Querying Database with:", userQuery);
      const searchedProduct = await Product.find(userQuery)
      .select('title description product_id category price discount images thumbnail');
  
      if (!searchedProduct || searchedProduct.length === 0) {
        console.log("No products found for query:", userQuery);
        return res.status(404).json({ message: "Product not found" });
      }
  
      console.log("Product found!");
      res.status(200).json(searchedProduct);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: error.message });
    }
};

module.exports = queryProduct;
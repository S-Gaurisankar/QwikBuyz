const Product = require('../models/schemaModel');

//Update a product in the database
const updateProductById =  async (req, res) => {
    try {
      const { id } = req.params;
      const searchedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!searchedProduct) {
        return res.status(404).send("Product not found");
      }
  
      res.status(200).send(searchedProduct);
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = updateProductById;
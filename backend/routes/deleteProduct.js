const Product = require('../models/schemaModel');

const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const searchedProduct = await Product.findByIdAndDelete(id);
  
      if (!searchedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).send({ message: "Product deleted" });
    } catch (error) {
      console.error("Error updating products:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = deleteProduct;
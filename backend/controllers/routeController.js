const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();

const getProducts = require('../routes/getProducts');
const getProduct = require('../routes/getProduct');
const addProduct = require('../routes/addProduct');
const updateProduct = require('../routes/updateProduct');
const queryProduct = require('../routes/queryProduct');
const deleteProduct = require('../routes/deleteProduct');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get('/', getProducts);
router.get("/query",queryProduct);
router.get("/:id", getProduct);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


module.exports = router;

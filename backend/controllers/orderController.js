const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();

const allOrders = require("../routes/allOrders");
const addOrder = require("../routes/addOrder");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Order = require("../models/orderModel");

router.get("/", allOrders);
router.post("/", addOrder);

module.exports = router;
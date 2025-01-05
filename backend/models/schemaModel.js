const mongoose = require('mongoose');

/**
 * @typedef {Object} Review
 * @property {number} rating
 * @property {string} comment
 * @property {Date} date
 * @property {string} reviewerName
 * @property {string} reviewerEmail
 */

/**
 * @typedef {Object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} depth
 */

/**
 * @typedef {Object} Meta
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} barcode
 * @property {string} qrCode
 */

/**
 * @typedef {Object} Product
 * @property {number} product_id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {number} price
 * @property {number} discountPercentage
 * @property {number} rating
 * @property {number} stock
 * @property {string[]} tags
 * @property {string} brand
 * @property {string} sku
 * @property {number} weight
 * @property {Dimensions} dimensions
 * @property {string} warrantyInformation
 * @property {string} shippingInformation
 * @property {string} availabilityStatus
 * @property {Review[]} reviews
 * @property {string} returnPolicy
 * @property {number} minimumOrderQuantity
 * @property {Meta} meta
 * @property {string[]} images
 * @property {string} thumbnail
 */

/** @type {mongoose.Schema<Product>} */
const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    tags: { type: [String] },
    brand: { type: String },
    sku: { type: String },
    weight: { type: Number },
    dimensions: {
      width: { type: Number },
      height: { type: Number },
      depth: { type: Number },
    },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String },
    reviews: [
      {
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date },
        reviewerName: { type: String },
        reviewerEmail: { type: String },
      },
    ],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number },
    meta: {
      createdAt: { type: Date },
      updatedAt: { type: Date },
      barcode: { type: String },
      qrCode: { type: String },
    },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

const Product = mongoose.model('Product', productSchema, 'product_collection');
Product.init();

module.exports = Product;
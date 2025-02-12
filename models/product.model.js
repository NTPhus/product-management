const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema(
    {   
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        prosition: Number,
        deleted: Boolean
    }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
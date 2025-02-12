const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {   
        name: String,
        size: String
    }
);

const product = mongoose.model("Product", productSchema, "products");
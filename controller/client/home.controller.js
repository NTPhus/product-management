const Product = require("../../models/product.model");

const productHelper = require("../../helper/product");
//[GET] /
module.exports.index = async (req, res) => {
  //Lấy sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(6);

  const productsNew = productHelper.priceNewProduct(productsFeatured); 
  // Hết phần lấy ra sản phẩm nổi bật

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: productsNew
  });
};

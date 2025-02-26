const Product = require("../../models/product.model");

const productHelper = require("../../helper/product");
//[GET] /
module.exports.index = async (req, res) => {
  //Lấy sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(4);

  const newProductsFeatured = productHelper.priceNewProduct(productsFeatured); 
  // Hết phần lấy ra sản phẩm nổi bật

  // Hiển thị danh sách sản phẩm mới nhất
  const productNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({position: "desc"}).limit(4);

  const newProductsNew = productHelper.priceNewProduct(productNew); 
  // Hết hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  });
};

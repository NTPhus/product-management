//[GET] /products
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productHelper = require("../../helper/product");
const productCategoryHelper = require("../../helper/product-category");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const productsNew = productHelper.priceNewProducts(products); 

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: productsNew,
  });
};

//[GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      status: "active",
      slug: req.params.slugProduct,
    };
    const product = await Product.findOne(find);

    if(product.product_category_id){
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false
      })

      product.category = category;
    }

    product.priceNew = productHelper.priceNewProduct(product);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};

module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false
  });

  const listSubCategory = await productCategoryHelper.getSubCategory(category.id);

  const listSubCategoryId = listSubCategory.map(item => item.id);

  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
    deleted: false
  }).sort({position: "desc"});

  const productsNew = productHelper.priceNewProducts(products); 

  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: productsNew
  })
}
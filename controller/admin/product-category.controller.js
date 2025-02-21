const ProductCategory = require("../../models/product-category.model");
const { prefixAdmin } = require("../../config/system");
const createTreeHelper = require("../../helper/createTree")

//[GET] /admin/products-category
module.exports.index = async (req, res) => {

  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords
  });
};

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {

  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh danh mục sản phẩm",
    records: newRecords
  });
};

//[POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {

  if(req.body.position == ""){
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }else{
    req.body.position  = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${prefixAdmin}/product-category`);
}
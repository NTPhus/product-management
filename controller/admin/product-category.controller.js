const ProductCategory = require("../../models/product-category.model");
const { prefixAdmin } = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
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
    records: newRecords,
  });
};

//[POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
 const permissions = res.locals.role.permissions;
  // Bảo mật phân quyền
  // if(permissions.includes("product-category_create")){
  // console.log("Có quyền"); 
  // }else{
  //   res.send("403");
  //   return;
  // }

  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${prefixAdmin}/product-category`);
};

//[GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await ProductCategory.findOne({ _id: id, deleted: false });

    let find = {
      deleted: false,
    };

    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/product-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    req.redirect(`${prefixAdmin}/product-category`);
  }
};

//[PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);

  await ProductCategory.updateOne(
    {
      _id: id,
    },
    req.body
  );

  res.redirect("back");
};

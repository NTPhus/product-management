const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
//[GET] /admin/products

module.exports.products = async (req, res) => {
  //Bộ lọc
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false
  }

  if(req.query.status){
    find.status = req.query.status;
  }

  let keyword = "";
  if(req.query.keyword){
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i"); //Regex
    find.title = regex;
  }
  
  const products = await Product.find(find)

    // console.log(products)

    res.render("admin/pages/products/index", {
      pageTitle: "Trang sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: keyword
    });
  };
  
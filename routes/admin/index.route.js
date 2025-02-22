const systemConfig = require("../../config/system");

const dashboardRouter = require("./dashboard.route");
const productsRouter = require("./products.route");
const productCategoryRouter = require("./product-category.route");
const roleRouter = require("./role.route");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
  app.use(PATH_ADMIN + "/products", productsRouter);
  app.use(PATH_ADMIN + "/product-category", productCategoryRouter);
  app.use(PATH_ADMIN + "/roles", roleRouter);
};

const categoryMiddleware = require("../../middlewares/client/category.middleware");

const productsRoutes = require("./products.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {
  app.use(categoryMiddleware.category);

  app.get("/", homeRoutes);

  app.use("/products", productsRoutes);
};

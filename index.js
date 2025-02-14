const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

require("dotenv").config();

const route = require("./routes/clients/index.route");
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database");

const systemConfig = require("./config/system");

database.connect();

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// App local Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
const express = require("express");
const app = express();
const ProductsController = require("./controllers/products");
const UsersController = require("./controllers/users")

app.listen(4444);

app.use("/prod", ProductsController);
app.use("/users", UsersController);

app.get("/", (req, res) => {
  res.status(200);
  res.send("")
})

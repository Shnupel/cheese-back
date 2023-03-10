const express = require("express");
const app = express();
const ProductsController = require("./controllers/products");
const UsersController = require("./controllers/users");

const port = 4444;

app.listen(port);

app.use(async (req, res, next) => {
  try {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': "*"
    })
  } catch (error) {
    res.json(error);
  }
})

app.use("/prod", ProductsController);
app.use("/users", UsersController);

app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world")
})
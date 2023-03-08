const { Router } = require("express");
const router = Router();
const ProductsModel = require("../../models/products");

router.get("/", async (req, res) => {
  try {
    const data = await ProductsModel.getByCategory(req.query.category);
    res.json(data);
    res.status(200);
  }catch (e){
    res.send(e);
  }
});

router.get("/:id",async (req, res) => {
  try {
    const data = await ProductsModel.getProductById(req.params.id);
    res.status(200);
    res.json(data);
  } catch (e){
    res.send(e);
  }
})

module.exports = router;

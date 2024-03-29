const { Router } = require("express");
const router  = Router();
const UsersModel = require("../../models/users");
const Auth = require("../../models/users/auth");
const BodyParser = require("body-parser");

router.get("/", BodyParser(), async (req, res) => {
  try {
    const { password, email } = req.body;
    const data = await Auth({ email, password });
    if(data.success === true){
      res.status(200);
      return res.json(data);
    } else {
      //!! change, это попадет автоматически в catch
      res.status(300);
      res.json({ success: false })
    }
  }catch (e){
    res.status(500);
    return res.json({ error: e, success: false });
  }
});

router.post("/auth", BodyParser(), async (req, res) => {
  try {
    const { password, email } = req.body;
    const data = await Auth({ email, password });
    if(data.success){
      res.status(200);
      res.json(data)
    }else{
      res.status(200);
      res.json({ success: false })
    }
  } catch (e) {
    res.status(300);
    res.json({ success: false })
  }
})

router.post("/add", BodyParser(), async (req, res) => {
  try{
    const { password, email } = req.body;
    const id = Date.now();
    const data = await UsersModel.addUser({ id, password, email });
    if(data.success === true){
      res.status(200);
      return res.json(data);
    } else {
      //!! change, это попадет автоматически в catch
      res.status(300);
      res.json({ success: false });
    }
  }catch (e){
    res.status(500);
    res.json({ error: e });
  }
});

router.post("/addProduct", BodyParser(), async (req, res) => {
  try{
    const { password, email, product } = req.body;
    const data = await Auth({ email, password });
    if(!data.success){
      res.status(500);
      return res.json({ success: false, error: "fail password" });
    }
    const isAdded = await UsersModel.addProduct({ email, product });
    res.status(200);
    res.json({ success: isAdded.success });
  }catch (e){
    res.status(500);
    res.json({ success: false, message: e.message });
  }
});

router.post("/removeProduct", BodyParser(), async (req, res) => {
  try {
    const { password, email, product } = req.body;
    const data = await Auth({ email, password });
    if(!data.success){
      res.send(500);
      return res.json({ success: false, error: "fail password" });
    }
    const isDeleted = await UsersModel.removeProduct({ email, product });
    res.status(200);
    res.json({ success: true })
  } catch (e) {
    res.status(500);
    res.json({ success: false, message: e.message });
  }
});

router.post("/deleteProduct", BodyParser(), async (req, res) => {
  try {
    const { password, email, product } = req.body;
    const data = await Auth({ email, password });
    if(!data.success){
      res.send(500);
      return res.json({ success: false, error: "fail password" });
    }
    const isDeleted = await UsersModel.deleteProduct({ email, product });
    res.status(200);
    res.json({ success: true });
  } catch (e) {
    res.status(500);
    res.json({ success: false, message: e.message });
  }
})

module.exports = router;

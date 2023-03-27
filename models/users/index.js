const fs = require("fs");
const path = require("path");

const DBPath = path.join(__dirname, "..", "..", "db", "users.json");

class UsersModel {
  static getUserByID(userId){
    return new Promise(async (resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        if(err) return { error: err, haveError: true};
        const { users } =  JSON.parse(result);
        if(users.error !== undefined) return reject(users.error);
        const user = users.find(({ id }) => id.toString() === userId);
        if(user === undefined){
          resolve({ status: "not found" })
        }
        resolve(user);
      })
    })
  }

  static getUserByEmail(userEmail){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, value) => {
        if(err) return reject(err);
        const { users } = JSON.parse(value);
        const user = users.find(({ email }) => email === userEmail);
        if(user === undefined){
          resolve({ success: false })
        }
        resolve(user);
      })
    })
  }

  static addUser({ id, password, email }){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        const { users } = JSON.parse(result);
        if(users.map(({ email }) => email).includes(email)){
          return reject({ success: false, message: "this is includes" })
        }
        const newData = [...users, { id, password, email, products: [] }]
        fs.writeFile(DBPath, JSON.stringify({ users: newData }), (err) => {
          if(err) return reject({ success: false, error: err });
          resolve({ id, password, email, success: true })
        })
      })
    })
  }

  static addProduct({ email: userEmail, product }){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, 'utf-8', (err, result) => {
        if(err) return reject(err);
        const { users } = JSON.parse(result);
        const userID = users.findIndex(({ email }) => email === userEmail);
        if(users[userID].products.includes(product)){
          return reject({ success: false, message: "this is includes" });
        }
        const productId = users[userID].products.findIndex(({ id }) => product.id == id);
        if(productId == -1){
          users[userID].products.push(product);
        }else{
          console.log(users[userID].products, productId);
          users[userID].products[productId].counter++;
        }
        fs.writeFile(DBPath, JSON.stringify({ users }), (err) => {
          if(err) return reject({ success: false, err: error });
          resolve({ success: true });
        })
      })
    });
  }

  static removeProduct({ email: userEmail, product }){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        if(err) return reject(err);
        const { users } = JSON.parse(result);
        const userID = users.findIndex(({ email }) => email === userEmail);
        if(users[userID].products.includes(product)){
          return reject({ success: false, message: "this is includes" });
        }
        const productId = users[userID].products.findIndex(({ id }) => product.id == id);
        if(users[userID].products[productId].counter == 1){
          users[userID].products = users[userID].products.filter(({ id }) => id != product.id);
        }else{
          users[userID].products[productId].counter--
        }
        fs.writeFile(DBPath, JSON.stringify({ users }), (err) => {
          if(err) return reject({ success: false, err: error });
          resolve({ success: true });
        })
      })
    })
  }
}

module.exports = UsersModel;

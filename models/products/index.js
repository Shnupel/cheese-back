const path = require("path");
const fs = require("fs");

const DBPath = path.join(__dirname, "..", "..", "db", "products.json");

class Products {
  constructor() {}
  static getAll(){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        if(err) return reject(err);
        const { data } = JSON.parse(result);
        resolve(data);
      })
    })
  }

  static getByCategory(categoryId){
    if(categoryId === undefined){
      return Products.getAll();
    }
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        if(err) reject(err);
        const { data } = JSON.parse(result);
        const returnedData = data.filter(({ category }) => category.toString() === categoryId);
        resolve(returnedData);
      })
    })
  }

  static getProductById(productId){
    return new Promise((resolve, reject) => {
      fs.readFile(DBPath, "utf-8", (err, result) => {
        if(err) reject(err);
        const { data } = JSON.parse(result);
        const returnedData = data.find(({ id }) => id === productId);
        resolve(returnedData);
      })
    })
  }
}

module.exports = Products;


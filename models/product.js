const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "product.json");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save(id, title, imageUrl, price, description) {
    fs.readFile(p, (err, fileContent) => {
      const product = JSON.parse(fileContent);
      if (err) {
        return;
      }
      // Check existing product
      const existingProductIndex = product.findIndex((prod) => prod.id === id);
      const existingProduct = product[existingProductIndex];
      if (existingProduct) {
        existingProduct.id = id;
        existingProduct.title = title;
        existingProduct.imageUrl = imageUrl;
        existingProduct.price = price;
        existingProduct.description = description;
      } else {
        // Add new product
        product.push(this);
      }
      fs.writeFile(p, JSON.stringify(product, null, 2), (err) => {
        console.log(err);
      });
    });
  }

  static getProductsFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static findById(id, cb) {
    fs.readFile(p, (err, fileContent) => {
      const product = JSON.parse(fileContent).find((prod) => prod.id === id);
      if (err) {
        return cb([]);
      } else {
        cb(product);
      }
    });
  }

  static removeProduct(id) {
    fs.readFile(p, (err, fileContent) => {
      const products = JSON.parse(fileContent);
      if (err) {
        return;
      }
      if (products.length === 0) {
        return;
      }
      let prods = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(prods, null, 2), (err) => {
        console.log(err);
      });
    });
  }
};
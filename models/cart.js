const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  constructor(id, title, imageUrl, price, description, quantity) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
  }

  updateProduct(id) {
    // Fetch products from file
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        return;
      }
      // Check existing product
      const existingProductIndex = cart.findIndex((prod) => prod.id === id);
      const existingProduct = cart[existingProductIndex];
      if (existingProduct) {
        existingProduct.quantity = (
          parseFloat(existingProduct.quantity) + 1
        );
        existingProduct.price = (
          parseFloat(this.price) * parseFloat(existingProduct.quantity)
        ).toFixed(2);
      } else {
        // Add new product
        cart.push(this);
      }
      fs.writeFile(p, JSON.stringify(cart, null, 2), (err) => {
        console.log(err);
      });
    });
  }

  static getCartsFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static removeProduct(id) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        return;
      }
      if (cart.length === 0) {
        return;
      }
      let updatedCart = cart.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedCart, null, 2), (err) => {
        console.log(err);
      });
    });
  }

  static totalPrice(cb) {
    fs.readFile(p, (err, fileContent) => {
      const product = JSON.parse(fileContent);
      if (err) {
        return;
      }
      if (product.length > 0) {
        const addPrice = product.reduce((previousValue, currentValue) => {
          return previousValue + parseFloat(currentValue.price);
        }, 0);
        cb(addPrice);
      } else {
        cb(0);
      }
    });
  }
};

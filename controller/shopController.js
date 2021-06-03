const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.getProductsFromFile((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      prods: products,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.getProductsFromFile((products) => {
    res.render("shop/products", {
      pageTitle: "Products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getCarts = (req, res, next) => {
  Cart.getCartsFromFile((products) => {
    Cart.totalPrice(total => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        prods: products,
        total: total.toFixed(2),
      });
    });
  });
};

exports.postCartItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    const id = product.id;
    const title = product.title;
    const imageUrl = product.imageUrl;
    const price = product.price;
    const description = product.description;
    const quantity = "1";
    const cart = new Cart(id, title, imageUrl, price, description, quantity);
    cart.updateProduct(id);
  });
  res.redirect("/cart");
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.cartId;
  Cart.removeProduct(prodId);
  res.redirect("/cart");
} 
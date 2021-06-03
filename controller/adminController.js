const { v4: uuidv4 } = require("uuid");

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    editingMode: "",
    prod: "",
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(uuidv4(), title, imageUrl, price, description);
  product.save(id, title, imageUrl, price, description);
  res.redirect("/");
};

exports.getAdminProduct = (req, res, next) => {
  Product.getProductsFromFile((product) => {
    res.render("admin/admin-products", {
      pageTitle: "Admin Product",
      path: "/admin-product",
      prods: product,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.removeProduct(prodId);
  res.redirect("/admin/admin-product");
};

exports.getEditProduct = (req, res, next) => {
  const params = req.params.productId;
  const query = req.query.edit;
  Product.findById(params, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      prod: product,
      editingMode: query,
    });
  });
};
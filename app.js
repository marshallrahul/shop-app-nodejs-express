const path = require("path");

const express = require("express");

const app = express();

const PORT = 8080;

const adminRouter = require("./router/adminRouter");
const shopRouter = require("./router/shopRouter");

const errorController = require("./controller/errorController");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use(errorController.get404page);

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is listening on PORT", PORT);
  }
});
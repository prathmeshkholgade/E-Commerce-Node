const express = require("express");
const app = express();
const db = require("./src/config/db");
const authRoutes = require("./src/routes/auth_routes");
const productRoutes = require("./src/routes/product_routes");
const cartRoutes = require("./src/routes/cart_routes")
const reviewRoutes = require("./src/routes/review_routes")
const engine = require("ejs-mate");
const port = process.env.PORT;
const path = require("path");
const cookieParser = require('cookie-parser');


app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/review", reviewRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
    return res.redirect("/product");
});

app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500, stack } = err;
    return res.json({ message: message, status, stack })
})


app.listen(port, () => {
    console.log(`server is listning to port ${port} `);
})
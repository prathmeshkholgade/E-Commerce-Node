const express = require("express");
const app = express();
const db = require("./src/config/db");
const authRoutes = require("./src/routes/auth_routes");
const productRoutes = require("./src/routes/product_routes");
const cartRoutes = require("./src/routes/cart_routes")
const reviewRoutes = require("./src/routes/review_routes");
const paymentRoutes = require("./src/routes/payment_routes")
const engine = require("ejs-mate");
const port = process.env.PORT;
const path = require("path");
const cookieParser = require('cookie-parser');
const { webHookHandler } = require("./src/controllers/payment_controller");
const methodOverride = require('method-override');
const { globalErrorHandler } = require("./src/utils/global_error_handler");

app.post("/payment/webhook",
    express.raw({ type: "application/json" }), webHookHandler);

app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use("/payment", paymentRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/review", reviewRoutes);
app.use("/product", productRoutes);



app.use(globalErrorHandler);


app.listen(port, () => {
    console.log(`server is listning to port ${port} `);
})
const express = require("express");
const app = express();
const db = require("./src/config/db");
const authRoutes = require("./src/routes/auth_routes");
const productRoutes = require("./src/routes/product_routes");
const cartRoutes = require("./src/routes/cart_routes")
const reviewRoutes = require("./src/routes/review_routes")

const port = process.env.PORT;

app.use(express.json())
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/review", reviewRoutes);
app.use("/product", productRoutes);



app.use((err, req, res, next) => {
    const { message = "something went wrong", status = 500 } = err;
    return res.json({ message: message, status })
})


app.listen(port, () => {
    console.log(`server is listning to port ${port} `);
})
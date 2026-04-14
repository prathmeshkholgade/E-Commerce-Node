const express = require("express");
const { verifyUser } = require("../middleware/middleware");
const { addToCart, getAllCarts } = require("../controllers/cart_controller");
const { asyncWrap } = require("../utils/async_wrap");
const router = express.Router();


router.post("/add", verifyUser, asyncWrap(addToCart));
router.get("/", verifyUser, asyncWrap(getAllCarts));





module.exports = router;
















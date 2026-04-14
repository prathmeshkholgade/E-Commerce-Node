

const express = require("express");
const { verifyUser, validateReview } = require("../middleware/middleware");
const { createReview, updateReview, deleteReview } = require("../controllers/review_controller");
const { asyncWrap } = require("../utils/async_wrap");
const router = express.Router();

router.post("/:id", verifyUser, validateReview, asyncWrap(createReview));
router.put("/review/:id", verifyUser, updateReview);
router.delete("/review/:id", verifyUser, deleteReview);


module.exports = router;


















const { product: Product, Review } = require("../models");
const ExpressError = require("../utils/express_error");

module.exports.createReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);

    if (!product) {
        return next(new ExpressError(404, "Product not found"));
    }

    const existingReview = await Review.findOne({
        where: { productId, userId }
    });

    if (existingReview) {
        return next(new ExpressError(400, "You already reviewed this product"));
    }

    const review = await Review.create({
        rating,
        comment,
        productId,
        userId
    });

    res.status(201).json({
        message: "Review added successfully",
        review
    });
};



module.exports.updateReview = async (req, res, next) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findByPk(id);

    if (!review) {
        return next(new ExpressError(404, "Review not found"));
    }

    // only owner can edit
    if (review.userId !== userId) {
        return next(new ExpressError(403, "Not authorized"));
    }

    await review.update({
        rating: rating ?? review.rating,
        comment: comment ?? review.comment
    });

    res.json({
        message: "Review updated successfully",
        review
    });
};


module.exports.deleteReview = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findByPk(id);

    if (!review) {
        return next(new ExpressError(404, "Review not found"));
    }


    if (review.userId !== userId) {
        return next(new ExpressError(403, "Not authorized"));
    }

    await review.destroy();

    res.json({
        message: "Review deleted successfully"
    });
};














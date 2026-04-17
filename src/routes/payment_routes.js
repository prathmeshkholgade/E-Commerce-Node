
const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe");
const { product } = require("../models");
const { cart: Cart, cartItem: CartItem, product: Product } = require("../models");
const { verifyUser } = require("../middleware/middleware");
const { webHookHandler } = require("../controllers/payment_controller");


router.post("/create-payment-intent", verifyUser, async (req, res) => {

    const userId = req.user.id;

    const cart = await Cart.findOne({
        where: {
            userId: userId
        },
        include: [
            {
                model: CartItem,
                attributes: ["quantity"],

                include: [
                    {
                        model: Product,
                        attributes: ["price"]
                    }
                ]
            }
        ]
    });
    const data = cart.cartItems;

    let total = 0;

    data.forEach((item) => {
        const price = Number(item.product.price);
        total += price * item.quantity;
    });

    

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "inr",

    });

    res.json({ clientSecret: paymentIntent.client_secret });


});


router.post("/create-payment", verifyUser, async (req, res) => {

    const userId = req.user.id;

    const cart = await Cart.findOne({
        where: {
            userId: userId
        },
        include: [
            {
                model: CartItem,
                attributes: ["quantity"],

                include: [
                    {
                        model: Product,
                        attributes: ["price"]
                    }
                ]
            }
        ]
    });

    const data = cart.cartItems;

    let total = 0;

    data.forEach((item) => {
        const price = Number(item.product.price);
        total += price * item.quantity;
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "cart total"
                    },
                    unit_amount: Number(total * 100)
                },
                quantity: 1
            }
        ],
        success_url: "http://localhost:8080/product",
        cancel_url: "http://localhost:8080/product",
    });

    res.json({ url: session.url });

   
});



module.exports = router;






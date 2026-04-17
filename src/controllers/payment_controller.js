

const stripe = require("../config/stripe")

module.exports.webHookHandler = (req, res) => {
    console.log("webhook hit");

    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(" Signature Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Event Type:", event.type);

    switch (event.type) {
        case "checkout.session.completed":
            console.log(" Payment Success");
            const session = event.data.object;
            console.log("Session:", session.id);
            console.log("Amount:", session.amount_total);
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}

const { cart: Cart, cartItem: CartItem, product: Product } = require("../models");
const cartitem = require("../models");



module.exports.getAllCarts = async (req, res) => {
    const userId = req.user.id;

    const carts = await Cart.findOne({
        where: {
            userId: userId
        },
        include: [{
            model: CartItem,
            include: [
                {
                    model: Product
                }
            ]
        }],
    })

    res.json({ carts })
}


module.exports.addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
        cart = await Cart.create({ userId });
    }


    let item = await CartItem.findOne({
        where: { cartId: cart.id, productId }
    });

    if (item) {
        item.quantity += quantity || 1;
        await item.save();
    } else {
        item = await CartItem.create({
            cartId: cart.id,
            productId,
            quantity: quantity || 1
        });
    }

    res.json({
        message: "Product added to cart",
        item
    });
};



module.exports.updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = quantity;
    await item.save();

    res.json({ message: "Updated", item });
};


module.exports.removeItem = async (req, res) => {
    const { id } = req.params;

    const item = await CartItem.findByPk(id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();

    res.json({ message: "Item removed" });
};
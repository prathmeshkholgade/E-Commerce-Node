const { product } = require("../models");

module.exports.createProduct = async (req, res) => {

    const { name, price, image, description } = req.body;

    const userId = req.user.id;

    const newProduct = await product.create({
        name,
        price,
        image,
        description,
        userId: userId
    })

    res.json({
        message: "new product created ",
        status: 200,
        newProduct
    })


}



module.exports.editProduct = async (req, res) => {

    const { id } = req.params;

    const { name, price, image, description } = req.body;
    const userId = req.user.id;

    const isProductExist = await product.findOne({
        where: {
            id: id
        }
    })
    if (!isProductExist) return res.json({ message: "product not founud", status: 400 })

    if (userId != isProductExist.userId) return res.json({ message: "you are not authorized to perform this operation", status: 400 });

    const updatedProduct = await product.update({
        name,
        price,
        image,
        description,
        userId: userId
    },

        {
            where: {
                id: id
            }
        }
    )

    res.json({
        message: " product updated",
        status: 200,
        updatedProduct
    })


}


module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    const userId = req.user.id;
    const p = await product.findOne({
        where: {
            id: id,

        }
    });
    if (!p) return res.json({
        message: "product not found",
        status: 400
    });

    if (userId != p.userId) {


        return res.json({
            message: "u re not authorized to perform this operation",
            status: 400
        })
    }
    await p.destroy()

    return res.json({
        message: "product deleted successfully",
        status: 200
    });
}

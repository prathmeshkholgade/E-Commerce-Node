const { product, user, Review } = require("../models");
const renderHomePage = async (req, res) => {
    const products = await product.findAll({
        include: [
            {
                model: user,
                attributes: ["fullName", "email"],
            },
        ],
    });

    return res.render("dashboard/home.ejs", { products, user: req.user });
}

const renderCreateProductPage = async (req, res) => {
    return res.render("product/create.ejs", { product: null });
}

const renderProductDetail = async (req, res) => {
    const { id } = req.params;
    const p = await product.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: user,
                attributes: ["fullName", "email", "id"],
            },
            {
                model: Review,
                include: [
                    {
                        model: user,
                        attributes: ["fullName", "email"],
                    },
                ],
            },
        ],
        order: [[Review, "createdAt", "DESC"]],
    });

    if (!p) {
        return res.status(404).render("dashboard/product_detail.ejs", { product: null });
    }

    return res.render("dashboard/product_detail.ejs", { product: p });
}
const createProduct = async (req, res) => {
    const { name, price, image, description } = req.body;
    const userId = req.user.id;

    await product.create({
        name,
        price,
        image,
        description,
        userId: userId,
    });


    return res.redirect("/product");
}

const renderEditPage = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.redirect("/product")
    }
    const p = await product.findOne({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        where: {
            id: id
        }
    });

    return res.render("product/create.ejs", { product: p });
}

const editProduct = async (req, res) => {

    const { id } = req.params;

    const { name, price, image, description } = req.body;
    const userId = req.user.id;

    const isProductExist = await product.findOne({
        where: {
            id: id
        }
    });

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


const deleteProduct = async (req, res) => {
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
    await p.destroy();

    return res.json({
        message: "product deleted successfully",
        status: 200
    });
}


module.exports = { renderHomePage, renderCreateProductPage, renderProductDetail, createProduct, renderEditPage, editProduct, deleteProduct }
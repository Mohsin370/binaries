const { Product } = require('../models');


const getProducts = async(req, res) => {
    try {
        const user_id = req.params.user_id;
        const products = await Product.findAll({
            where: {
                created_by: user_id
            }
        });
        res.send({
            success: true,
            message: "Products received",
            products
        })
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "error occured",
            error
        })
    };

}



module.exports = {
    getProducts
};
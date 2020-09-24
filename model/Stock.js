const mongoose = require("mongoose")

const stockSchema = mongoose.Schema({
    productId: Number,
    quantityInStock: Number,
    minimumQuantity: Number
})

module.exports = mongoose.model("stock", stockSchema, "stock")
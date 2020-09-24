const express = require("express")
const Stock = require("./model/Stock")
const router = express.Router()

// GET ALL
router.get("/stock", async (req, res) => {
    const warehouse = await Stock.find()
    res.send(warehouse)
})

// GET ONE
router.get("/stock/:id", async (req, res) => {
    try {
        const stock = await Stock.findOne({'productId': req.params.id})
        res.send(stock)
    } catch {
        res.status(404)
        res.send({error: "This product has no stock saved in DB !"})
    }
})

// POST
router.post("/stock", async (req, res) => {
    const stock = new Stock({
        productId: req.body.productId,
        quantityInStock: req.body.quantityInStock,
        minimumQuantity: req.body.minimumQuantity
    })
    console.log(stock)
    await stock.save()
    res.send(stock)
})

// DELETE
router.delete("/stock/:id", async (req, res) => {
    try {
        await Stock.deleteOne({ 'productId': req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "This product has no stock already saved in DB !" })
    }
})

// UPDATE
router.patch("/stock", async (req, res) => {
    try {
        const stock = await Stock.findOne({ 'productId': req.body.productId })

        if(req.body.quantityInStock) {
            stock.quantityInStock = req.body.quantityInStock
        }
        if(req.body.minimumQuantity) {
            stock.minimumQuantity = req.body.minimumQuantity
        }
        
        console.log(stock)
        await stock.save()
        res.send(stock)

    } catch {
        res.status(404)
        res.send({error: "This product has no stock saved in DB !"})
    }
})

module.exports = router
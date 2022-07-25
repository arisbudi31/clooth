const routers = require("express").Router()

const { cart } = require("../controllers")

routers.get("/carts", cart.getCarts)
routers.get("/carts/total-cart", cart.getTotalCarts)
routers.post("/carts", cart.addCarts)
routers.put("/carts/:id", cart.updateCart)
routers.delete("/carts/:id", cart.deleteCarts)

module.exports = routers
const routers = require("express").Router()
const { stockopname } = require('../controllers')

routers.get("/stockopname", stockopname.getStockopname)
routers.post("/stockopname", stockopname.addStockProduct)

module.exports = routers
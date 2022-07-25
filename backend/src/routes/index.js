const category = require("./category_router")
const product = require("./product_router")
const stockopname = require("./stockopname_router")
const cart = require("./cart_router")
// const adminRouter = require('./admin-routers')
const adminRouter = require("./admin_router")

module.exports = { category, product, adminRouter, stockopname, cart }

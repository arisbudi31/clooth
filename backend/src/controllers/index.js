const category = require('./category_controller')
const product = require('./product_controller')
const stockopname = require('./stockopname_controller')
const cart = require("./cart_controller")
const admin = require('./admin_controller')

module.exports = { category, product, admin, stockopname, cart }

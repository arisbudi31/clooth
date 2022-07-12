const routers = require("express").Router()
const { product } = require("../controllers")
const uploader = require("../helper/multer/multer_config")


routers.get("/product", product.getProduct)
routers.get("/product/:id", product.getProductById)
routers.post("/product", product.addProduct)
routers.patch("/product/:id", product.editProduct)
routers.delete("/product/:id", product.deleteProduct)
routers.post("/product/upload/:id", uploader.single("image"), product.uploadImage)

module.exports = routers
const routers = require("express").Router()

const { category } = require("../controllers")

routers.get("/category", category.getCategory)
routers.get("/all-category", category.getTotalCategory)
routers.patch("/category/:id", category.editCategory)
routers.post("/category", category.addCategory)
routers.delete("/category/:id", category.deleteCategory)

module.exports = routers
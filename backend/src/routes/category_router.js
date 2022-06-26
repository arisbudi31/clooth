const routers = require("express").Router()

const { category } = require("../controllers")

routers.get("/category", category.getCategory)
routers.get("/category/:name", category.getCategoryByName)
routers.get("/category/:id", category.getCategoryById)
routers.patch("/category/:id", category.editCategory)
routers.post("/category", category.addCategory)
routers.delete("/category/:id", category.deleteCategory)

module.exports = routers
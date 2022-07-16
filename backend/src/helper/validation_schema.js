const joi = require("joi")
module.exports.productSchema = joi.object({
  productName: joi.string().min(3).max(45).required(),
  description: joi.string().min(50).max(300).required(),
  price: joi.number().integer().min(100).required(),
  stock: joi.number().integer().min(1).required(),
  idCategory: joi.number().integer().required(),
  image: joi.string()
})

module.exports.categorySchema = joi.object({
  categoryName: joi.string().min(3).max(45).required(),
  slug: joi.string().min(3).max(45).required(),
})
const joi = require("joi")
module.exports.productSchema = joi.object({
  productName: joi.string().min(3).max(45).required(),
  description: joi.string().min(50).max(300).alphanum().required(),
  price: joi.number().min(3).max(13).integer().required(),
  stock: joi.number().min(3).max(6).integer().required(),
})

module.exports.categorySchema = joi.object({
  categoryName: joi.string().min(3).max(45).required(),
  slug: joi.string().min(3).max(45).required(),
})
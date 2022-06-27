const db = require("../config").promise()
const createError = require("../helper/create_error")
const createResponse = require("../helper/create_response")
const httpStatus = require("../helper/http_status_code")
const path = require("path")
const fs = require("fs")
const { productSchema } = require("../helper/validation_schema")
const dir = "./public/products"

module.exports.getProduct = async (req, res) => {

  const per_page = Number(req.query.per_page) || 4
  const current_page = Number(req.query.current_page) || 1
  const search = req.query.search || ""
  const filter = req.query.filter || ""

  try {
    const offset = (current_page - 1) * per_page

    const GET_PRODUCTS = `SELECT p.id, p.productName, p.description, p.price, p.stock, p.image, p.idCategory, c.categoryName
    FROM warehouse.products AS p
    JOIN warehouse.categories AS c ON p.idCategory = c.id
    WHERE p.productName LIKE "%${search}%" AND c.categoryName LIKE "%${filter}%" 
    LIMIT ${offset}, ${per_page};`

    const [products] = await db.execute(GET_PRODUCTS)

    if (!products.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Produk tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Produk tidak ditemukan')
    }

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, products
    )

    res.status(responseStatus.status).send(responseStatus)
  } catch (error) {
    console.log(error)
  }
}

module.exports.getProductById = async (req, res) => {

  const id = req.params.id

  try {
    const GET_PRODUCTS = `SELECT p.id, p.productName, p.description, p.price, p.stock, p.image, p.idCategory, c.categoryName
    FROM warehouse.products AS p
    JOIN warehouse.categories AS c ON p.idCategory = c.id
    WHERE p.id = ${id}`

    const [products] = await db.execute(GET_PRODUCTS)

    if (!products.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Produk tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Produk tidak ditemukan')
    }

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, products
    )

    res.status(responseStatus.status).send(responseStatus)
  } catch (error) {
    console.log(error)
  }
}


module.exports.editProduct = async (req, res) => {

  const idProduct = req.params.id

  try {

    const { error } = productSchema.validate(req.body)

    if (error) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, error.details[0].message
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, error.details[0].message)
    }

    const { productName, description, price, stock, idCategory } = req.body

    const PRODUCT = `SELECT * FROM categories WHERE id = ?;`

    const [product] = await db.execute(PRODUCT, [idProduct])

    if (!product.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Data product tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'product tidak ditemukan')
    }

    const UPDATE_PRODUCT = `UPDATE products SET productName = ?, description = ?, price = ?, stock = ?, idCategory = ? WHERE id = ?;`

    await db.execute(UPDATE_PRODUCT, [productName, description, price, stock, idCategory, idProduct])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Product has been updated"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.addProduct = async (req, res) => {
  try {

    const { error } = productSchema.validate(req.body)

    if (error) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, error.details[0].message
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, error.details[0].message)
    }

    const { productName, description, price, stock, idCategory } = req.body

    const CHECK_PRODUCT = `SELECT * FROM products WHERE productName = ?;`

    const [product] = await db.execute(CHECK_PRODUCT, [productName])

    if (product.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Data product sudah ada'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Data product sudah ada')
    }

    const ADD_PRODUCT = `INSERT INTO products(productName, description, price, stock, idCategory) VALUES (${db.escape(productName)}, ${db.escape(description)}, ${db.escape(price)}, ${db.escape(stock)}, ${db.escape(idCategory)})`
    await db.execute(ADD_PRODUCT)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Product has been added"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteProduct = async (req, res) => {
  const idProduct = req.params.id

  try {
    const CHECK_PRODUCT = `SELECT * FROM products WHERE id = ?;`
    const [product] = await db.execute(CHECK_PRODUCT, [idProduct])

    if (!product.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Product tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'product tidak ditemukan')
    }

    const DELETE_PRODUCT = `DELETE FROM products WHERE id = ?;`
    await db.execute(DELETE_PRODUCT, [idProduct])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Data has been deleted"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.uploadImage = async (req, res) => {

  const id = req.params.id

  try {

    if (!req.file) {
      throw new createError(httpStatus.BAD_REQUEST, "Bad request, file not found")
    }

    const baseUrlImage = `${req.protocol}://${req.get("host")}/products/${req.file.filename}`

    const UPLOAD_IMAGE = `UPDATE products SET image = '${baseUrlImage}' WHERE id = ?`

    await db.execute(UPLOAD_IMAGE, [id])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'Success', true, 1, 1, baseUrlImage
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log("error : ", error)
    fs.unlinkSync(path.join(dir + req.file))
  }
}

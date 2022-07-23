const db = require("../config").promise()
const moment = require("moment")
const createError = require("../helper/create_error")
const createResponse = require("../helper/create_response")
const httpStatus = require("../helper/http_status_code")
const { stockopnameSchema } = require("../helper/validation_schema")

module.exports.getStockopname = async (req, res) => {
  const per_page = Number(req.query.per_page) || 10
  const current_page = Number(req.query.current_page) || 1

  try {
    const offset = (current_page - 1) * per_page

    const GET_STOCKOPNAME = `SELECT st.id, st.qty, st.status, st.created_at, prd.productName 
                              FROM stockopname as st JOIN products as prd ON st.id_product = prd.id;`

    const [stockopname] = await db.execute(GET_STOCKOPNAME)

    if (!stockopname.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'stockopname tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'stockopname tidak ditemukan')
    }

    const TOTAL_DATA = `SELECT COUNT (*) as total_data FROM stockopname;`

    const [total_data] = await db.execute(TOTAL_DATA)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, total_data[0], 1, stockopname
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.addStockProduct = async (req, res) => {

  try {
    const { error } = stockopnameSchema.validate(req.body)

    if (error) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, error.details[0].message
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, error.details[0].message)
    }

    const { id_product, qty, status, initStock } = req.body

    const CHECK_PRODUCT = `SELECT * FROM products WHERE id = ?;`

    const [products] = await db.execute(CHECK_PRODUCT, [id_product])

    if (!products.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Product Tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Product Tidak ditemukan')
    }

    const updateStock = Number(initStock) + Number(qty)

    const UPDATE_PRODUCT_STOCK = `UPDATE products SET stock = ? WHERE id = ?`
    await db.execute(UPDATE_PRODUCT_STOCK, [updateStock, id_product])

    const formatDate = "YYYY-MM-DD HH:mm:ss"
    const date = new Date()

    const createdAt = moment(date).format(formatDate)

    const INSERT_STOCKOPNAME = `INSERT INTO stockopname(id_product, qty, status, created_at) VALUES (${db.escape(id_product)}, ${db.escape(qty)}, ${db.escape(status)}, ${db.escape(createdAt)})`
    await db.execute(INSERT_STOCKOPNAME)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Stock has been added"
    )

    res.status(responseStatus.status).send(responseStatus)


  } catch (error) {
    console.log(error)
  }
}
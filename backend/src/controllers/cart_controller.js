const db = require("../config").promise()
const createError = require("../helper/create_error")
const createResponse = require("../helper/create_response")
const httpStatus = require("../helper/http_status_code")

module.exports.getCarts = async (req, res) => {

  try {

    const GET_CARTS = `SELECT c.id as cartId, c.cartQty, c.id_product, p.stock, p.productName, p.image, p.price FROM carts as c
    JOIN products as p ON c.id_product = p.id`

    const [carts] = await db.execute(GET_CARTS)

    if (!carts.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Keranjang kosong'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Keranjang kosong')
    }

    const TOTAL_CART = `SELECT COUNT (*) as total_cart FROM carts;`

    const [totalCart] = await db.execute(TOTAL_CART)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, totalCart[0], 1, carts
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.getTotalCarts = async (req, res) => {

  try {

    const TOTAL_CART = `SELECT COUNT (*) as total_cart FROM carts;`

    const [totalCart] = await db.execute(TOTAL_CART)

    if (totalCart[0] < 0) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Product belum ditambahkan dalam keranjang'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Product belum ditambahkan dalam keranjang')
    }

    console.log(totalCart[0])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, totalCart[0], 1, "product cart tersedia"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.addCarts = async (req, res) => {
  try {

    const { id_product } = req.body

    const CHECK_CART = `SELECT * FROM carts WHERE id_product = ?;`

    const [existProductCart] = await db.execute(CHECK_CART, [id_product])

    if (existProductCart.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'produk sudah ditambahkan dalam keranjang'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'produk sudah ditambahkan dalam keranjang')
    }

    const ADD_PRODUCT_CART = `INSERT INTO carts(id_product) VALUES (${db.escape(id_product)})`
    await db.execute(ADD_PRODUCT_CART)

    const TOTAL_CART = `SELECT COUNT (*) as total_cart FROM carts;`

    const [totalCart] = await db.execute(TOTAL_CART)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, totalCart[0], 1, "Product berhasil ditambahkan dalam cart"
    )

    res.status(responseStatus.status).send(responseStatus)


  } catch (error) {
    console.log(error)
  }
}

module.exports.updateCart = async (req, res) => {

  const idCart = req.params.id

  try {

    const { scope } = req.body

    const EXIST_CART = `SELECT c.id as cartId, c.cartQty, c.id_product, p.productName, p.stock, p.image, p.price FROM carts AS c
                        JOIN products AS p ON c.id_product = p.id 
                        WHERE c.id = ?;`

    const [exist_cart] = await db.execute(EXIST_CART, [idCart])

    if (!exist_cart.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Data cart tidak ditemukan'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'cart tidak ditemukan')
    }

    let cartQty = exist_cart[0].cartQty
    const stock = exist_cart[0].stock

    if (scope === "inc") {
      if (cartQty < stock) {
        cartQty += 1
      }
      else {
        cartQty
      }

    } else if (scope === "dec") {
      if (cartQty > 1) {
        cartQty -= 1
      }
      else {
        cartQty
      }
    }

    const UPDATE_CART_QTY = `UPDATE carts SET cartQty = ? WHERE id = ?;`

    await db.execute(UPDATE_CART_QTY, [cartQty, idCart])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Category has been updated"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteCarts = async (req, res) => {
  const idProduct = req.params.id

  try {
    const CHECK_PRODUCT_CART = `SELECT * FROM carts WHERE id_product = ?;`
    const [exist_product_cart] = await db.execute(CHECK_PRODUCT_CART, [idProduct])

    if (!exist_product_cart.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'Product tidak ditemukan dalam keranjang'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'Product tidak ditemukan dalam keranjang')
    }

    const DELETE_PRODUCT_CART = `DELETE FROM carts WHERE id_product = ?;`
    await db.execute(DELETE_PRODUCT_CART, [idProduct])

    const responseStatus = new createResponse(
      httpStatus.OK,
      'success', true, 1, 1, "Product has been deleted from carts"
    )

    res.status(responseStatus.status).send(responseStatus)

  } catch (error) {
    console.log(error)
  }
}


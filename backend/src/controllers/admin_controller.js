const db = require('../config').promise()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const createError = require('../helper/create-error')
const createRespond = require('../helper/create-respond')
const { statusCode, statusMessage } = require('../helper/http-status')
const { adminnameSchema, passwordSchema, emailSchema } = require('../helper/validator')

//ADMIN LOGIN
module.exports.loginAdmin = async (req, resp) => {
  const { adminname, password } = req.body
  try {
    //check data admin in db
    const getDataAdmin = `SELECT * FROM admins WHERE adminname = ${db.escape(adminname)} OR email = ${db.escape(adminname)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('data Admin when login:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `Admin ${adminname} doesn't found`)
    }

    //check password
    const match = await bcrypt.compare(password, adminData[0].password)
    console.log(`check password when login:`, match)
    if (!match) {
      throw new createError(statusCode.BAD_REQUEST, 'Password invalid')
    }

    //create token from jwt
    const token = await jwt.sign({ email: adminData[0].email }, process.env.SECRET_KEY)
    console.log('create Token Admin when login:', token)

    //send respond and token to client
    delete adminData[0].password
    adminData[0].token = token
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get Admin Data', 1, 1, adminData[0])
    console.log(`Respond at login:`, respond)
    resp.header('authToken', `BearerAdmin ${token}`).send(respond)

  } catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at login', err)
    resp.status(err.status).send(err.message)
  }
}

//ADMIN KEEP LOGIN
module.exports.keepLogin = async (req, resp) => {
  const email = req.email
  try {
    //check admin data in db
    const checkAdmin = `SELECT * FROM admins WHERE email = ?;`
    const [adminData] = await db.execute(checkAdmin, [email])
    console.log(`adminData at keep login:`, adminData)
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `admin with email from token doesn't found`)
    }

    //send respond to client
    delete adminData[0].password
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Keep Admin Login', 1, 1, adminData[0])
    resp.status(respond.status).send(respond.data)

  } catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at keep login:', err);
    resp.status(err.status).send(err.message)
  }
}

//FORGOT PASSWORD
module.exports.forgotPassword = async (req, resp) => {
  const { email } = req.body
  try {
    //check admin data in db
    const checkAdmin = `SELECT * FROM admins WHERE email = ?;`
    const [adminData] = await db.execute(checkAdmin, [email])
    console.log(`adminData at forgot password:`, adminData)
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `Admin with email ${email} doesn't exist`)
    }

    //send reset password link to client
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'projectfinal.group03@gmail.com',
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    })
    await transporter.sendMail({
      from: '"SUPER ADMIN CLOOTH"',
      to: `${email}`,
      subject: 'Reset Password for Admin',
      html: `
                <p> You are being sent this email because you requested to reset your password account at SEHTOLC as admin.</p>
                <p> We suggest you to save your password at Manage Password from browser.  </p>
                <br/>
                <a href='http://localhost:3000/admin/reset/${adminData[0].adminname}/reset/${email}'>Click here to input your new password</a>
            `
    })

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusCode.OK, 'Forget Password', 1, 1, "Check your email to reset your password")
    resp.status(respond.status).send(respond.data)
  } catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at forgot password:', err);
    resp.status(err.status).send(err.message)
  }
}

//RESET PASSWORD
module.exports.resetPassword = async (req, resp) => {
  const { email, password, repassword } = req.body
  const admin = req.params.adminname

  try {
    //validate password from schema validator
    const validateResetPassword = passwordSchema.validate(password, { details: true })
    console.log('validateResetPassword:', validateResetPassword)
    if (validateResetPassword.length) {
      throw new createError(statusCode.BAD_REQUEST, validateResetPassword[0].message)
    }

    //validate confirmation password
    if (repassword !== password) {
      throw new createError(statusCode.BAD_REQUEST, 'Confirmation Password must equal to Password')
    }

    //hashing password with bcrypt
    const hashPassword = await bcrypt.hash(password, 10)
    console.log('hashPassword at reset Password:', hashPassword);

    //update password in db
    const updatePassword = `UPDATE admins SET password = ? WHERE adminname = ? and email = ?;`
    await db.execute(updatePassword, [hashPassword, admin, email])

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Reset Password', 1, 1, 'Reset Password successfull, your password now has been changed.')
    resp.status(respond.status).send(respond.data)

  } catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at reset password:', err);
    resp.status(err.status).send(err.message)
  }
}

//REGISTER ADMIN
module.exports.addAdmin = async (req, resp) => {
  let { adminname, email, password, repassword } = req.body
  try {
    //validate adminname
    const validateAdminname = adminnameSchema.validate(adminname, { details: true })
    if (validateAdminname.length) {
      throw new createError(statusCode.BAD_REQUEST, validateAdminname[0].message)
    }

    //validate password from schema validator
    const validatePassword = passwordSchema.validate(password, { details: true })
    console.log('validatePassword:', validatePassword)
    if (validatePassword.length) {
      throw new createError(statusCode.BAD_REQUEST, validatePassword[0].message)
    }

    //validate confirmation password
    if (repassword !== password) {
      throw new createError(statusCode.BAD_REQUEST, 'Confirmation Password must equal to Password')
    }

    //validate email
    const validateEmail = emailSchema.validate(email, { details: true })
    console.log('validateEmail:', validateEmail)
    if (validateEmail.length) {
      throw new createError(statusCode.BAD_REQUEST, validateEmail[0].message)
    }

    //validate duplicate data in database
    const checkAdminData = ` SELECT adminname FROM admins WHERE adminname = ? OR email = ?;`
    const [adminsRows] = await db.execute(checkAdminData, [adminname, email])
    if (adminsRows.length) {
      throw new createError(statusCode.BAD_REQUEST, 'adminname or Email has been already exist.')
    }

    //do and execute query
    const addAdminData = `INSERT INTO admins (adminname, password, email) VALUES (?, ?, ?);`
    const [Info] = await db.execute(addAdminData, [adminname, password, email])
    console.log(`info when add admin:`, Info);

    //send respond to client
    const respond = new createRespond(statusCode.CREATED, statusMessage.CREATED, 'Add Admin', true, 1, 1, Info)
    resp.status(respond.status).send(respond.data)

  } catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at register admin:', err);
    resp.status(err.status).send(err.message)
  }
}

/////MANAGE USERS/////
//get user data
module.exports.getUserData = async (req, resp) => {
  const token = req.params.token
  const page = Number(req.query._page)
  const limit = Number(req.query._limit)
  const offset = (page - 1) * limit
  const sort = req.query._sort || 'id'
  const order = req.query._order || 'ASC'
  console.log(`page:`, page);
  console.log(`limit:`, limit);
  console.log(`sort:`, sort);
  console.log(`order:`, order);
  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email, role } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when get user data:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When get user data:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //get user data
    const getUsersData = `SELECT * FROM users ORDER BY ${sort} ${order} LIMIT ${offset}, ${limit};`
    const [usersData] = await db.execute(getUsersData)
    console.log('all users Data:', usersData);
    if (!usersData.length) {
      throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
    }
    //get total data
    const getTotal = `SELECT COUNT (*) AS total FROM users;`
    const [totalUsers] = await db.execute(getTotal)
    console.log(`total users data:`, totalUsers);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get all Users Data', usersData.length, totalUsers[0].total, usersData)
    resp.status(respond.status).send(respond)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at get users data:', err);
    resp.status(err.status).send(err.message)
  }
}

//change userPermit
module.exports.changeUserPermit = async (req, resp) => {
  const body = req.body
  const token = req.params.token
  const userId = req.params.userId
  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when change user permit:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When change user permit:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //check user by id
    const checkUser = `SELECT * FROM users WHERE id = ${db.escape(userId)}`
    const [userData] = await db.execute(checkUser)
    console.log(`data user when change permit:`, userData);
    if (!userData.length) {
      throw new createError(statusCode.NOT_FOUND, `user with id ${userId}, doesn't exist`)
    }

    //check body
    let values = []
    //do looping for get properti and value
    for (let key in body) {
      values.push(`${key} = '${body[key]}'`)
    }
    console.log(`values:`, values);

    //do and execute query
    const patchUser = `UPDATE users SET ${values} WHERE id = ${db.escape(userId)};`
    const [Info] = await db.execute(patchUser)
    console.log(`INFO when patch permit:`, Info);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, "PATCH user Permit", 1, 1, Info)
    console.log(`respond when chanage permit:`, respond);
    resp.status(respond.status).send(respond.message)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at change permit user:', err);
    resp.status(err.status).send(err.message)
  }
}

//search user by username
module.exports.searchUser = async (req, resp) => {
  const username = req.query._username
  try {
    //check user by username
    const checkUser = `SELECT * FROM users WHERE username = ${db.escape(username)}`
    const [userData] = await db.execute(checkUser)
    console.log(`search user by username:`, userData);
    if (!userData.length) {
      throw new createError(statusCode.NOT_FOUND, `username ${username} doesn't exist`)
    }

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, "GET user by username", 1, 1, userData)
    console.log(`respond when get user by username:`, respond);
    resp.status(respond.status).send(respond.data)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at change permit user:', err);
    resp.status(err.status).send(err.message)
  }
}

/////ORDERS/////
//See all users Cart
module.exports.adminCarts = async (req, resp) => {
  const token = req.params.token
  const page = Number(req.query._page)
  const limit = Number(req.query._limit)
  const offset = (page - 1) * limit
  const sort = req.query._sort || 'id'
  const order = req.query._order || 'ASC'
  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when get user carts:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When get user carts:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //get user carts
    const getUserCarts = `SELECT * FROM carts ORDER BY ${sort} ${order} LIMIT ${offset}, ${limit};`
    const [userCarts] = await db.execute(getUserCarts)
    console.log('all users Carts:', userCarts);
    if (!userCarts.length) {
      throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
    }
    //get total carts
    const getTotal = `SELECT COUNT(*) AS total FROM carts;`
    const [totalCarts] = await db.execute(getTotal)
    console.log(`total users carts:`, totalCarts);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get all User Carts', userCarts.length, totalCarts[0].total, userCarts)
    resp.status(respond.status).send(respond)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at get users carts:', err);
    resp.status(err.status).send(err.message)
  }
}

//get all new order
module.exports.newOrder = async (req, resp) => {
  const token = req.params.token
  const page = Number(req.query._page)
  const limit = Number(req.query._limit)
  const offset = (page - 1) * limit
  const sort = req.query._sort || 'head.id'
  const order = req.query._order || 'ASC'

  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when get all new order:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When get all new order:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //get new order
    const getNewOrder = `SELECT head.id AS invId, head.invNumber, det.productId, det.id AS detailId, FORMAT(det.priceAtTime, 0) AS price, det.reservedStock AS qty, FORMAT((det.priceAtTime*det.reservedStock),0) AS amount, FORMAT(SUM(det.priceAtTime*det.reservedStock), 0) AS totalPayment, head.shippingStatus, DATE_FORMAT(pay.createdAt,'%y-%m-%d') AS paymentDate, head.userId, adr.city AS cityAddress, pay.paymentEvidence, pay.adminApproved
        FROM invoice_headers AS head
        JOIN invoice_details AS det ON det.invHeaderId = head.id
        JOIN users AS us ON us.id = head.userId
        JOIN user_address AS adr ON adr.id = head.userAddressId
        JOIN payment_confirmation AS pay ON pay.invHeaderId = head.id
        JOIN admins AS adm ON adm.id = head.adminId
        WHERE adminApproved = 'waiting'
        GROUP BY head.id
        ORDER BY ${sort} ${order} LIMIT ${offset}, ${limit};`
    const [newOrder] = await db.execute(getNewOrder)
    console.log('new Order:', newOrder);
    if (!newOrder.length) {
      throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
    }
    //get total data
    const getTotal = `SELECT COUNT(*) AS totalInvoice 
        FROM invoice_headers AS head
        JOIN payment_confirmation AS pay ON pay.invHeaderId = head.id
        WHERE adminApproved = 'waiting';`
    const [totalNewOrder] = await db.execute(getTotal)
    console.log(`total new Order:`, totalNewOrder);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get all new Order', newOrder.length, totalNewOrder[0].totalInvoice, newOrder)
    resp.status(respond.status).send(respond)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at get all new order:', err);
    resp.status(err.status).send(err.message)
  }
}

//approved new order
module.exports.approveNewOrder = async (req, resp) => {
  const body = req.body
  const token = req.params.token
  const invId = req.params.invId
  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when approve new order:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When approve new order:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //check invoice number
    const checkInvoice = `SELECT * FROM invoice_headers WHERE id = ${db.escape(invId)}`
    const [invNo] = await db.execute(checkInvoice)
    console.log(`invoice number at approve new order:`, invNo);
    if (!invNo.length) {
      throw new createError(statusCode.NOT_FOUND, `invoice number ${invId}, doesn't exist`)
    }

    //check body
    let values = []
    //do looping for get properti and value
    for (let key in body) {
      values.push(`${key} = '${body[key]}'`)
    }
    console.log(`values:`, values);

    //do and execute query
    const patchApprove = `UPDATE payment_confirmation SET ${values} WHERE invHeaderId = ${db.escape(invId)};`
    const [Info] = await db.execute(patchApprove)
    console.log(`INFO when patch approve new order:`, Info);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, "PATCH approve new order", 1, 1, Info)
    console.log(`respond when approve new order:`, respond);
    resp.status(respond.status).send(respond.message)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at approve new order:', err);
    resp.status(err.status).send(err.message)
  }
}

//get all transactions
module.exports.getAllTransactions = async (req, resp) => {
  const token = req.params.token
  const page = Number(req.query._page)
  const limit = Number(req.query._limit)
  const offset = (page - 1) * limit
  const sort = req.query._sort || 'det.id'
  const order = req.query._order || 'ASC'

  try {
    //verify token
    if (!token) {
      throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
    }
    const { email } = jwt.verify(token, process.env.SECRET_KEY)
    console.log('email admin when get all new order:', email)

    //check admin data
    const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
    const [adminData] = await db.execute(getDataAdmin)
    console.log('Data Admin When get all new order:', adminData);
    if (!adminData.length) {
      throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
    }

    //get all transactions
    const getAllTransactions = `SELECT det.id AS detailId, head.id AS invId, head.invNumber, det.productId, FORMAT(det.priceAtTime, 0) AS price, det.reservedStock AS qtyOrder, FORMAT((det.priceAtTime*det.reservedStock), 0) AS amount, FORMAT(SUM(det.priceAtTime*det.reservedStock), 0) AS totalPayment, head.shippingStatus, DATE_FORMAT(pay.createdAt,'%y-%m-%d') AS paymentDate, head.userId, adr.city AS cityAddress, pay.paymentEvidence, pay.adminApproved
        FROM invoice_headers AS head
        JOIN invoice_details AS det ON det.invHeaderId = head.id
        JOIN users AS us ON us.id = head.userId
        JOIN user_address AS adr ON adr.id = head.userAddressId
        JOIN payment_confirmation AS pay ON pay.invHeaderId = head.id
        JOIN admins AS adm ON adm.id = head.adminId
        GROUP BY det.id
        ORDER BY ${sort} ${order} LIMIT ${offset}, ${limit};`
    const [allTransactions] = await db.execute(getAllTransactions)
    console.log('all transactions:', allTransactions);
    if (!allTransactions.length) {
      throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
    }

    //get total transactions
    const getTotalTransactions = `SELECT COUNT(*) AS totalInvoice 
        FROM invoice_headers AS head;`
    const [totalTransactions] = await db.execute(getTotalTransactions)
    console.log(`total transactions:`, totalTransactions);

    //send respond to client
    const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get all transactions', allTransactions.length, totalTransactions[0].totalInvoice, allTransactions)
    resp.status(respond.status).send(respond)
  }
  catch (err) {
    const throwError = err instanceof createError
    if (!throwError) {
      new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
    }
    console.log('error at get all transactions:', err);
    resp.status(err.status).send(err.message)
  }
}

/////REPORTS//////
//GET TOTAL REPORTS//
module.exports.TotalReports = async(req, resp) => {
    const token = req.params.token
    var totalReports = []
    const fixedCostPerMonth = 1000000
    try {
        //verify token
        if(!token){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }
        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        console.log('email admin when get all new order:', email)

        //check admin data
        const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
        const [adminData] = await db.execute(getDataAdmin)
        console.log('Data Admin When get all new order:', adminData);
        if(!adminData.length){
            throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
        }

        //get total User
        const getTotalCustomers = `SELECT COUNT(*) AS totalCustomers
        FROM users;`
        const [totalCustomer] = await db.execute(getTotalCustomers)

        //get total order
        const getTotalOrders = `SELECT COUNT(invoice_headers.id) AS totalOrders
        FROM invoice_headers;`
        const [totalOrder] = await db.execute(getTotalOrders)

        //get total fixed Cost
        const getTotalFixedCost = `SELECT COUNT(Month), COUNT(Month)*${fixedCostPerMonth} AS totalFixedCost
        FROM
        (SELECT MONTH(pay.createdAt) AS month
        FROM payment_confirmation AS pay
        GROUP BY month) AS month;`
        const [totalFixedCost] = await db.execute(getTotalFixedCost)
        console.log(`totalFixedCost:`, totalFixedCost);

        //get total Report
        const getTotalReport = `SELECT sum(det.reservedStock) AS totalSoldProduct, SUM(det.priceAtTime*det.reservedStock) AS totalRevenue, SUM(pd.basePrice*det.reservedStock) AS totalProductPrice, SUM(pd.cost*det.reservedStock) AS totalVariableCost
        FROM invoice_details AS det
        JOIN products AS pd ON pd.id = det.productId;`
        const [totalReport] = await db.execute(getTotalReport)
        if(!totalReport.length){
            throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
        }

        const totalCost = Number(totalReport[0].totalProductPrice) + Number(totalReport[0].totalVariableCost) + Number(totalFixedCost[0].totalFixedCost)
        const totalProfit = Number(totalReport[0].totalRevenue) - totalCost

        totalReports.push({
            "totalCustomer" : totalCustomer[0].totalCustomers,
            "totalOrder" : totalOrder[0].totalOrders,
            "totalSoldProduct" : Number(totalReport[0].totalSoldProduct),
            "totalRevenue" : Number(totalReport[0].totalRevenue), 
            "totalCost" : totalCost, 
            "totalProfit" : totalProfit,
        })
        console.log(`totalReports:`,totalReports);

        //send respond to client
        const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get total Report', 1, 1, totalReports)
        resp.status(respond.status).send(respond)
    }
    catch(err) {
        const throwError = err instanceof createError
        if(!throwError){
            new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
        } 
        console.log('error at get total reports:', err);
        resp.status(err.status).send(err.message)
    }
}

//Report ORDER BY//
module.exports.ReportBy = async(req, resp) => {
    const token = req.params.token
    const order = req.query._order || 'month'

    try {
        //verify token
        if(!token){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }
        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        console.log('email admin when get all new order:', email)

        //check admin data
        const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
        const [adminData] = await db.execute(getDataAdmin)
        console.log('Data Admin When get all new order:', adminData);
        if(!adminData.length){
            throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
        }

        //get report period
        const getReportsBy = `SELECT sum(det.reservedStock) AS totalSoldProduct, FORMAT(SUM(det.priceAtTime*det.reservedStock), 0) AS totalRevenue, WEEK(pay.createdAt) AS weeks, MONTH(pay.createdAt) AS month
        FROM invoice_details AS det
        JOIN invoice_headers AS head ON head.id = det.invHeaderId
        JOIN payment_confirmation AS pay ON pay.invHeaderId = head.id
        GROUP BY ${order}
        ORDER BY ${order} ASC;`
        const [reportsBy] = await db.execute(getReportsBy)
        console.log('reportBy:', reportsBy);
        if(!reportsBy.length){
            throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
        }

        //send respond to client
        const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get report period by', reportsBy.length, reportsBy.length, reportsBy)
        resp.status(respond.status).send(respond)
    }
    catch(err) {
        const throwError = err instanceof createError
        if(!throwError){
            new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
        } 
        console.log('error at get reports periode by:', err);
        resp.status(err.status).send(err.message)
    }
}

//get top 3 most sold
module.exports.TopThree = async(req, resp) => {
    const token = req.params.token

    try {
        //verify token
        if(!token){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }
        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        console.log('email admin when get all new order:', email)

        //check admin data
        const getDataAdmin = `SELECT * FROM admins WHERE email = ${db.escape(email)};`
        const [adminData] = await db.execute(getDataAdmin)
        console.log('Data Admin When get all new order:', adminData);
        if(!adminData.length){
            throw new createError(statusCode.NOT_FOUND, `email Admin ${email} doesn't found`)
        }

        //get top 3 product most sold
        const getTop3 = `SELECT det.productId AS productId, pd.image, SUM(det.reservedStock) AS qtyOrder
        FROM invoice_details AS det
        JOIN products AS pd ON pd.id = det.productId
        GROUP BY productId
        ORDER BY qtyOrder DESC
        LIMIT 3;`
        const [top3] = await db.execute(getTop3)
        if(!top3.length){
            throw new createError(statusCode.BAD_REQUEST, statusMessage.BAD_REQUEST)
        }

        //send respond to client
        const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Get report period by', top3.length, top3.length, top3)
        resp.status(respond.status).send(respond)
    }
    catch(err) {
        const throwError = err instanceof createError
        if(!throwError){
            new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
        } 
        console.log('error at get top3:', err);
        resp.status(err.status).send(err.message)
    }
}
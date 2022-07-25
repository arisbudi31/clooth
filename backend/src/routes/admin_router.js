const routers = require('express').Router()
const admin = require('../controllers/admin_controller')
const auth = require('../helper/authentication')

//define ruters
//admin login
routers.post('/admin/login', admin.loginAdmin)
routers.get('/admin/keep-login', auth, admin.keepLogin)
routers.post('/admin/forgot-password', admin.forgotPassword)
routers.patch('/admin/reset-password/:adminname', admin.resetPassword)
//add admin
routers.post('/admin/:token/add-admin', admin.addAdmin)
//manage users
routers.get('/admin/:token/get-users-data', admin.getUserData)
routers.patch('/admin/:token/change-permit/:userId', admin.changeUserPermit)
routers.get('/admin/search-user', admin.searchUser)
//manage orders
routers.get('/admin/:token/get-new-orders', admin.newOrder)
routers.patch('/admin/:token/approve-order/:invId', admin.approveNewOrder)
routers.get('/admin/:token/get-all-orders', admin.getAllTransactions)

module.exports = routers
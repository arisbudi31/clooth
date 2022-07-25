const routers = require('express').Router()
const admin = require('../controllers/admin-controllers')
const auth = require('../helpers/authentication')

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
routers.get('/admin/:token/get-all-orders',admin.getAllTransactions)
//get reports
routers.get('/admin/:token/get-total-reports', admin.TotalReports)
routers.get('/admin/:token/get-periode-reports', admin.ReportBy)
routers.get('/admin/:token/get-top-3', admin.TopThree)

module.exports = routers
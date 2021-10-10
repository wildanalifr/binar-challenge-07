var express = require('express')
var router = express.Router()

//controllers
const user = require('../controllers/userController')

//middleware restrict untuk check sudah login apa belum
const restrict = require('../middleware/restrict')

/* USER Routes */

/* === DASHBOARD === */
router.get('/dashboard', restrict, user.pageDashboard)
// router.post('/login', user.loginUser)

/* === MAKE ROOM === */
router.get('/make-room', restrict, user.pageMakeRoom)
router.post('/make-room', restrict, user.createRoom)

/* === INPUT ROOM === */
router.get('/input-room', restrict, user.pageInputRoom)
router.post('/input-room', restrict, user.inputRoom)

/* === USER IN ROOM === */
router.post('/user-in-room', restrict, user.inputUserInRoom)

/* === USER LAIN SUDAH INPUT ATAU BELUM === */
router.get('/user-sudah-input', restrict, user.userLainInput)

module.exports = router

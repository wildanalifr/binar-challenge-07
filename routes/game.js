var express = require('express')
var router = express.Router()

//controllers
const game = require('../controllers/gameController')

//middleware restrict untuk check sudah login apa belum
const restrict = require('../middleware/restrict')

/* GAME Routes */

router.get('/', restrict, game.pageGame)

module.exports = router

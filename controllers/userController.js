const { master_room } = require('../models')
const { Op } = require('sequelize')

let ids = {
  idPlayer1: null,
  idPlayer2: null,
}

module.exports = {
  /* === DASHBOARD === */

  pageDashboard: (req, res) => {
    let username = req.user.dataValues.username
    let id = req.user.dataValues.id
    // console.log(req.user.dataValues)
    res.render('User/Dashboard/index', {
      title: 'Dashboard User',
      username,
      id,
    })
  },

  // allHistoryFight: async (req, res) => {
  //   let data = await master_room.findAll({
  //     where: { id_player_1: req.user.dataValues.id },
  //   })
  // },

  /* === MAKE ROOM === */

  pageMakeRoom: (req, res) => {
    res.render('User/MakeRoom/index', { title: 'Dashboard User' })
  },

  createRoom: async (req, res) => {
    const nama_room = req.body.nama_room
    let randomKode = Math.floor(Math.random() * 1000)
    let kode_unik = nama_room[0] + nama_room[nama_room.length - 1] + randomKode

    // console.log(nama_room, kode_unik)

    await master_room
      .create({
        nama_room,
        id_player_1: req.user.dataValues.id,
        id_player_2: null,
        kode_unik,
        hasil_ronde_1: null,
        hasil_ronde_2: null,
        hasil_ronde_3: null,
      })
      .then((result) => {
        res.render('User/MakeRoom/index', {
          title: 'Dashboard User',
          kode_unik,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  /* === INPUT ROOM === */
  pageInputRoom: (req, res) => {
    res.render('User/InputRoom/index', { title: 'Dashboard User' })
  },

  inputRoom: async (req, res) => {
    let data = await master_room.findOne({
      where: { kode_unik: req.body.kode_unik },
    })

    let isIdPlayer1 = await master_room.findOne({
      where: {
        [Op.and]: [
          { kode_unik: req.body.kode_unik },
          { id_player_1: req.user.dataValues.id },
        ],
      },
    })

    if (data) {
      if (isIdPlayer1) {
        ids.idPlayer1 = req.user.dataValues.id
      } else {
        ids.idPlayer2 = req.user.dataValues.id
      }

      console.log(ids)

      res.redirect('/game')
    } else {
      res.redirect('/login')
    }
  },
}

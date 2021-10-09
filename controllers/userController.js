const { master_room, user_in_room } = require('../models')
const { Op, where } = require('sequelize')

let id_room = null

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
      if (!isIdPlayer1) {
        master_room.update(
          {
            id_player_2: req.user.dataValues.id,
          },
          { where: { kode_unik: req.body.kode_unik } }
        )
      }

      let room = data.dataValues.id
      id_room = room

      res.redirect(`/game?room=${room}`)
    } else {
      res.redirect('/login')
    }
  },

  inputUserInRoom: async (req, res) => {
    let pilihan_tangan = req.body.pilihan_tangan
    let data = {
      id_room: id_room,
      id_user: req.user.dataValues.id,
      pilihan_tangan,
      permainan_ke: 1,
      point: null,
    }
    // await user_in_room
    //   .create(data)
    //   .then((result) => {
    //     console.log('berhasil tambah data')
    //     userLainInput()
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    let permainan_ke = data.permainan_ke
    let id_user = data.id_user

    userLainInput(id_room, permainan_ke, id_user)
  },
}

//check apakah user lain sudah input ?
async function userLainInput(id_room, permainan_ke, id_user) {
  //check data masih kosong atau tidak?
  let data = await user_in_room.findAll({
    where: {
      [Op.and]: [{ id_room: id_room }, { permainan_ke: permainan_ke }],
    },
  })

  let userLain = await user_in_room.findOne({
    where: {
      [Op.and]: [{ id_room: id_room }, { permainan_ke: permainan_ke }],
      id_user: { [Op.ne]: id_user },
    },
  })

  let poin = null

  // console.log(userLain)
  // data[0].dataValues.id_user == id_user

  if (data == '') {
    console.log('belum ada data yang masuk')
  } else {
    console.log('sudah ada data yang masuk')
    if (!userLain) {
      console.log('user lain belum memasukkan data')
      poin = null
    } else {
      console.log('user lain sudah memasukkan data')
    }
  }
}

// function checkInput(){
//   //jika pilih batu
//   let point = null
//   if(checkInput === 0) {
//     point = 0
//   }else if( checkInput === 1){
//     point = 50
//   }
// }

// fungsi untuk mengecheck apakah point user lain sudah ada?
// function isAnotherUserPoint

//fungsi checksiapa yang menang

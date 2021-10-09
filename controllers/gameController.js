exports.pageGame = (req, res) => {
  const dataImgs = [
    { img: '/assets/chapter-04/batu.png', value: 'batu' },
    { img: '/assets/chapter-04/kertas.png', value: 'kertas' },
    { img: '/assets/chapter-04/gunting.png', value: 'gunting' },
  ]

  let username = req.user.dataValues.username
  let player_id = req.user.dataValues.id

  res.render('Game/index', { title: 'Game', dataImgs, username, player_id })
}

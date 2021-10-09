exports.pageGame = (req, res) => {
  const dataImgs = [
    { img: '/assets/chapter-04/batu.png', value: 0 },
    { img: '/assets/chapter-04/kertas.png', value: 1 },
    { img: '/assets/chapter-04/gunting.png', value: 2 },
  ]

  let username = req.user.dataValues.username
  let player_id = req.user.dataValues.id

  res.render('Game/index', { title: 'Game', dataImgs, username, player_id })
}

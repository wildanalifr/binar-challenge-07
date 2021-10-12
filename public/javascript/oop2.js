// import axios from 'axios'

let pilihanPlayer = document.querySelectorAll('#players div')
let player_id = document.querySelector('#player_id').textContent

const BASE_URL = 'http://localhost:3000/user'

async function postPilihan(pilihan_tangan) {
  await fetch(`${BASE_URL}/user-in-room`, {
    method: 'POST',
    body: JSON.stringify({ pilihan_tangan }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

async function getSudahInput() {
  let data = null
  //   const response = await axios
  //     .get(`${BASE_URL}/user-sudah-input`)
  //     .then((result) => {
  //       data = result.data.bolehLanjut
  //     })
  //   return data
  await fetch(`${BASE_URL}/user-sudah-input`)
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => (data = json.bolehLanjut))

  return data
}

pilihanPlayer.forEach((pilih) => {
  pilih.addEventListener('click', () => {
    let pilihan = pilih.getElementsByTagName('img')[0].alt
    // alert(`${player_id} memilih ${pilihan}`)
    // postPilihan(pilihan)
    fetch(`${BASE_URL}/user-sudah-input`)
      .then((response) => response.json())

      // Displaying results to console
      .then((json) => {
        console.log(json.bolehLanjut)
        if (json.bolehLanjut) {
          postPilihan(pilihan)
          alert('anda boleh klik')
        } else {
          //   postPilihan(pilihan)
          alert('anda sudah memasukkan data tidak boleh klik')
        }
      })
      .catch((err) => console.log(err))
  })
})

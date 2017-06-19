/*
*
*     Tori - The Tesla Model 3, one badass
*     @author: Vikat0n
*
*/

let request = require('request-promise');

let AUTH_TOKEN;

function authenticate() {
  return new Promise((resolve, reject) => {
    let options = {
    	url: 'https://owner-api.teslamotors.com/oauth/token',
      form: {
        grant_type: 'password',
        client_id: 'e4a9949fcfa04068f59abb5a658f2bac0a3428e4652315490b659d5ab3f35a9e',
        client_secret: 'c75f14bbadc8bee3a7594412c31416f8300256d7668ea7e6e7f06727bfb9d220',
        email: 'XXX',
        password: 'XXXX'
      }
    }
    request.post(options).then((resp) => {
      AUTH_TOKEN = JSON.parse(resp)["access_token"]
      resolve("Tori has authenticated with Tesla API...")
    }).catch((err) => {
      reject(err)
    })
  })
}

function getVehicles() {
  let options = {
  	url: 'https://owner-api.teslamotors.com/api/1/vehicles',
    headers: {
      "Authorization": "Bearer " + AUTH_TOKEN
    }
  }
  request(options).then((resp) => {
    console.log(resp)
  }).catch((err) => {
    console.log(err)
  })
}

authenticate().then((res) => {
  console.log(res)
  getVehicles();             // To be continued...
}).catch((err) => {
  console.log(err)
})

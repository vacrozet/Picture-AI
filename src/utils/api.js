import axios from 'axios'

export let local = () => {
  return axios.create({
    baseURL: 'http://localhost:3005/',
    headers: {
      'Authorization': 'Bearer ' + global.localStorage.getItem('token')
    }
  })
}

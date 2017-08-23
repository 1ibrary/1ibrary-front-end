import axios from 'axios'
import qs from 'qs'

let defaultData = {
  uid: '',
  token: '',
  timestamp: ''
}

export function setToken(data) {
  defaultData = {
    ...defaultData,
    ...data
  }
}

let HOST = 'https://1ibrary.group/'

export const setHost = (host) => {
  HOST = host
}

axios.interceptors.response.use((response) => {
  console.dir(response)
  return response
}, error => {
  console.dir(error)
  return Promise.reject(error)
})

export default class HttpUtils {

  static get(url) {
    url = HOST + url
    return axios.get(url).then(response => response.data)
  }

  static post(url, data) {
    url = HOST + url
    
    data = {
      ...defaultData,
      ...data
    }

    return axios.post(url, data)
      .then(response => response.data)
      .catch(error => console.dir(error))
  }
}

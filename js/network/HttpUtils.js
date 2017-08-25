import axios from 'axios'
import { isDev } from '../common/util'

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

let baseUrl = 'https://1ibrary.group/'

export const setApiBaseUrl = (newBase) => {
  baseUrl = newBase
}

axios.interceptors.response.use((response) => {
  if (isDev) {
    console.dir(response)
  }
  return response
}, error => {
  console.dir(error)
  return Promise.reject(error)
})

export default class HttpUtils {

  static get(url) {
    url = baseUrl + url
    return axios.get(url).then(response => response.data)
  }

  static post(url, data) {
    url = baseUrl + url
    
    data = {
      ...defaultData,
      ...data
    }

    return axios.post(url, data)
      .then(response => response.data)
      .catch(error => console.dir(error))
  }
}

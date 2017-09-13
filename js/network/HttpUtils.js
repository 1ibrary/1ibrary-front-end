import axios from 'axios'
import { isDev } from '../common/util'
import configureResponseError from './interceptors/response_error'
import configureTimeout from './interceptors/timeout'

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

axios.interceptors.response.use(null, configureResponseError)
axios.interceptors.request.use(configureTimeout, null)

axios.interceptors.response.use((response) => {
  if (isDev) {
    const api = new URL(response.config.url)
    console.log(api.pathname, response)
  }
  return response
}, error => {
  if (isDev) {
    const api = new URL(error.config.url)
    console.log(api.pathname, error)
  }
  return Promise.reject(error)
})

axios.defaults.timeout = 20000

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

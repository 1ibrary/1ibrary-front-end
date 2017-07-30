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

export default class HttpUtils {

  static get(url) {
    return axios.get(url).then(response => response.data)
  }

  static post(url, data) {
    data = {
      ...defaultData,
      ...data
    }

    data = qs.stringify(data)

    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.data)
  }
}

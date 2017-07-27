import axios from 'axios'

let defaultData = {
  uid: '',
  token: '',
  timestamp: ''
}

export function setDefaultData(data) {
  defaultData = {
    ...defaultData,
    ...data
  }
}

export default class HttpUtils {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  static post(url, data) {
    data = { ...defaultData, ...data }
    return new Promise((resolve, reject) => {
      // alert(JSON.stringify(data))
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: this.changeData(data)
      })
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  static changeData(obj) {
    var prop,
      str = ''
    var i = 0
    for (prop in obj) {
      if (!prop) {
        return
      }
      if (i == 0) {
        str += prop + '=' + obj[prop]
      } else {
        str += '&' + prop + '=' + obj[prop]
      }
      i++
    }
    // alert(str);
    return str
  }
}

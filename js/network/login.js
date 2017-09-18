import Storage from '../common/storage'
import { setApiBaseUrl, setToken } from './HttpUtils'
import HttpUtils from './HttpUtils'
import { USERS } from './Urls'
import store from '../redux/store'
import { fetchProfileSuccess } from '../redux/modules/user'
import schools from './schools'
import initApp from '../redux/modules/init'

let reLoginInterval = null

const login = async (account, password, school_id) => {
  const params = {
    account,
    password,
    school_id
  }

  const response = await HttpUtils.post(USERS.login, params)
  if (response.status !== 0) {
    const msg = response.msg || '登录失败，请检查账号或者密码是否正确'
    throw new Error(msg)
  }

  await Storage.set('user', {
    ...params
  })

  const {
    uid,
    token,
    timestamp
  } = response.data

  setToken({
    uid,
    token,
    timestamp
  })

  store.dispatch(fetchProfileSuccess(response.data))
  store.dispatch(initApp())
  
  if (!reLoginInterval) {
    autoReLogin()
  }

  return response
}

export default login

export function autoReLogin () {
  reLoginInterval = setInterval(async () => {
    const user = await Storage.get('user', {})
    if (!user.account || !user.password) {
      return
    }

    setApiBaseUrl(schools[user.school_id].host)

    try {
      login(user.account, user.password, user.school_id)
    } catch (e) {
      console.log(e)
    }
  }, 3600 * 1000)
}
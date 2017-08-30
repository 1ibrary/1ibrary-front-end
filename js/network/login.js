import Storage from '../common/storage'
import { setToken } from './HttpUtils'
import HttpUtils from './HttpUtils'
import { USERS } from './Urls'

export default async function login (account, password, school_id) {
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

  return response
}

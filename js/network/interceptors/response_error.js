import { Toast } from 'antd-mobile'
import ErrorCode from '../../constants/error_code'

export default function configureResponseError (error) {

  if (error.message === ErrorCode.NetworkError) {
    Toast.offline('网络连接失败，请检查网络连接并重试', 1)
  }

  if (
    error.message === ErrorCode.ConnectTimeOut
    ||
    error.code === ErrorCode.ConnectTimeOut
  ) {
    Toast.offline('连接超时，请检查网络连接并重试', 1)
  }

  return Promise.reject(error)
}

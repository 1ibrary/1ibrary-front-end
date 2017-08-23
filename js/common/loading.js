import Toast from 'antd-mobile/lib/toast'

export default async function fetchData (func) {
  Toast.loading('正在加载', 0)
  try {
    await func()
  } catch (e) {
    Toast.fail('加载失败，请稍后重试', 1)
    return
  }
  Toast.success('已加载最新数据', 1)
}

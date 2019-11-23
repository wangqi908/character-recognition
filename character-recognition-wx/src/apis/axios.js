// 导出一个axios函数，用来发送请求获取数据
import store from '../store'
import { setUrLParams } from '../utils'
const BASE_URL = store.state.BASE_URL
export default function req(url, data = {}, method = 'GET', setParams) {
  url = url.indexOf('http') != -1 ? url : BASE_URL + url //如果url是完整链接,就取消BASE_URL

  method = method.toUpperCase();

  if (setParams) {
    url = url + '?' + setUrLParams(data)
  }

  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success: res => {
        wx.hideLoading()
        resolve(res)
      },
      fail: err => {
        wx.hideLoading()
        console.log(err)
        reject(err)
      }
    })
  })
}
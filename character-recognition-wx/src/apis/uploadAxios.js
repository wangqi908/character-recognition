// 导出一个axios函数，用来发送请求获取数据
import store from '../store'
const BASE_URL = store.state.BASE_URL
export default function uploadReq(url, filePath) {
  url = url.indexOf('http') != -1 ? url : BASE_URL + url //如果url是完整链接,就取消BASE_URL
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name: 'file',
      method: 'POST',
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
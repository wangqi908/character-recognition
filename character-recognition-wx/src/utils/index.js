function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatTimestamp(date) {
  var date = new Date(date); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

// 把url后?equipmentNo=xkz006&id=1&name=zhangsan参数转成对象形式
export const locationSearchToObj = (url = "") => {
  if (!url) return
  let res = url.split('?')[1]
  if (!res) {
    wx.showToast({
      title: '无法识别,请手动输入',
      icon: 'none',
      duration: 3000
    });
    return false;
  }
  let queryArr = res.split('&')
  let queryObj = {}
  queryArr.forEach(ele => {
    if (ele) {
      let arr = ele.split('=')
      queryObj[arr[0]] = arr[1]
    }
  })
  return queryObj
}

// 对象转成 url拼接
export const setUrLParams = (obj = {}) => {
  let params = []
  for (const key in obj) {
    const element = obj[key];
    let type = typeof element
    if (type === 'number' || type === 'string') {
      params.push([key, encodeURIComponent(element)].join('='))
    }
  }
  return params.join('&')
}

//  封装toast
export const showToast = (title = "", icon = "none", duration = 2000) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

// 保留对象想要的属性
export const omit = (obj = {}, Keys = []) => {
  let objArr = Object.keys(obj)
  let subset = objArr.filter(i => Keys.indexOf(i) < 0);
  subset.forEach(item => {
    delete obj[item];
  })
  return obj
};

export default {
  formatNumber,
  formatTime,
  locationSearchToObj,
  setUrLParams,
  showToast,
  formatTimestamp,
  omit
}

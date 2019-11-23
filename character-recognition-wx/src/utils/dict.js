import store from '../store'
let propList = store.state.propList
//  报修内容
export const dictionaryArrFunc = _ => {
  let arr = propList.filter(
    ele => ele.propKey === "报修内容"
  );
  return arr
}

export const subStatusArr = [
  /* 
  10：待处理
  30：已受理
  31：交互中
  32：待支付
  33：已支付 
  34：返厂 
  51：已关闭
  52：退款关闭
  53：不受理关闭
  59：已完成
  54：返厂
  */
  {
    subStatus: 10,
    name: '待处理'
  },
  {
    subStatus: 30,
    name: '已受理'
  },
  {
    subStatus: 31,
    name: '交互中'
  },
  {
    subStatus: 32,
    name: '待支付'
  },
  {
    subStatus: 33,
    name: '已支付 '
  },
  {
    subStatus: 34,
    name: '返厂 '
  },
  {
    subStatus: 51,
    name: '已关闭'
  },
  {
    subStatus: 52,
    name: '退款关闭'
  },
  {
    subStatus: 53,
    name: '不受理关闭'
  },
  {
    subStatus: 59,
    name: '已完成'
  },
  {
    subStatus: 54,
    name: '返厂'
  },

]

export const repairStatusFilter = val => {
  let res = ''
  let active = subStatusArr.find(ele=>ele.subStatus == val)
  if (active) res = active.name
  return res
}

export default {
  dictionaryArrFunc,
  subStatusArr,
  repairStatusFilter
}
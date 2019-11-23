const express = require('express');
const router = express.Router();
const config = require('../config/index.js');
const AccessSchema = require('../db/models').AccessSchema
const accessReq = require('../utils/access.js').accessReq //获取access方法

router.get('/', (req, res) => {
  res.send({ code: 200, data: { msg: 'ok' } })
});

// 请求百度access
router.get('/access', (req, res) => {
  const { grant_type, client_id, client_secret} = config
  if (!grant_type || !client_id || !client_secret) {
    res.send({ code: 0, data: { msg: '缺少参数' } })
    return
  }

  AccessSchema.find((err, accessList) => {
    if (accessList.length === 0) {
      // console.log('数据库没有access');
      // 数据库没有access,发送请求并写入
      accessReq.then(data => {
        new AccessSchema(data).save((err, access) => {
          res.send({ code: 200, data: access })
        })
      })
    } else {
      // console.log('数据库有access');
      // 数据库有access,对比时间
      let accessObj = accessList[0]
      let accessTime = accessObj.createTime * 1 + accessObj.expires_in * 1000 //expires_in为秒,需要转成毫秒
      let nowTime = +new Date()
      let isExpired = nowTime > accessTime //access过期
      if (isExpired === true) {
        // 如果过期,从新请求并更新
        // console.log('如果过期,从新请求并更新');
        accessReq.then(data => {
          let { expires_in, access_token, refresh_token, session_key } = data
          let newData = { expires_in, access_token, refresh_token, session_key, updateTime: +new Date() }
          AccessSchema.findByIdAndUpdate(accessObj._id, newData, function (err, ret) {
            if (err) {
              // console.log('更新失败')
              res.send({ code: 0, msg: '更新失败' })
            } else {
              res.send({ code: 200, data: newData })
            }
          })
        })

      } else {
        // 没过期,直接返回
        // console.log('没过期,直接返回');
        res.send({ code: 200, data: accessObj })
      }
    }
  })
});

module.exports = router;

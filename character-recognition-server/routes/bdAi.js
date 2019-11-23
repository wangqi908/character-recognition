const express = require('express');
const router = express.Router();
const getAccess = require('../utils/access.js').getAccess //获取access方法

router.get('/', (req, res) => {
  res.send({ code: 200, data: { msg: 'ok' } })
});

// 请求百度access
router.get('/access', async (req, res) => {
  const accessRes = await getAccess()
  res.send({ code: 200, accessRes })
});

module.exports = router;

var config = require('../config/index.js');
var https = require('https');
var qs = require('querystring');
const accessReq = () => {
  const { grant_type, client_id, client_secret, hostname, path, agent } = config
  const param = qs.stringify({
    grant_type,
    client_id,
    client_secret
  });

  const option = {
    hostname,
    path: path + param,
    agent
  }

  return new Promise((resolve, reject) => {
    https.get(option, myRes => {
      let str = "";
      myRes.on("data", function (chunk) {
        str += chunk;//监听数据响应，拼接数据片段
      })
      myRes.on("end", function () {
        let { expires_in, access_token, refresh_token, session_key } = JSON.parse(str.toString())
        resolve({ expires_in, access_token, refresh_token, session_key })
      })
    });
  })
}


exports.accessReq = accessReq;
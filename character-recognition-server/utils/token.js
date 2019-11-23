// 引入token
const jwt = require('jsonwebtoken');

const secretOrPublicKey = 'abc'; //公钥 可以自己生成
const expiresIn = 60 * 60;

const createToken = ({ _id, username }) => {
  const token = jwt.sign({ _id, username }, secretOrPublicKey, { expiresIn });
  return token;
}

const verifyToken = (_token) => {
  _token=_token.slice(7) //token前因为加了"Bearer ",所有要截取
  let verify = jwt.verify(_token, secretOrPublicKey, (error, decoded) => {
    if (error) {
      return "Token Invalid";
    }
    return decoded;
  });
  return verify;
};

exports.createToken = createToken;
exports.verifyToken = verifyToken;
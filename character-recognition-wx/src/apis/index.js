import req from "./axios.js"

// 登录
export const loginReq = params => req('/login', params, 'post') //登录
export const ocrReq = params => req('/bdAi/ocr', params, 'post') //文字识别

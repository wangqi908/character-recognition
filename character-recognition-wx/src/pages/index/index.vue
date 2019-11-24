<template>
  <div>
    <button @click="chooseImg">上传图片</button>
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { loginReq, ocrReq } from "@/apis";
export default {
  data() {
    return {
      username: "admin",
      password: "admin"
    };
  },

  methods: {
    chooseImg() {
      wx.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        success: res => {
          let base64img = wx
            .getFileSystemManager()
            .readFileSync(res.tempFilePaths[0], "base64");
          // 获取文字识别
          this.getOcr(base64img);
        }
      });
    },
    async login() {
      let { username, password } = this;
      let sendData = { username, password };
      const res = await loginReq(sendData);
      console.log(res);
    },
    // 获取文字识别
    async getOcr(image) {
      let sendData = { image };
      const res = await ocrReq(sendData);
      if (res.data.code === 200) {
        let resData = res.data.ocrRes;
        console.log(resData);
      }
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
</style>

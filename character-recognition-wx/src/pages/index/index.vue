<template>
  <div>
    <button @click="chooseImg">上传图片</button>
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { loginReq } from "@/apis";
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
          let base64 = wx
            .getFileSystemManager()
            .readFileSync(res.tempFilePaths[0], "base64");

          console.log(base64);
        }
      });
    },
    async login() {
      let { username, password } = this;
      let sendData = { username, password };
      const res = await loginReq(sendData);
      console.log(res);
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
</style>

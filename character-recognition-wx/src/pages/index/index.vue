<template>
  <button @click="chooseImg">上传图片</button>
</template>

<script>
export default {
  data() {
    return {};
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
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
</style>

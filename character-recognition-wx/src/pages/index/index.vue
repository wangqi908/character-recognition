<template>
  <div>
    <button @click="chooseImg">上传图片</button>
  </div>
</template>

<script>
import { ocrReq } from "@/apis";
import { showToast } from "@/utils";
export default {
  data() {
    return {};
  },

  methods: {
    chooseImg() {
      wx.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        sizeType: ["original", "compressed"],
        success: res => {
          let tempFlie = res.tempFilePaths[0];
          let size = res.tempFiles[0].size;
          let maxSize = 4 * 1000 * 1000;
          console.log(size);
          if (size > maxSize) {
            showToast("图片大小不可超过4m");
            return;
          }
          let base64img = wx
            .getFileSystemManager()
            .readFileSync(tempFlie, "base64");
          // 获取文字识别
          this.getOcr(base64img);
        }
      });
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
  }
};
</script>

<style scoped>
</style>

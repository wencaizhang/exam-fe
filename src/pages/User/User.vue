<template>
<!-- <div> -->
<!-- <div  v-if="false"  style="height: 300px;">
		<label class="btn" for="uploads">upload</label>
		<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
    <form></form>
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :canMoveBox="option.canMoveBox"
      ></vueCropper>

      		<button @click="finish('base64')" class="btn">预览(base64)</button>
		<button @click="finish('blob')" class="btn">预览(blob)</button>
    </div> -->

    <div :class="$style.container">
      <header :class="$style.header">
        <div :class="$style.photo" @click="uploadPhoto">
          <img :class="$style.avatar" v-bind:src="avatar" alt="头像">
        </div>
        <div :class="$style.nick">
          <p>{{ name }}</p>
        </div>
      </header>
      <group>
        <!-- <cell-box is-link :link="{ path: '/changeuserinfo' }">
          修改个人信息
        </cell-box> -->
        <cell-box is-link :link="{ path: '/reset' }">
          密码重置
        </cell-box>
      </group>
      <group>      
        <cell title="进入考试" is-link :link="{ path: '/waitforexam' }">
          <div class="badge-value">
            <span class="vertical-middle"></span>
            <!-- <badge></badge> -->
          </div>
        </cell>
        <cell title="模拟考试" is-link :link="{ path: '/waitforexam' }">
          <div class="badge-value">
            <span class="vertical-middle"></span>
            <!-- <badge></badge> -->
          </div>
        </cell>
      </group>
      <group>
        <cell-box is-link :link="{ path: '/history' }">
          我的成绩
        </cell-box>
      </group>
      <div :class="$style.btns">
        <x-button type="warn" @click.native="logout">安全退出</x-button>
      </div>
    </div>
    
<!-- </div> -->
</template>

<script>
import axios from "axios";
import qs from "qs";
import util from "../../util/util.js";
import api from "../../util/api.js";
import { XButton, Group, CellBox, Cell, Badge } from "vux";
import vueCropper from "vue-cropper";

export default {
  data() {
    return {
      avatar: "http://www.qqzhi.com/uploadpic/2015-01-07/014622445.jpg",
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: false,

        autoCrop: true,
        autoCropWidth: 100,
        autoCropHeight: 100,
        canMoveBox: false
      },
      downImg: "#"
    };
  },
  components: {
    XButton,
    Group,
    CellBox,
    Cell,
    Badge,
    vueCropper
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(resp => {
        if (resp.data.code == 0) {
          this.$store.dispatch("resetAllState");
          this.$router.push({ path: "/login" });
        }
      });
    },
    uploadPhoto() {},
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(base64Data.split(",")[1]);
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    finish(type) {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data);
        var formData = new FormData();

        formData.append("username", data);

        console.log(formData);

        var request = new XMLHttpRequest();
        request.open("POST", "/sage/student/student/uploadHeadPortrait");
        request.send(formData);

        // fd.append("the_file", data);
        // console.log("fd", fd);
        return;

        const imageBase64 = data;

        var blob = this.dataURItoBlob(imageBase64); // 上一步中的函数
        var canvas = document.createElement("canvas");
        var dataURL = canvas.toDataURL("image/jpeg", 0.5);

        axios
          .post("/sage/student/student/uploadHeadPortrait", qs.stringify(fd), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(result => {
            // do something
          });
        console.log("fd", fd);
      });
    }
  },
  created() {
    if (!this.$store.state.user.userInfo.saved) {
      this.$store.dispatch("getUserInfo");
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
  background-color: #f2f2f2;
  padding-top: 20px;
}
.header {
  height: 80px;
  background-color: #fff;
}
.photo,
.nick {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
}
.nick {
  padding-top: 20px;
}
.photo {
  width: 100px;
  height: 80px;
  padding: 10px 20px;
}
.avatar {
  width: 60px;
  height: 60px;
}

.btns {
  margin: 20px auto;
  width: 80%;
}
</style>
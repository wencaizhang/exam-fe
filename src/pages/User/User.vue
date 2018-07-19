<template>
    <div class="user-center">
        <header>
            <div class="user-photo">
                <img class="avatar" v-bind:src="userInfo.avatar" alt="头像">
            </div>
            <div class="user-nick">
                <span>{{ userInfo.userName }}</span>
            </div>
        </header>
        <group>
            <cell-box is-link :link="{ path: '/changeuserinfo' }">
                修改个人信息
            </cell-box>
            <cell-box is-link :link="{ path: '/reset' }">
                密码重置
            </cell-box>
            <cell-box is-link :link="{ path: '/waitforexam' }">
                进入考试
            </cell-box>
            <cell-box>
                <div class="logout-box" @click="logout"> 退出 </div>
            </cell-box>
        </group>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import util from "../../util/util.js";
import { Group, CellBox } from "vux";

export default {
  data() {
    return {
      userInfo: {
        avatar: ""
      }
    };
  },
  components: {
    Group,
    CellBox
  },
  methods: {
    logout() {
      const vm = this;
      let url = "/logout";
      const options = {
        url,
        method: "GET",
        headers: { "content-type": "application/x-www-form-urlencoded" }
      };
      vm
        .$http(options)
        .then(function(resp) {
          vm.loading = false;

          if (resp.data.code == 0) {
            util.setUserinfo(null);
          } else {
            // vm.tips = "用户名或密码错误";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    const vm = this;
    let url = "/student/student/getStudentByUserId";
    const options = {
      url,
      method: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" }
    };
    vm
      .$http(options)
      .then(function(resp) {
        vm.loading = false;

        if (resp.data.code == 0) {
          vm.loginOK = true;
          vm.userInfo = Object.assign({}, vm.userInfo, resp.data.student);
        } else {
          // vm.tips = "用户名或密码错误";
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style lang="">
header {
  height: 70px;
  line-height: 70px;
  padding: 20px;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 16px;
}
.user-photo,
.user-nick {
  display: inline-block;
  vertical-align: top;
}
.user-photo {
  width: 70px;
  height: 70px;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.avatar {
  width: 80px;
  height: 80px;
}

.logout-box {
  width: 100%;
  height: 100%;
}
</style>
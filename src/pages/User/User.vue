<template>
    <div class="user-center">
        <header>
            <div class="user-photo">
                <img class="avatar" v-bind:src="userInfo.avatar" alt="头像">
            </div>
            <div class="user-nick">
                <span>{{ userInfo.user }}</span>
            </div>
        </header>
        <group>
            <cell-box is-link :link="{ path: '/changeuserinfo' }">
                修改个人信息
            </cell-box>
            <cell-box is-link :link="{ path: '/reset' }">
                密码重置
            </cell-box>
            <cell-box is-link link="/exam">
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
import util from "../../util/util.js"
import { Group, CellBox  } from 'vux';

export default {
  data() {
    return {
        userInfo: null
    };
  },
  components: {
    Group,
    CellBox
  },
  methods: {
    logout() {
        console.log('退出')
    }
  },
  created () {
    this.userInfo = util.getUserinfo();
    console.log(this.userInfo)
  }
};
</script>

<style lang="">
header {
    height: 70px;
    line-height: 70px;
    padding: 20px;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 16px;
}
.user-photo, .user-nick {
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
<template>
    <div class="user-center">
        <header>
            <div class="user-photo">
                <img class="avatar" src="https://avatars0.githubusercontent.com/u/34718241?s=40&v=4" alt="头像">
            </div>
            <div class="user-nick">
                <span>张文才</span>
            </div>
        </header>
        <group-title>常用功能：</group-title>
        <grid>
            <grid-item label="修改个人信息">
                <img slot="icon" src="https://avatars0.githubusercontent.com/u/34718241?s=40&v=4" alt="头像">
            </grid-item>
            <grid-item label="密码重置">
                <img slot="icon" src="https://avatars0.githubusercontent.com/u/34718241?s=40&v=4" alt="头像">
            </grid-item>
        </grid>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Grid, GridItem, GroupTitle } from 'vux';

export default {
  data() {
    return {
    };
  },
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
  methods: {
  }
};
</script>

<style lang="">
.user-center {
}
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
</style>
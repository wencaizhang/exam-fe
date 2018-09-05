<template>
  <div class="rank-container">
    <h1 style="font-weight: normal; text-align: center; margin: 20px 0;">练兵</h1>
    <grid :cols="cols">
      <grid-item class="grid-item" @click.native="gridItemClickHandler(item)" :label="item.majorName" v-for="(item,index) in list" :key="index">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import axios from "axios";

import { Grid, GridItem } from "vux";
export default {
  data() {
    return {
      cols: 3,
      list: []
    };
  },
  components: {
    Grid,
    GridItem
  },
  methods: {
    gridItemClickHandler (item) {
      console.log(item);
      let url = "/sage/section/selectByMajorId";
      let data = { majorId: item.id };
      axios.post(url, data).then(resp => {
        console.log(resp.data.section);
        const chapterList = resp.data.section
      });
    }
  },
  created() {
    let url = "/sage/major/getList";
    let data = { pageSize: "10", page: "1" };
    axios.post(url, data).then(resp => {
      console.log(resp.data.majorList);
      this.list = resp.data.majorList.list;
    });
  },
  computed: {}
};
</script>
<style>
.weui-grid {
  line-height: 16px;
  padding: 30px 10px;
}
.weui-grid__label {
  white-space: normal;
}

.weui-grid:nth-child(1),
.weui-grid:nth-child(4),
.weui-grid:nth-child(5),
.weui-grid:nth-child(8),
.weui-grid:nth-child(9) {
  background-color: aquamarine;
} 

.weui-grid:nth-child(10),
.weui-grid:nth-child(11),
.weui-grid:nth-child(2),
.weui-grid:nth-child(3),
.weui-grid:nth-child(6),
.weui-grid:nth-child(7) {
  background-color: skyblue;
} 
</style>

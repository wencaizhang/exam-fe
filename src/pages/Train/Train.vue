<template>
  <div class="rank-container">
    <h1 style="font-weight: normal; text-align: center; margin: 20px 0;">练兵</h1>
    <grid v-if="list.length" :cols="cols">
      <grid-item class="grid-item" 
        @click.native="gridItemClickHandler(item)" 
        v-for="(item,index) in list" 
        :key="index"
        :label="item.majorName" 
      >
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
      cols: 2,
      list: [],
    };
  },
  components: {
    Grid,
    GridItem
  },
  computed: {
  },
  methods: {
    gridItemClickHandler (item) {
      console.log(item);
      let url = "/sage/section/selectByMajorId";
      let data = { majorId: item.id };
      axios.post(url, data).then(resp => {

        const list = resp.data.section
        const data = {}
        data[item.id] = list

        this.$store.commit('setChapterList', data)

        if (list.length) {
          this.$router.push({ name: 'section', params: { majorid: item.id }})
        } else {
          this.$vux.toast.show({
            type: 'text',
            width: '10em',
            text: '本专业暂无章节可供练习'
          })
        }
      });
    }
  },
  created() {
    if (!this.$store.state.section.majorList.length) {
      let url = "/sage/major/getList";
      let data = { pageSize: "10", page: "1" };
      axios.post(url, data).then(resp => {
        const list = resp.data.majorList.list;
        this.list = list;
        this.$store.commit('setMajorList', list)
      });
    } else {
      this.list = this.$store.state.section.majorList
    }
  },
  computed: {}
};
</script>
<style>
.weui-grid {
  line-height: 16px;
  padding: 30px 10px;
  height: 100px;
}
.grid-item .weui-grid__label {
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

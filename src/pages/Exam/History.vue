<template>
    <div>
        <x-header>
            考试成绩
        </x-header>
        <scroller style="margin-top: 44px"
            ref="my_scroller"
            :on-refresh="refresh"
            :on-infinite="infinite"
        >
            <group class="row" v-for="(item, index) in list" v-bind:key="index" >
                <cell :title="item.paperName"></cell>
                <cell-form-preview :list="item.list"></cell-form-preview>
            </group>
        </scroller>
    </div>
</template>
<script>
import axios from "axios";
import { XHeader, CellFormPreview, Group, Cell, dateFormat } from "vux";
export default {
  data() {
    return {
      list: [],
      page: 0,
      pageSize: 10
    };
  },
  components: {
    XHeader,
    CellFormPreview,
    Group,
    Cell
  },
  created() {
    this.page = 0;
  },
  methods: {
    fetch() {
      let url = "/sage/exam/score/selectScoreList";
      const data = { page: this.page, pageSize: this.pageSize };
      return axios.post(url, data);
    },
    add(m){return m<10?'0'+m:m },
    //时间戳转化成时间格式
    timeFormat(timestamp){
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year+'-'+this.add(month)+'-'+this.add(date)+' '+this.add(hours)+':'+this.add(minutes)+':'+this.add(seconds);
    },
    transformData(list) {
      list.forEach(item => {
        item.list = [
          {
            label: "考试时间",
            value: this.timeFormat(Date.parse(new Date(item.examStart))),
            // value: dateFormat(new Date(item.examStart), "YYYY-MM-DD HH:mm:ss")
          },
          {
            label: "总成绩",
            value: item.score
          },
          {
            label: "单选题得分",
            value: item.singleScore
          },
          {
            label: "多选题得分",
            value: item.doubleScore
          },
          {
            label: "判断题得分",
            value: item.judgmentScore
          }
        ];
      });
      return list;
    },
    refresh() {
      this.page = 1;
      this.fetch().then(resp => {
        if (resp.data.code == 0) {
          this.list = this.transformData(resp.data.scoreList.list);
          let length = resp.data.scoreList.list.length;
          this.$refs.my_scroller.finishPullToRefresh();
        }
      });
    },
    infinite() {
      this.page++;
      this.fetch().then(resp => {
        if (resp.data.code == 0) {

          this.list = this.list.concat(this.transformData(resp.data.scoreList.list));
          let length = resp.data.scoreList.list.length;
          this.$refs.my_scroller.finishInfinite(!length);
        }
      });
    }
  }
};
</script>


<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 44px;
  width: 100%;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
  color: #666;
}
.header > .title {
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  margin: 0 auto;
}
.row {
  background: #f2f2f2;
  overflow: hidden;
}
</style>
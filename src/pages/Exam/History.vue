<template>
    <div>
        <x-header>
            考试成绩
        </x-header>
        <tab>
          <tab-item selected @on-item-click="clickHandler">正式考试</tab-item>
          <tab-item badge-background="#38C972" badge-color="#fff" @on-item-click="clickHandler">模拟考试</tab-item>
        </tab>
        <scroller style="margin-top: 90px"
          ref="my_scroller"
          :on-refresh="refresh"
          :on-infinite="infinite"
        >
          <group class="row" v-for="(item, index) in currList" v-bind:key="index" >
            <cell :title="item.paperName"></cell>
            <cell-form-preview :list="item.list"></cell-form-preview>
          </group>
        </scroller>
    </div>
</template>
<script>
import axios from "axios";
import { XHeader, CellFormPreview, Group, Cell, dateFormat,Tab, TabItem } from "vux";
export default {
  data() {
    return {
      list0: [],
      list1: [],
      page0: 0,
      page1: 0,
      pageSize: 10,
      index: 0,
    };
  },
  components: {
    XHeader,
    CellFormPreview,
    Group,
    Cell,
    Tab,
    TabItem
  },
  created() {
    this.page0 = 0;
    this.page1 = 0;
  },
  computed: {
    currList () {
      return this.index === 0 ? this.list0 : this.list1;
    }
  },
  methods: {
    fetch() {
      let url0 = '/sage/exam/score/selectScoreList';
      let url1 = '/sage/exam/simulationscore/selectScoreList';
      let url = this.index === 0 ? url0 : url1;
      const data = { page: this['page' + this.index], pageSize: this.pageSize };
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
      this['page' + this.index] = 1;
      this.fetch().then(resp => {
        if (resp.data.code == 0) {
          this['list' + this.index] = this.transformData(resp.data.scoreList.list);
          let length = resp.data.scoreList.list.length;
          this.$refs.my_scroller.finishPullToRefresh();
        }
      });
    },
    infinite() {
      this['page' + this.index]++;
      this.fetch().then(resp => {
        if (resp.data.code == 0) {

          this['list' + this.index] = this['list' + this.index].concat(this.transformData(resp.data.scoreList.list));
          let length = resp.data.scoreList.list.length;
          this.$refs.my_scroller.finishInfinite(!length);
        }
      });
    },
    clickHandler(index) {
      this.index = index;
      if (!this['list' + this.index].length) {
        this.refresh();
      }
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
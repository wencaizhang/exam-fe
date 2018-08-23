<template>
  <div>
    <x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="backHandler">准备考试</x-header>
    <div  v-if="examination" :class="$style['home-container']">
      <div :class="$style['fast-entry']">
        <h3 :class="[$style.h3]">注意事项</h3>
        <div v-if="examination">
          {{ examination.examinationAttention }}
        </div>
      </div>
      <div :class="$style.message">
        <h3 :class="[$style.h3]">活动信息</h3>
        <div :class="$style.examination">
          <!-- <p>姓名：{{ examination }}</p> -->
          <p><span :class="$style.text">考试单位：</span>{{ examination.deptName }}</p>
          <p><span :class="$style.text">剩余次数：</span>{{ countExamNumber }}</p>
          <p><span :class="$style.text">活动名称：</span>{{ examination.examinationName }}</p>
          <p><span :class="$style.text">考试时长：</span>{{ examination.examinationTimeLong }} 分钟</p>
          <p><span :class="$style.text">开始时间：</span></p>
          <p>{{ examination.examinationStartTime }}</p>
          <p><span :class="$style.text">截止时间：</span></p>
          <p>{{ examination.examinationEndTime }}</p>
        </div>
      </div>
      <XButton type="primary" text="开始考试" @click.native="startHandler"></XButton>
    </div>
    
    <p v-else style="text-align:center; margin-top: 30px;">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span><inline-loading></inline-loading>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { XButton, XHeader, InlineLoading } from "vux";
export default {
  data() {
    return {
      countExamNumber: 0,
      examination: null
    };
  },
  components: {
    InlineLoading,
    XButton,
    XHeader,
  },
  methods: {
    startHandler () {
      this.getIds();
    },
    backHandler () {
      this.$router.push( { name: 'home' })
    },
    dateToMs (date) {
      let result = new Date(date).getTime();
      return result;
    },
    getExamInfo () {
      // 用户扫描二维码，打开网页
      // url 中有本次考试的字段 data
      // 根据这个字段，获取本次考试相关数据
      // 这些数据用于本页面展示考试信息、获取考试题目和提交试卷

      let url = '/sage/exam/examination/info';
      const data = { data: this.$store.state.exam.data };
      axios.post(url, data)
        .then(resp => {
          if (resp.data.code == 0) {
            this.countExamNumber = resp.data.countExamNumber;
            this.examination = resp.data.examination;

            this.$store.commit('setExamInfo', resp.data);

            const data = {
              paperDesignId: resp.data.examination.paperId,
              examinationNumber: resp.data.countExamNumber,
              id: resp.data.examination.id,
            };

            this.$store.commit('setPaper', data);
          } else {
            this.$router.push({name: 'home'})
            return;
          }
        });
    },
    getIds () {
      // 首先获取所有考试题目的 id
      let url = '/sage/exam/paperProduce/produce';
      const data = this.$store.state.exam.paper;
      axios.post(url, data)
        .then(resp => {
          if (resp.data.code == 0) {
            const data = JSON.parse(resp.data.paperDuce.details);

            const idList = []
            data.forEach(item => {
              const list = JSON.parse(item.ids);
              list.forEach((id) => {
                idList.push( { id, score: item.score } );
              })
            });

            this.$store.commit('setIdList', idList);

            this.$router.push( { name: 'exam' } );
          } 
        });
    },
  },
  created() {
    this.getExamInfo();
  }
};
</script>
<style module>
.h3 {
  text-align: center;
  margin-bottom: 10px;
}
.home-container {
  padding: 40px;
}
.message,
.fast-entry {
  border: 1px solid #ccc;
  padding: 10px;
}
.message {
  margin-bottom: 20px;
}
.fast-entry {
  margin-bottom: 20px;
}
.red {
  color: red;
}
.examination p {
  margin: 6px 0;
}
.text {
  color: red;
}
</style>

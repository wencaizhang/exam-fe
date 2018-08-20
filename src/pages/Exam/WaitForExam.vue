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
    getInfo () {
      const vm = this;
      let url = '/sage/exam/examination/info';
      let localData = vm.$storage.getItem('data');
      let stateData = vm.$store.state.exam.data;

      const data = { 
        data: stateData || localData
      };
      const options = {
        url,
        method: 'POST',
        data,
      };
      
      axios((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            vm.countExamNumber = resp.data.countExamNumber;
            vm.examination = resp.data.examination;

            vm.$store.commit('saveExamInfo', resp.data);

            const data = {
              paperDesignId: resp.data.examination.paperId,
              examinationNumber: resp.data.countExamNumber,
              id: resp.data.examination.id,
            };

            vm.$storage.setItem('paper', data);
          } else {
            this.$router.push({name: 'home'})
            return;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getIds () {
      const vm = this;
      let url = '/sage/exam/paperProduce/produce';

      const data = vm.$storage.getItem('paper', data);

      const options = {
        url,
        method: 'POST',
        data,
      };
      
      axios((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            const data = JSON.parse(resp.data.paperDuce.details);

            const idList = []
            data.forEach(item => {
              const list = JSON.parse(item.ids);
              list.forEach((id) => {
                idList.push( { id, score: item.score } );
              })
            });

            vm.$store.commit('setIdList', idList);

            vm.$router.push( { name: 'exam', params: { index: 0 } } );
          } else {
            alert(resp.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getInfo();
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

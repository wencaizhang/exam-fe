<template>
  <div>
    <x-header  :left-options="{preventGoBack: true,backText: ''}" @on-click-back="backHandler">准备考试</x-header>
    <div :class="$style['home-container']">
      <div :class="$style['fast-entry']">
        <h3 :class="[$style.h3]">注意事项</h3>
        <div v-if="examination">
          {{ examination.examinationAttention }}
        </div>
      </div>
      <div :class="$style.message">
        <h3 :class="[$style.h3]">活动信息</h3>
        <div v-if="examination" :class="$style.examination">
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
      <XButton type="primary" :disabled="loading" text="开始考试" @click.native="startHandler"></XButton>
    </div>
    <toast v-model="showToast" type="warn">{{ errMsg }}</toast>
    <div v-transfer-dom>
      <loading :show="loading" text="loading..."></loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import util from "../../util/util.js";

import { XButton, XHeader, Toast, Loading, TransferDomDirective as TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      loading: true,
      showToast: false,
      errMsg: '',
      isRed: true,
      countExamNumber: 0,
      examination: null
    };
  },
  components: {
    Toast,
    XButton,
    XHeader,
    Loading
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

      let temp = '7D30FE5031B7A85DCD222D69D0DD29938625350D7D2A79247B160A34623B700E1CBE6B388EA84AB706C401034FDB5E3C31B0BCA5BDA1F94E8999FC531992C40EED83D584FBD4A50791CEFE8B6380D31BBACB6C8354FC9715';

      let stateData = vm.$store.state.exam.data;

      const data = { 
        data: stateData || temp
      };
      const options = {
        url,
        method: 'POST',
        data,
      };
      
      axios((options))
        .then(function(resp) {
          if (resp.data.code == 0) {
            vm.loading = false;
            vm.countExamNumber = resp.data.countExamNumber;
            vm.examination = resp.data.examination;

            vm.$store.commit('saveExamInfo', resp.data);

            const data = {
              paperDesignId: resp.data.examination.paperId,
              examinationNumber: resp.data.countExamNumber,
              id: resp.data.examination.id,
            };

            util.setPaperData(data)
          } else {
            vm.showToast = true;
            vm.errMsg = resp.data.msg;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getIds () {
      const vm = this;
      vm.loading = true;
      const data = util.getPaperData();
      let url = '/sage/exam/paperProduce/produce';

      const options = {
        url,
        method: 'POST',
        data,
      };
      
      axios((options))
        .then(function(resp) {
          vm.loading = false;
          if (resp.data.code == 0) {
            const data = JSON.parse(resp.data.paperDuce.details);
            util.setQuestionIds(data);

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

<template>
  <div :class="$style.container">
    
    <p :class="$style.msg">得分：{{ score }}</p>
    <p :class="$style.msg">用时：{{ time }}</p>

    <div :class="$style.btns">
      <XButton :class="$style.btn" type="primary" text="查看答案及解析" @click.native="analysis" ></XButton>
      <XButton :class="$style.btn" type="primary" text="重新开始考试" link="/waitforexam"></XButton>
      <XButton :class="$style.btn" plain text="回到首页" link="/home"></XButton>
    </div>
  </div>
</template>

<script>
import { XButton, dateFormat } from "vux";
import axios from 'axios'
export default {
  components: {
    dateFormat,
    XButton
  },
  data () {
    return {
    }
  },
  computed: {
    score () {
      return this.$store.state.exam.totalScore;
    },
    time () {
      return this.$store.getters.getDuringTime;
    }
  },
  methods: {
    analysis () {
      this.$store.commit('toggleAnalysis');
      this.$router.push( { name: 'exam' });
    }
  },
  created () {
    const examInfo = this.$store.state.exam.examInfo;

    const data = {
      examinationId:  examInfo.examination.id,
      paperId:        examInfo.examination.paperId,
      paperName:      examInfo.examination.examinationName,
      paperProduceId: examInfo.examination.examinationNumber,

      score:         this.$store.state.exam.totalScore,
      singleScore:   this.$store.getters.getScoreByType('001'),
      doubleScore:   this.$store.getters.getScoreByType('002'),
      judgmentScore: this.$store.getters.getScoreByType('003'),
      trueAnswer:    this.$store.getters.getTrueAnswer,
      myAnswer:      this.$store.getters.getMyAnswer,

      examStart:     dateFormat(this.$store.state.exam.startTime, 'YYYY-MM-DD HH:mm:ss'),
      examEnd:       dateFormat(this.$store.state.exam.endTime, 'YYYY-MM-DD HH:mm:ss')
    }

    this.$store.dispatch('insertScore', { paramData: data })
      .then(resp => {
        if (resp.data.code == 0) {
          this.$vux.toast.show({
            text: '成功交卷',
          });
        }
      });
  }
}
</script>

<style module>
.container {
  padding-top: 30px;
}
.msg {
  margin-top: 10px;
  font-size: 26px;
  text-indent: 50px;
}

.btns {
  margin-top: 50px;
}
.btn {
  width: 80%!important;
}
</style>

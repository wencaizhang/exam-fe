<template>
  <div :class="$style.container">
    <img v-if="scoreLine > score" :class="$style.image" src="../../assets/images/score_no.jpg" alt="score">
    <img v-else :class="$style.image" src="../../assets/images/score_yes.jpg" alt="score">

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
    scoreLine () {
      return this.$store.state.exam.examInfo.examination.examinationPassScore || 0;
    },
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
      examEnd:       dateFormat(this.$store.state.exam.endTime, 'YYYY-MM-DD HH:mm:ss'),
      timeLong:      this.$store.state.exam.duringSeconds,
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
.msg {
  margin-top: 10px;
  font-size: 16px;
  text-indent: 50px;
}

.btns {
  margin-top: 30px;
}
.btn {
  width: 80%!important;
}

.image {
  width: 80%;
  margin: 0 10%;
}
</style>

<template>
  <div :class="$style.container">
    
    <p :class="$style.msg">得分：{{ score }}</p>
    <p :class="$style.msg">用时：{{ time }}</p>

    <div :class="$style.btns">
      <XButton :class="$style.btn" type="primary" text="查看答案及解析" link="/exam/0"></XButton>
      <XButton :class="$style.btn" type="primary" text="重新开始考试" link="/waitforexam"></XButton>
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
  methods: {},
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

    data.myAnswer = JSON.stringify(data.myAnswer);
    data.trueAnswer = JSON.stringify(data.trueAnswer);

    this.$store.dispatch('insertScore', data)
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

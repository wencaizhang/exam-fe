<template>
  <div class="container">
    <x-header >选择题型</x-header>
    <group v-if="list.length">
      <cell-box 
        v-for="item in list" 
        :key="item.typeId"
        @click.native="clickHandler(item)"
      >
        {{ item.typeName }} : 共 {{ item.totalCount }} 道
      </cell-box>
    </group>
    <div v-else>暂无数据</div>
  </div>
</template>

<script>
import axios from "axios";
import { Group, CellBox, Cell, XHeader } from "vux";

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    Group,
    CellBox,
    Cell,
    XHeader
  },
  computed: {},
  methods: {
    clickHandler(item) {
      const params = this.$route.params;
      let url = "/sage/exam/equestionmanagement/questionListByMST";
      const data = {
        majorId: params.majorid + '',
        sectionId: params.sectionid + '',
        typeId: item.typeId + '',
        pageSize: '50',
        pageNum: "0"
      };
      axios.post(url, data).then(resp => {
        const list = resp.data.questionList.list;
        this.$store.commit('setQuestionList', list)
        this.$store.commit("changeQuestionIndex", 0);

        this.startTrain();
      });
    },
    startTrain () {
      const params = this.$route.params;
      let majorId = params.majorid + ''
      let sectionId = params.sectionid + ''

      this.$store.commit('setTrainInfo', {
        majorId: params.majorid + '',
        sectionId: params.sectionid + '',
      })
      this.$router.push( { name: 'trainquestion' } )
    }
  },
  created() {
    const params = this.$route.params;

    const sectionList = this.$store.state.section.chapterList[params.majorid];
    const filterSectionList = sectionList.filter(
      item => item.id == params.sectionid
    );
    if (filterSectionList.length) {
      this.list = filterSectionList[0].questionList;
    }
  }
};
</script>

<style >
</style>
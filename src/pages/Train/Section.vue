<template>
  <div class="container">
    <x-header > 选择章节练习 </x-header>
    <group>
      <cell-box 
        v-for="item in list" 
        :key="item.id"
        @click.native="clickHandler(item)"
      >
        {{ item.sectionName }}
      </cell-box>
    </group>
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
  computed: {

  },
  methods: {
    clickHandler(item) {
      let url = "/sage/exam/equestionmanagement/selectQuestionList";
      const data = { majorId: this.$route.params.majorid, sectionId: item.id };
      axios.post(url, data).then(resp => {
        const list = {
          questionList: resp.data.questionList,
          majorid: this.$route.params.majorid,
          sectionId: item.id,
        }
        this.$store.commit('setQuestionTypes', list)
        this.$router.push({ name: 'questiontypes', params: { majorid: list.majorid, sectionid: list.sectionId }})
      });
    },
  },
  created() {
    let id = this.$route.params.majorid;
    const list = this.$store.state.section.chapterList[id];
    this.list = list;
  }
};
</script>

<style >
</style>
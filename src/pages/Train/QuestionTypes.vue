<template>
  <div class="container">
    <x-header >选择题型</x-header>
    <group>
      <cell-box 
        v-for="item in list" 
        :key="item.typeId"
        @click.native="clickHandler(item)"
      >
        {{ item.typeName }} : 共 {{ item.totalCount }} 道
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
  computed: {},
  methods: {
    clickHandler(item) {
      console.log(item);
      const params = this.$route.params;
      let url = "/sage/exam/equestionmanagement/questionListByMST";
      const data = {
        majorId: params.majorid + '',
        sectionId: params.sectionid + '',
        typeId: item.typeId + '',
        pageSize: item.totalCount + '',
        pageNum: "0"
      };
      axios.post(url, data).then(resp => {
        console.log(resp.data.questionList.list);
      });
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
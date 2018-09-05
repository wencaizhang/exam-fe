<template>

    <div :class="$style.container">
      <group>
        <cell-box >
          章节
        </cell-box>
      </group>
    </div>
    
</template>

<script>
import axios from "axios";
import { XButton, Group, CellBox, Cell, Badge } from "vux";

export default {
  data() {
    return {

    };
  },
  components: {
    Group,
    CellBox,
    Cell,
  },
  computed: {

  },
  methods: {

  },
  created() {

  }
};
</script>

<style >
</style>
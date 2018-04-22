<template>
  <div class="back-header">
    <flexbox>
      <flexbox-item>
        <x-button class="return" mini plain="true" type="primary" link="BACK">返回</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { XButton, Flexbox, FlexboxItem } from "vux";
export default {
  components: {
    XButton,
    Flexbox,
    FlexboxItem
  }
};
</script>
<style>
.back-header {
  padding: 10px;
  background-color: #35495e;
}
</style>

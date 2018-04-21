<template>
  <div class="header">
    <flexbox>
      <flexbox-item>
        <x-button class="return" mini type="primary" link="BACK">返回</x-button>
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
.header {
  padding: 10px;
}
</style>

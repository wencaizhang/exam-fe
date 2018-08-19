<template>
  <div>
    <x-header :left-options="{backText: ''}">重置密码</x-header>
    <Forget></Forget>
  </div>
</template>

<script>
import Forget from "./Forget";
import { XHeader } from 'vux'
export default {
  name: "",
  data() {
    return {
    };
  },
  components: {
    Forget,
    XHeader
  },
  methods: {
  }
};
</script>

<style>
</style>
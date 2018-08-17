<template>
    <div id="app">
        <router-view name='header'></router-view>
        <router-view v-wechat-title='$route.meta.title'></router-view>
        <router-view name='footer'></router-view>
    </div>
</template>

<script>

export default {
    name: "app",
    created () {
        this.$store.commit('setExamData', this.$route.query.data);
    }
}

</script>

<style>
#app {
    min-height: 100%;
}
</style>

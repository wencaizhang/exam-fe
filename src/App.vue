<template>
    <div id="app">
        <router-view name='header'></router-view>
        <router-view v-wechat-title='$route.meta.title'></router-view>
        <router-view name='footer'></router-view>
        <loading :show="showLoading" :text=" loadText || 'loading'"></loading>
        <toast v-model="showWarn" type="warn">{{ warnText }}</toast>
    </div>
</template>

<script>

import { Loading, Toast  } from 'vux'

export default {
    name: "app",
    components: {
        Loading,
        Toast
    },
    computed: {
        showLoading () {
            return this.$store.state.index.showLoading;
        },
        showWarn: {
            get () {
                return this.$store.state.index.showWarn;
            },
            set () {
                this.$store.commit('toggleShowWarn', false);
                this.$store.commit('setWarnText', '');
            }
        },
        warnText () {
            return this.$store.state.index.warnText;
        },
        loadText () {
            return this.$store.state.index.loadText;
        },
    },
    created () {
        console.log(this.$route.query.data);
        this.$store.commit('setExamData', this.$route.query.data)
    }
}

</script>

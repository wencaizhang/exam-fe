<template>
    <div id="app">
        <div>
            <router-view v-wechat-title='$route.meta.title'></router-view>
        </div>
        <Footer ></Footer>
    </div>
</template>

<script>
// import Header from "./component/Header.vue"
import Footer from "./components/Footer"
// import login from "./component/login.vue"
// import register from "./component/register.vue"
// import forgetPassword from "./component/forgetPassword.vue";

export default {
    name: "app",
    components: {
        Footer,
    }
};

</script>
import axios from "axios";
const state = {
    name: '张文才'
}

const getters = {
    
}

const mutations = {
    setUserInfo: (state, payload) => {
        Object.assign(state, payload);
    }
}

const actions = {
    login (context, payload) {
        // context.commit('setUserInfo', {
        //     name: '阿文'
        // })
        // console.log(payload)

        axios
        .post("/login", payload)
        .then(resp => {
        //   vm.loading = false;
        //   if (resp.data.code == 0) {
        //     vm.loginOK = true;
        //     vm.$router.push({ path: "/home" });
        //   } else {
        //     vm.tips = "用户名或密码错误";
        //   }
        })
        .catch(error => {
        //   this.loading = false;
          console.log(error);
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
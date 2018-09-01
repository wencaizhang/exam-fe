<template>
  <div class="container">
    <p v-if="!pickerResultList.length">请先选择单位</p>
    <div v-if="pickerResultList.length" v-for="(item, index) in pickerResultList" :key="item[0]">
      <p >{{ item[0] }}
      <span style="color: #999;" v-if="selectAble && index + 1 == pickerResultList.length">（已经是最后一级单位）</span></p>
      <x-icon v-if="index + 1 != pickerResultList.length" type="ios-arrow-thin-down" size="30"></x-icon>
    </div>
    <x-hr></x-hr>

    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextSelect" plain :disabled="selectAble">选择下一级单位</x-button>
      <x-button @click.native="reSelect" plain>重新开始选择</x-button>
    </div>

    <x-hr></x-hr>
    
    <x-button type="primary" @click.native="nextStep" >下一步</x-button>

    <div v-transfer-dom>
      <popup v-model="showPopup">
        <div class="popup-box">
          <p class="popup-buttons">
            <span class="cancel" @click="popupCancelHandle">取消</span>
            <span class="select">请选择</span>
            <span class="success" @click="popupSuccessHandle">确定</span>
          </p>
          <picker :data='pickerData'  v-model='danweiValue'></picker>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  Group,
  Picker,
  XButton,
  Popup,
  XHr,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Picker,
    XButton,
    Popup,
    XHr
  },
  computed: {
    deptList() {
      return this.$store.state.user.deptList
    }
  },
  created() {
    if (!this.$store.state.user.fetchDeptList) {
      this._getDeptList();
    } else {
      this.pickerResultList = this.$store.state.user.pickerResultList;
      this.resetPickerData();
    }
  },
  methods: {
    resetPickerData () {
      
      let parent;

      if (this.pickerResultList.length) {
        let currVal = this.pickerResultList[this.pickerResultList.length-1][0]
        parent = this.deptList[0].filter(
          item => item.name === currVal
        )[0]["value"];
      } else {
        parent = "0";
      }
      const list = this.deptList[0].filter(item => item.parent === parent);
      const values = list.map(item => item.name);

      if (!values.length) {
        this.selectAble = true;
        // this.$vux.toast.show({
        //   type: "text",
        //   width: "14em",
        //   text: "已经是最后一级单位"
        // });
      } else {
        this.pickerData[0].splice(0, 100, ...values);
      }
    },
    nextStep () {
      this.$store.commit('toggleSelectDept')
    },
    nextSelect () {

      if (this.pickerData[0].length) {
        this.showPopup = true;
        return;
      }
    },
    reSelect () {
      this.pickerData[0].splice(0, 100, '');
      this.pickerResultList.splice(0, 100);
      this.$store.commit('setPickerResultList', this.pickerResultList)
      this.selectAble = false;
      this.resetPickerData();
    },

    // copy
    popupCancelHandle() {
      this.showPopup = false;
    },
    popupSuccessHandle() {
      this.showPopup = false;
      this.setCompanyName();
    },
    setCompanyName() {
      this.pickerResultList.push(this.danweiValue)
      this.$store.commit('setPickerResultList', this.pickerResultList)
      this.resetPickerData();
    },
    _getDeptList() {
      // 获取所属单位列表数据
      // this.$store.commit('setLoadText', '正在请求单位列表')
      let url = "/sys/dept/list";
      const options = {
        url,
        method: "GET",
      };
      axios(options)
        .then(resp => {
          if (resp.data.code == 0) {
            const deptList = resp.data.deptList.map(item => {
              // 数字转成字符串，否则会出问题
              return {
                value: item.deptId + '',
                name: item.name,
                parent: item.parentId + '',
                deptNumber: item.deptNo
              }
            });
            this.$store.commit('setDeptList', deptList)
            this.pickerResultList = this.$store.state.user.pickerResultList;
            this.resetPickerData();
          }
        })
    },
  },
  data() {
    return {
      showPopup: false,
      selectAble: false,
      danweiValue: [],
      pickerResultList: [],
      pickerData: [['']],
    };
  }
};
</script>

<style scoped>
.container {
  padding: 30px;
}
.popup-buttons {
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  padding: 0 10px;
  background-color: #fbf9fe;
}
.cancel {
  float: left;
  color: #ccc;
}
.select {
  color: #000;
}
.success {
  float: right;
  color: #f90;
}

.step-box {
  margin-bottom: 10px;
}
/* reset css*/
.vux-step {
  display: block;
}
.vux-step-item {
  display: block;
  text-align: center;

}
.vux-step-item-tail {
  display: none;
}

.vux-step-item-tail .vux-step-item-main {
  width: 40%;
  background: #ccc;
  text-align: left;
  line-height: 24px;
}
</style>
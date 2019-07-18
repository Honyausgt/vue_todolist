import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],

    //添加事项的输入框文本
    addContent: '',
  },
  mutations: {
    initList(state, getlist) {
      state.list = getlist
    },

    //添加事项
    addItem(state) {
      // 生成一个待办事项的对象
      let obj = {
      }
    },

    // 绑定输入框的值
    iptValue(state, val) {
      state.addContent = val
    }
  },
  actions: {
    getList(context) {
      // 请求list.json获取数据
      axios.get("/list.json").then(res => {
        // 触发commit调用mutations的方法，将数据复制到list
        context.commit("initList", res.data)
        console.log(res.data)
      }
      )
    }
  },
  getters: {
  }
})

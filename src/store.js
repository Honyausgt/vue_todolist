import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],

    //添加事项的输入框文本
    addContent: '',

    //新增用户的id号
    nextId: 5,

    //保存切换状态的值
    swiStatusVal: 'all'
  },
  mutations: {
    // 初始化待办事项数据列表
    initList(state, getlist) {
      state.list = getlist
      console.log(state.list);
    },

    // 绑定输入框的值
    iptValue(state, val) {
      state.addContent = val
    },

    //添加事项
    addItem(state) {
      // 生成一个待办事项的对象
      let obj = {
        id: state.nextId,
        done: false,
        info: state.addContent
      }
      //将生成的对象添加到数组里
      state.list.push(obj)

      //id号自增
      state.nextId++
    },

    //删除待办事项
    delTodo(state, id) {
      // 通过findINdex方法找到要删除的那一项
      let dId = state.list.findIndex(x => x.id == id)
      // 调用splic方法删除对应id的那一项
      state.list.splice(dId, 1)
    },

    swiStatus(state, status) {
      state.swiStatusVal = status
    },

    //复选框状态
    checkStatus(state, id) {
      // let index = state.list.findIndex(x => x.id == id)
      // state.list[index].done = !state.list[index].done
      state.list.forEach((item) => {
        if (id == item.id) item.done = !item.done
      })
    },

    //清除已完成
    clearCom(state) {
      state.list = state.list.filter(x => !x.done)
    }

  },
  actions: {
    getList(context) {
      // 请求list.json获取数据
      axios.get("/list.json").then(res => {
        // 触发commit调用mutations的方法，将数据复制到list
        context.commit("initList", res.data)
      }
      )
    }
  },
  getters: {
    //切换状态 筛选待办事项
    filterItem(state) {
      //筛选待办事项业务逻辑
      if (state.swiStatusVal == 'all') return state.list
      if (state.swiStatusVal == 'unDone') {

        console.log(state.list.filter(x => !x.done));

        return state.list.filter(x => x.done == false)
      }
      if (state.swiStatusVal == 'Done') return state.list.filter(x => x.done == true)
    },

    //统计已完成项
    doneCount(state) {
      return state.list.filter(x => x.done == false).length

    }

  }
})

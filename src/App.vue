<template>
  <div id="app">
    <a-input :value="addContent" @change="iptValueChange" placeholder="请输入任务" class="my_ipt" />
    <a-button type="primary" @click="addItemBtn">添加事项</a-button>

    <a-list bordered :dataSource="filterItem" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkChange(item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>
          <strong>{{doneCount}}</strong> 项待办
        </span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="swiStatusVal == 'all'?'primary':'default'"
            @click="switchStatus('all')"
          >全部</a-button>
          <a-button
            :type="swiStatusVal == 'unDone'?'primary':'default'"
            @click="switchStatus('unDone')"
          >未完成</a-button>
          <a-button
            :type="swiStatusVal == 'Done'?'primary':'default'"
            @click="switchStatus('Done')"
          >已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearComplete">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  methods: {
    addItemBtn() {
      this.$store.commit('addItem')
    },

    // 输入框的值发生变化时
    iptValueChange(e) {
      console.log(e.target.value)
      // 触发mutation将输入框的值传递过去
      // 注：此处通过事件对象获取输入框的值
      this.$store.commit('iptValue', e.target.value)
    },

    //删除待办事项
    delItem(delId) {
      // 触发mutation将id传递过去
      this.$store.commit('delTodo', delId)
    },

    //底部按钮组 切换状态
    switchStatus(status) {
      this.$store.commit('swiStatus', status)
      // this.$store.getters.filterItem
    },

    //复选框选中和取消
    checkChange(id) {
      this.$store.commit('checkStatus', id)
    },

    //清除已完成
    clearComplete() {
      this.$store.commit('clearCom')
    }
  },

  computed: {
    ...mapState(['list', 'addContent', 'swiStatusVal']),
    ...mapGetters(['filterItem', 'doneCount'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

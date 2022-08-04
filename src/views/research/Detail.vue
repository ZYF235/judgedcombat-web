<template>
  <el-container v-show="active>0">
    <el-header height="auto">
      <el-steps :active="active" simple>
        <el-step title="发起任务" icon="el-icon-edit"/>
        <el-step title="任务分工" icon="el-icon-user"/>
        <el-step title="研判反馈" icon="el-icon-position"/>
        <el-step title="办结审批" icon="el-icon-connection"/>
      </el-steps>
    </el-header>
    <el-main>
      <!--发起任务-->
      <Initiate v-show="active==1" :active.sync="active" :status.sync="status" :user="user" :task-type="taskType"/>
      <!--任务分工-->
      <Division v-show="active==2" :active.sync="active" :status.sync="status" :user="user"/>
      <!--研判反馈-->
      <Feedback v-show="active==3" :active.sync="active" :status.sync="status" :user="user"/>
      <!--办结审批-->
      <Approval v-show="active>=4" :active.sync="active" :status.sync="status" :user="user"/>
    </el-main>
  </el-container>
</template>

<script>
import Initiate from '@/views/research/detail/Initiate'
import Division from '@/views/research/detail/Division'
import Feedback from '@/views/research/detail/Feedback'
import Approval from '@/views/research/detail/Approval'
import {getWisUserInfo} from '@/api/wisUserInfo'

export default {
  name: 'TaskDetail',
  components: {
    Initiate, Division, Feedback, Approval
  },
  props: {
    taskType: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      user: {},
      active: 0,
      status: '00'
    }
  },
  created() {
    this.fetchUserInfo()
  },
  methods: {
    fetchUserInfo() {
      getWisUserInfo().then(resp => {
        this.user = resp.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding-top: 20px;
}

.el-main {
  padding-bottom: 0;
}
</style>

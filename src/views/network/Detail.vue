<template>
  <el-container v-show="active>0">
    <el-header height="auto">
      <el-steps :active="active" align-center>
        <el-step title="发起任务"/>
        <el-step title="收网管理"/>
        <el-step title="收网分配"/>
        <el-step title="办结审批"/>
        <el-step title="开展行动"/>
      </el-steps>
    </el-header>
    <el-main>
      <!--发起任务-->
      <Launch v-show="active==1" :active.sync="active" :status.sync="status"/>
      <!--收网管理-->
      <Manage v-show="active==2" :active.sync="active" :status.sync="status"/>
      <!--收网分配-->
      <Assign v-show="active==3" :active.sync="active" :status.sync="status"/>
      <!--开展行动-->
      <Action v-show="active==5" :active.sync="active" :status.sync="status"/>
    </el-main>
  </el-container>
</template>

<script>
import Launch from '@/views/network/detail/Launch'
import Manage from '@/views/network/detail/Manage'
import Assign from '@/views/network/detail/Assign'
import Action from '@/views/network/detail/Action'

export default {
  name: 'Detail',
  components: {
    Launch, Manage, Assign, Action
  },
  data() {
    return {
      active: 0,
      status: '00'
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

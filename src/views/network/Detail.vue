<template>
  <el-container v-show="active>0">
    <el-header height="auto">
      <el-steps :active="active" simple>
        <el-step title="发起任务" icon="el-icon-edit"/>
        <el-step title="收网管理" icon="el-icon-user"/>
        <el-step title="收网分配" icon="el-icon-position"/>
        <el-step title="办结审批" icon="el-icon-connection"/>
      </el-steps>
    </el-header>
    <el-main>
      <!--发起任务-->
      <Launch v-show="active==1" :active.sync="active" :status.sync="status"/>
      <!--收网管理-->
      <Manage v-show="active==2" :active.sync="active" :status.sync="status"/>
      <!--收网分配-->
      <Assign v-show="active==3" :active.sync="active" :status.sync="status"/>
    </el-main>
  </el-container>
</template>

<script>
import Launch from '@/views/network/detail/Launch'
import Manage from '@/views/network/detail/Manage'
import Assign from '@/views/network/detail/Assign'

export default {
  name: 'Detail',
  components: {
    Launch, Manage, Assign
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

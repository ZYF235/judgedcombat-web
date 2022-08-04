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
      <Launch v-show="active==1" :active.sync="active" :status.sync="status"/>
    </el-main>
  </el-container>
</template>

<script>
import Launch from '@/views/network/detail/Launch'

export default {
  name: 'Detail',
  components: {
    Launch
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

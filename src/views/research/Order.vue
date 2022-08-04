<template>
  <el-container>
    <el-header>
      <div class="el-header-title">研判令</div>
      <el-button type="primary" icon="el-icon-edit">
        <router-link to="/research/createOrder">发起研判令</router-link>
      </el-button>
    </el-header>
    <el-main>
      <el-tabs type="card">
        <el-tab-pane label="研判令">
          <OrderList/>
        </el-tab-pane>
        <el-tab-pane label="办结审批">
          <CloseList/>
        </el-tab-pane>
        <el-tab-pane label="加入申请">
          <ApplyList/>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import OrderList from '@/views/research/order/OrderList'
import CloseList from '@/views/research/order/CloseList'
import ApplyList from '@/views/research/order/ApplyList'

export default {
  name: 'Order',
  components: {
    OrderList, CloseList, ApplyList
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  height: auto !important;
  padding-top: 20px;

  &-title {
    display: inline-block;
    font-size: 30px;
  }

  .el-button {
    float: right;
    padding: 10px 15px;
  }
}
</style>

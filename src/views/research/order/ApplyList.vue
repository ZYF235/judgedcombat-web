<template>
  <div>
    <el-form label-width="68px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="申请单位">
            <el-cascader v-model="query.unitCode" placeholder="请选择申请单位" :props="applyUnitProps" :options="applyUnitOptions" :show-all-levels="false"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请状态">
            <el-select v-model="query.applyStatus" placeholder="请选择申请状态" clearable>
              <el-option v-for="item in applyStatusOptions" :key="item.value" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="handleResetClick">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="dataLoading" :data="dataList" border fit highlight-current-row>
      <el-table-column prop="taskName" label="任务名称"/>
      <el-table-column prop="taskLevel" label="任务等级" width="70"/>
      <el-table-column prop="launchUnitName" label="发起单位"/>
      <el-table-column prop="taskStatusDesc" label="任务状态" width="70"/>
      <el-table-column prop="deadlineTime" label="截止办理时间" width="120"/>
      <el-table-column prop="applyUnitName" label="申请单位"/>
      <el-table-column prop="applyStatusDesc" label="申请状态" width="70"/>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-button v-if="row.applyStatus=='00'" :loading="row.agreeLoading" type="text" size="mini" @click="handleAgreeClick(row)">同意</el-button>
          <el-button v-if="row.applyStatus=='00'" :loading="row.disagreeLoading" type="text" size="mini" @click="handleDisagreeClick(row)">不同意</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="query.pageNum"
      :page-size="query.pageSize"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import {lastItem} from '@/utils'
import {getWisWisUnitInfoVoTreeVoList} from '@/api/wisUnitInfo'
import {agreeApply, disagreeApply, getApplyList, getApplyStatus} from '@/api/wisResApply'

export default {
  name: 'ApplyList',
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        unitCode: undefined,
        applyStatus: undefined
      },
      applyUnitProps: {
        value: 'unitCode',
        label: 'unitName',
        checkStrictly: true
      },
      applyUnitOptions: [],
      applyStatusOptions: [],
      total: 0,
      dataList: [],
      dataLoading: false
    }
  },
  created() {
    this.fetchApplyUnit()
    this.fetchApplyStatus()
    this.fetchApplyList()
  },
  methods: {
    fetchApplyUnit() {
      getWisWisUnitInfoVoTreeVoList().then(resp => {
        this.applyUnitOptions = resp.data
      })
    },
    fetchApplyStatus() {
      getApplyStatus().then(resp => {
        this.applyStatusOptions = resp.data
      })
    },
    fetchApplyList() {
      this.query.unitCode = lastItem(this.query.unitCode)

      this.dataLoading = true
      getApplyList(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    handleQueryClick() {
      this.query.pageNum = 1
      this.fetchApplyList()
    },
    handleResetClick() {
      this.query.unitCode = undefined
      this.query.applyStatus = undefined
    },
    handleAgreeClick(row) {
      row.agreeLoading = true
      agreeApply({
        id: row.id
      }).then(() => {
        this.$message({
          type: 'success',
          message: '同意申请成功'
        })
        row.agreeLoading = false
        this.handleQueryClick()
      })
    },
    handleDisagreeClick(row) {
      row.disagreeLoading = true
      disagreeApply({
        id: row.id
      }).then(() => {
        this.$message({
          type: 'success',
          message: '不同意申请成功'
        })
        row.disagreeLoading = false
        this.fetchApplyList()
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.fetchApplyList()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.fetchApplyList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 20px;
}

.el-select, .el-cascader {
  width: 100%;
}
</style>

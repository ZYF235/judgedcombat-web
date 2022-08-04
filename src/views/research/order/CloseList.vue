<template>
  <div>
    <el-form label-width="68px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="任务名称">
            <el-input v-model="query.taskName" placeholder="请输入任务名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务等级">
            <el-select v-model="query.taskLevel" placeholder="请选择任务等级" clearable>
              <el-option v-for="item in options.taskLevel" :key="item.value" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务状态">
            <el-select v-model="query.taskStatus" placeholder="请选择任务状态" clearable>
              <el-option v-for="item in options.taskStatus" :key="item.value" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="研判对象">
            <el-select v-model="query.researchObject" placeholder="请选择研判对象" clearable>
              <el-option v-for="item in options.researchObject" :key="item.value" :value="item.value" :label="item.describe"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="handleResetClick">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="dataLoading" :data="dataList" border fit highlight-current-row>
      <el-table-column prop="taskName" label="任务名称"/>
      <el-table-column prop="taskLevel" label="任务等级"/>
      <el-table-column prop="launchUnitName" label="发起单位"/>
      <el-table-column prop="researchObjectDesc" label="研判对象"/>
      <el-table-column prop="researchName" label="线索/案件名称"/>
      <el-table-column prop="taskStatusDesc" label="任务状态"/>
      <el-table-column prop="launchTime" label="发起时间"/>
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="{row}">
          <el-button type="text" size="mini">
            <router-link :to="'/research/editTask/'+row.taskCode">办理</router-link>
          </el-button>
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
import {getApprovalTask, getResearchObject, getTaskLevel, getTaskStatus} from '@/api/wisResTask'

export default {
  name: 'CloseList',
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        taskName: undefined,
        taskLevel: undefined,
        taskStatus: undefined,
        researchObject: undefined
      },
      options: {
        taskLevel: [],
        taskStatus: [],
        researchObject: []
      },
      total: 0,
      dataList: [],
      dataLoading: false
    }
  },
  created() {
    this.fetchTaskLevel()
    this.fetchTaskStatus()
    this.fetchResearchObject()
    this.fetchApprovalTask()
  },
  methods: {
    fetchTaskLevel() {
      getTaskLevel().then(resp => {
        this.options.taskLevel = resp.data
      })
    },
    fetchTaskStatus() {
      getTaskStatus().then(resp => {
        this.options.taskStatus = resp.data
      })
    },
    fetchResearchObject() {
      getResearchObject().then(resp => {
        this.options.researchObject = resp.data
      })
    },
    fetchApprovalTask() {
      this.dataLoading = true
      getApprovalTask(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    handleQueryClick() {
      this.query.pageNum = 1
      this.fetchApprovalTask()
    },
    handleResetClick() {
      this.query.taskName = undefined
      this.query.taskLevel = undefined
      this.query.taskStatus = undefined
      this.query.researchObject = undefined
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.fetchCapableTask()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.fetchCapableTask()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 20px;
}

.el-select {
  width: 100%;
}
</style>

<template>
  <el-container>
    <el-header>
      <div class="el-header-title">收网任务</div>
      <el-button type="primary" icon="el-icon-edit">
        <router-link to="/network/createTask">发起收网任务</router-link>
      </el-button>
    </el-header>
    <el-main>
      <el-form label-width="96px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务编号">
              <el-input v-model="query.taskCode" placeholder="请输入任务编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务名称">
              <el-input v-model="query.taskName" placeholder="请输入任务名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="案件编号">
              <el-input v-model="query.caseCode" placeholder="请输入案件编号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="案件名称">
              <el-input v-model="query.caseName" placeholder="请输入案件名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="任务开始时间">
              <el-date-picker v-model="dateTime" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"/>
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
        <el-table-column prop="caseCode" label="案件编号"/>
        <el-table-column prop="caseName" label="案件名称"/>
        <el-table-column prop="partUnits" label="参与单位"/>
        <el-table-column prop="arrestNumber" label="总抓捕人数"/>
        <el-table-column prop="arrivedNumber" label="已到位人数"/>
        <el-table-column prop="taskStartTime" label="任务开始时间"/>
        <el-table-column prop="taskEndTime" label="任务结束时间"/>
        <el-table-column label="操作" align="center" width="60">
          <template slot-scope="{row}">
            <el-button type="text" size="mini">
              <router-link :to="'/network/editTask/'+row.taskCode">办理</router-link>
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
    </el-main>
  </el-container>
</template>

<script>
import {parseTime} from '@/utils'
import {getNetTaskList} from '@/api/network/wisNetTask'

export default {
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        taskCode: undefined,
        taskName: undefined,
        caseCode: undefined,
        caseName: undefined
      },
      dateTime: [],
      total: 0,
      dataList: [],
      dataLoading: true
    }
  },
  watch: {
    dateTime(val) {
      if (val.length > 0) {
        this.query.startTimeGte = parseTime(val[0])
        this.query.startTimeLte = parseTime(val[1])
      } else {
        this.query.startTimeGte = undefined
        this.query.startTimeLte = undefined
      }
    }
  },
  created() {
    this.fetchNetTaskList()
  },
  methods: {
    fetchNetTaskList() {
      this.dataLoading = true
      getNetTaskList(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    handleQueryClick() {
      this.query.pageNum = 1
      this.fetchNetTaskList()
    },
    handleResetClick() {
      this.dateTime = []
      this.query.taskCode = undefined
      this.query.taskName = undefined
      this.query.caseCode = undefined
      this.query.caseName = undefined
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.fetchNetTaskList()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.fetchNetTaskList()
    }
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

.el-table {
  margin-bottom: 20px;
}

.el-select, .el-date-editor {
  width: 100%;
}
</style>

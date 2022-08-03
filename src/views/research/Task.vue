<template>
  <el-container>
    <el-header>
      <div class="el-header-title">研判任务</div>
      <el-button type="primary" icon="el-icon-edit">
        <router-link to="/research/createTask">发起研判任务</router-link>
      </el-button>
    </el-header>
    <el-main>
      <el-form label-width="68px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="任务名称">
              <el-input v-model="query.taskName" placeholder="请输入任务名称" @keyup.enter.native="filterMineTask"/>
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
          <el-col :span="10">
            <el-form-item label="发起时间">
              <el-date-picker v-model="dateTime" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="filterMineTask">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="filterFormReset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-loading="dataLoading" :data="dataList" border fit highlight-current-row>
        <el-table-column prop="taskCode" label="任务编号" width="200">
          <template slot-scope="{row}">
            <el-tag v-if="row.taskType=='02'" size="mini">研判令</el-tag>
            <span>{{ row.taskCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称"/>
        <el-table-column prop="taskLevel" label="任务等级" width="70"/>
        <el-table-column prop="launchUnitName" label="发起单位"/>
        <el-table-column prop="researchObjectDesc" label="研判对象" width="70"/>
        <el-table-column prop="researchName" label="线索/案件名称"/>
        <el-table-column prop="taskStatusDesc" label="任务状态" width="70"/>
        <el-table-column prop="launchTime" label="发起时间" width="140"/>
        <el-table-column label="操作" align="center" width="60">
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
    </el-main>
  </el-container>
</template>

<script>
import {parseTime} from '@/utils'
import {getMineTask, getResearchObject, getTaskLevel, getTaskStatus} from '@/api/wisResTask'

export default {
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
      dateTime: [],
      total: 0,
      dataList: [],
      dataLoading: true
    }
  },
  watch: {
    dateTime(val) {
      if (val.length > 0) {
        this.query.launchTimeGte = parseTime(val[0])
        this.query.launchTimeLte = parseTime(val[1])
      } else {
        this.query.launchTimeGte = undefined
        this.query.launchTimeLte = undefined
      }
    }
  },
  created() {
    this.fetchTaskLevel()
    this.fetchTaskStatus()
    this.fetchResearchObject()
    this.fetchMineTask()
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
    fetchMineTask() {
      this.dataLoading = true
      getMineTask(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    filterMineTask() {
      this.query.pageNum = 1
      this.fetchMineTask()
    },
    filterFormReset() {
      this.dateTime = []
      this.query.taskName = undefined
      this.query.taskLevel = undefined
      this.query.taskStatus = undefined
      this.query.researchObject = undefined
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.fetchMineTask()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.fetchMineTask()
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

.el-select, .el-date-picker {
  width: 100%;
}
</style>

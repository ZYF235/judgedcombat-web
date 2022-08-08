<template>
  <div>
    <el-form label-width="100px">
      <el-card header="一人一档">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="嫌疑人姓名">
              <el-input v-model="query.suspectName" placeholder="请输入嫌疑人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">查询</el-button>
            <el-upload class="el-upload-container" action="" :show-file-list="false" :http-request="handleHttpRequest">
              <el-button icon="el-icon-upload" plain>上传嫌疑人信息</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-table v-loading="dataLoading" :data="dataList" border fit highlight-current-row>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="gender" label="性别"/>
          <el-table-column prop="idNumber" label="身份证号"/>
          <el-table-column prop="telephone" label="电话"/>
          <el-table-column prop="censusAddress" label="户籍地址"/>
          <el-table-column prop="plateNumber" label="车牌号"/>
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
      </el-card>
    </el-form>
    <el-row style="margin-bottom: 20px">
      <el-button @click="stepActive=1">上一步</el-button>
      <el-button v-if="taskStatus=='03'" @click="doSubmitFeedback">提交</el-button>
      <el-button v-if="taskStatus=='03'" @click="doTempSaveFeedback">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=4">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
import {getNetSuspectList, uploadNetSuspect} from '@/api/network/wisNetSuspect'

export default {
  props: {
    status: {
      required: true,
      type: String
    },
    active: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        taskCode: '',
        suspectName: ''
      },
      total: 0,
      dataList: [],
      dataLoading: true
    }
  },
  computed: {
    stepActive: {
      get() {
        return this.active
      },
      set(val) {
        this.$emit('update:active', val)
      }
    },
    taskStatus: {
      get() {
        return this.status
      },
      set(val) {
        this.$emit('update:status', val)
      }
    }
  },
  created() {
    const taskCode = this.$route.params && this.$route.params.taskCode
    if (taskCode) {
      this.query.taskCode = taskCode

      this.fetchNetSuspectList()
    }
  },
  methods: {
    fetchNetSuspectList() {
      this.dataLoading = true
      getNetSuspectList(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    handleQueryClick() {
      this.query.pageNum = 1
      this.fetchNetSuspectList()
    },
    handleHttpRequest(data) {
      const formData = new FormData()
      formData.set('file', data.file)
      formData.set('taskCode', this.query.taskCode)

      uploadNetSuspect(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
        this.handleQueryClick()
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.handleQueryClick()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.handleQueryClick()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card, .el-table {
  margin-bottom: 20px;
}

.el-upload-container {
  display: inline-block;
  margin-left: 20px;
}
</style>

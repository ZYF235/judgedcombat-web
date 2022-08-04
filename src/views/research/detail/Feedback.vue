<template>
  <div>
    <el-form label-width="100px">
      <el-card header="研判反馈信息">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="反馈单位">
              <el-input v-model="feedbackVo.unitName" placeholder="请选择反馈单位"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈人员">
              <el-input v-model="feedbackVo.userName" placeholder="请选择反馈人员"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="反馈时间">
              <el-input v-model="feedbackVo.feedbackTime" placeholder="请选择反馈时间"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card header="嫌疑人信息">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="嫌疑人姓名">
              <el-input v-model="query.suspectName" placeholder="请输入嫌疑人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="doGetSuspectInfo">查询</el-button>
          </el-col>
          <el-col :span="4">
            <el-upload action="" :show-file-list="false" :http-request="doUploadSuspectInfo">
              <el-button icon="el-icon-upload" plain>上传嫌疑人信息</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-table v-loading="dataLoading" :data="dataList" border fit highlight-current-row>
          <el-table-column prop="suspectName" label="姓名"/>
          <el-table-column prop="suspectPhone" label="手机号"/>
          <el-table-column prop="suspectIdCard" label="身份证号"/>
          <el-table-column prop="suspectRole" label="角色"/>
          <el-table-column prop="suspectPhoto" label="照片"/>
          <el-table-column prop="suspectDetail" label="详情"/>
          <el-table-column prop="suspectAddress" label="地址"/>
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
      <el-button @click="stepActive=2">上一步</el-button>
      <el-button v-if="taskStatus=='03'" @click="doSubmitFeedback">提交</el-button>
      <el-button v-if="taskStatus=='03'" @click="doTempSaveFeedback">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=4">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
import {parseTime} from '@/utils'
import {getFeedback, getSuspectInfo, submitFeedback, tempSaveFeedback, uploadSuspectInfo} from '@/api/wisResFeedback'

export default {
  name: 'Feedback',
  props: {
    user: {
      required: true,
      type: Object
    },
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
      feedbackVo: {
        taskCode: '',
        unitCode: '',
        unitName: '',
        userCode: '',
        userName: '',
        feedbackTime: parseTime(new Date())
      },
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
      this.feedbackVo.taskCode = taskCode

      this.doGetFeedback(taskCode)
      this.doGetSuspectInfo()
    }
  },
  methods: {
    doGetFeedback(taskCode) {
      getFeedback({
        taskCode: taskCode
      }).then(resp => {
        const data = resp.data

        if (data) {
          this.feedbackVo = data
        } else {
          this.feedbackVo.unitCode = this.user.unitCode
          this.feedbackVo.unitName = this.user.unitName
          this.feedbackVo.userCode = this.user.userCode
          this.feedbackVo.userName = this.user.userName
        }
      })
    },
    doSubmitFeedback() {
      submitFeedback(this.feedbackVo).then(() => {
        this.$message({
          type: 'success',
          message: '提交审批信息成功'
        })
        this.stepActive = 4
        this.taskStatus = '04'
      })
    },
    doTempSaveFeedback() {
      tempSaveFeedback(this.feedbackVo).then(() => {
        this.$message({
          type: 'success',
          message: '暂存审批信息成功'
        })
      })
    },
    doGetSuspectInfo() {
      this.dataLoading = true
      getSuspectInfo(this.query).then(resp => {
        this.total = resp.data.total
        this.dataList = resp.data.dataList

        this.dataLoading = false
      })
    },
    doUploadSuspectInfo(data) {
      const formData = new FormData()
      formData.set('file', data.file)
      formData.set('taskCode', this.query.taskCode)

      uploadSuspectInfo(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
        this.doGetSuspectInfo()
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.doGetSuspectInfo()
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.doGetSuspectInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card, .el-table {
  margin-bottom: 20px;
}
</style>

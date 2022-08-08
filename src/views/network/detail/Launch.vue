<template>
  <el-form label-width="124px">
    <el-card header="任务基本信息" shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="任务编号">
            <el-input v-model="wisNetTask.taskCode" placeholder="请输入任务编号" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务名称">
            <el-input v-model="wisNetTask.taskName" placeholder="请输入任务名称"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="案件编号">
            <el-input v-model="wisNetTask.caseCode" placeholder="请输入案件编号">
              <el-button slot="append" type="primary" icon="el-icon-search">查询</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="案件名称">
            <el-input v-model="wisNetTask.caseName" placeholder="请输入案件名称" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="关联研判任务编号">
            <el-input v-model="wisNetTask.resTaskCode" placeholder="请选择发起单位" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起时间">
            <el-input v-model="wisNetTask.launchTime" placeholder="请选择发起时间" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="任务开始时间">
            <el-date-picker v-model="wisNetTask.taskStartTime" type="datetime" placeholder="请选择任务开始时间"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务结束时间">
            <el-date-picker v-model="wisNetTask.taskEndTime" type="datetime" placeholder="请选择任务结束时间"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="收网方案">
            <el-input v-model="wisNetTask.networkSchemeText" type="textarea" rows="5"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <el-checkbox v-model="wisNetTask.isUploadScheme">附件上传收网方案</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col v-show="wisNetTask.isUploadScheme" :span="24">
          <el-form-item label="">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" drag multiple>
              <i class="el-icon-upload"/>
              <div class="el-upload__text">拖动上传收网方案，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-row>
      <el-button v-if="stepActive==parseInt(taskStatus)" @click="handleSubmitClick">提交</el-button>
      <el-button v-if="stepActive==parseInt(taskStatus)" @click="handleTempSaveClick">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=2">下一步</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {getCurrId, parseTime, setNextId} from '@/utils'
import {getWisUserInfo} from '@/api/wisUserInfo'
import {getNetTask, submitNetTask, tempSaveNetTask} from '@/api/network/wisNetTask'

export default {
  name: 'Launch',
  props: {
    active: {
      required: true,
      type: Number
    },
    status: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      wisNetTask: {
        taskCode: '',
        taskName: '测试任务' + getCurrId('wisNetTask'),
        caseCode: '',
        caseName: '',
        resTaskCode: '',
        launchUnitCode: '',
        launchUserCode: '',
        launchTime: parseTime(new Date()),
        taskStartTime: '',
        taskEndTime: '',
        isUploadScheme: false,
        networkSchemeUrl: '',
        networkSchemeText: ''
      }
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
    this.taskCode = this.$route.params && this.$route.params.taskCode
    if (this.taskCode) {
      this.fetchTaskInfo()
    } else {
      this.fetchUserInfo()
    }
  },
  methods: {
    fetchTaskInfo() {
      getNetTask({
        taskCode: this.taskCode
      }).then(resp => {
        const data = resp.data

        if (data) {
          this.wisNetTask = data

          this.taskStatus = data.taskStatus
          this.stepActive = parseInt(data.taskStatus)
        }
      })
    },
    fetchUserInfo() {
      getWisUserInfo().then(resp => {
        const data = resp.data

        this.stepActive = 1
        this.taskStatus = '01'

        this.wisNetTask.launchUnitCode = data.unitCode
        this.wisNetTask.launchUserCode = data.userCode
      })
    },
    handleFormData() {
      const data = this.wisNetTask

      if (data.taskStartTime instanceof Date) {
        data.taskStartTime = parseTime(data.taskStartTime)
      }
      if (data.taskEndTime instanceof Date) {
        data.taskEndTime = parseTime(data.taskEndTime)
      }
    },
    handleSubmitClick() {
      this.handleFormData()
      submitNetTask(this.wisNetTask).then(() => {
        this.$message({
          type: 'success',
          message: '提交收网任务成功'
        })
        this.stepActive = 2
        this.taskStatus = '02'

        setNextId('wisNetTask')
      })
    },
    handleTempSaveClick() {
      this.handleFormData()
      tempSaveNetTask(this.wisNetTask).then(() => {
        this.$message({
          type: 'success',
          message: '暂存收网任务成功'
        })

        setNextId('wisNetTask')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card {
  margin-bottom: 20px;
}

.el-input, .el-date-picker {
  width: 100%;
}
</style>

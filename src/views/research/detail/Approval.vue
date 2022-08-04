<template>
  <div>
    <el-form label-width="100px" :disabled="taskStatus!='04'">
      <el-card header="办结审批信息" shadow="never">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="审批单位">
              <el-input v-model="approvalVo.unitName" placeholder="请选择审批单位" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批单位">
              <el-input v-model="approvalVo.userName" placeholder="请选择审批人员" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="审批时间">
              <el-input v-model="approvalVo.approvalTime" placeholder="请选择审批时间" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批结果">
              <el-select v-model="approvalVo.approvalResult" placeholder="请选择审批结果">
                <el-option value="01" label="通过"/>
                <el-option value="02" label="不通过"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审批意见">
              <el-input v-model="approvalVo.approvalOpinion" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <el-row style="margin-bottom: 20px">
      <el-button @click="stepActive=3">上一步</el-button>
      <el-button v-if="taskStatus=='04'" @click="doSubmitApproval">提交</el-button>
      <el-button v-if="taskStatus=='04'" @click="doTempSaveApproval">暂存</el-button>
    </el-row>
  </div>
</template>

<script>
import {parseTime} from '@/utils'
import {getApproval, submitApproval, tempSaveApproval} from '@/api/wisResApproval'

export default {
  name: 'Approval',
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
      approvalVo: {
        taskCode: '',
        unitCode: '',
        unitName: '',
        userCode: '',
        userName: '',
        approvalTime: parseTime(new Date()),
        approvalResult: '',
        approvalOpinion: ''
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
    const taskCode = this.$route.params && this.$route.params.taskCode
    if (taskCode) {
      this.doGetApproval(taskCode)
    }
  },
  methods: {
    doGetApproval(taskCode) {
      getApproval({
        taskCode: taskCode
      }).then(resp => {
        const data = resp.data

        if (data) {
          this.approvalVo = data
        } else {
          this.approvalVo.taskCode = taskCode
          this.approvalVo.unitCode = this.user.unitCode
          this.approvalVo.unitName = this.user.unitName
          this.approvalVo.userCode = this.user.userCode
          this.approvalVo.userName = this.user.userName
        }
      })
    },
    doSubmitApproval() {
      submitApproval(this.approvalVo).then(() => {
        this.$message({
          type: 'success',
          message: '提交审批信息成功'
        })
        this.stepActive = 5
        this.taskStatus = '05'
      })
    },
    doTempSaveApproval() {
      tempSaveApproval(this.approvalVo).then(() => {
        this.$message({
          type: 'success',
          message: '暂存审批信息成功'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card {
  margin-bottom: 20px;
}

.el-input, .el-select {
  width: 100%;
}
</style>

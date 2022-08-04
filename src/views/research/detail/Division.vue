<template>
  <el-form label-width="100px">
    <el-card header="相关人员信息" shadow="never">
      <el-row style="margin-bottom: 20px">
        <el-upload action="" :show-file-list="false" :http-request="doUploadPoliceInfo">
          <el-button icon="el-icon-upload" plain>上传民警信息</el-button>
        </el-upload>
      </el-row>
      <el-transfer v-model="selectList" :data="policeList"/>
    </el-card>

    <el-row>
      <el-button @click="stepActive=1">上一步</el-button>
      <el-button v-if="stepActive==parseInt(taskStatus)" type="primary" @click="doSubmitPerson">提交</el-button>
      <el-button v-if="stepActive==parseInt(taskStatus)" @click="doTempSavePerson">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=3">下一步</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {getPoliceInfo, submitPerson, tempSavePerson, uploadPoliceInfo} from '@/api/wisResPerson'

export default {
  name: 'Division',
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
      taskCode: '',
      selectList: [],
      policeList: []
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
  watch: {
    status(val) {
      if (parseInt(val) >= 2) {
        this.doGetPoliceInfo()
      }
    }
  },
  created() {
    this.taskCode = this.$route.params && this.$route.params.taskCode
  },
  methods: {
    doGetPoliceInfo() {
      getPoliceInfo(this.taskCode).then(resp => {
        this.policeList = resp.data.map(item => {
          return {
            key: item.unitCode + '-' + item.userCode,
            label: item.unitName + '-' + item.userName
          }
        })
        console.log(this.policeList)
      })
    },
    doUploadPoliceInfo(data) {
      const formData = new FormData()
      formData.set('file', data.file)
      formData.set('taskCode', this.taskCode)

      uploadPoliceInfo(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
        this.doGetPoliceInfo()
      })
    },
    doSubmitPerson() {
      const formData = this.getFormData()
      submitPerson(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
        this.stepActive = 3
        this.taskStatus = '03'
      })
    },
    doTempSavePerson() {
      const formData = this.getFormData()
      tempSavePerson(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
      })
    },
    getFormData() {
      const personList = this.selectList.map(item => {
        const split = item.split('-')
        return {
          unitCode: split[0],
          userCode: split[1],
          personType: '03'
        }
      })

      return {
        taskCode: this.taskCode,
        personList: personList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card {
  margin-bottom: 20px;
}
</style>

<style lang="scss">
.el-transfer-panel {
  width: 300px;
}
</style>

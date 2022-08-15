<template>
  <el-form label-width="100px">
    <el-card header="相关人员信息" shadow="never">
      <el-row>
        <el-col :span="8" class="text-right">
          <el-upload action="" class="el-upload-container" :show-file-list="false" :http-request="handleHttpRequest">
            <el-button type="text" @click="dialogFormVisible = true">导入通讯录</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-container>
        <el-aside width="200px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="民警" name="first">
              <ul>
                <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="辅警" name="second">
              <ul>
                <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-aside>

        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
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
import {importContacts} from '@/api/wisResMission'

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
    },
    handleHttpRequest(data) {
      const formData = new FormData()
      formData.set('file', data.file)
      formData.set('taskCode', this.taskCode)

      importContacts(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
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

.text-right {
  text-align: right;
}

.el-upload-container {
  display: inline-block;
}
</style>

<style lang="scss">
.el-transfer-panel {
  width: 300px;
}
</style>

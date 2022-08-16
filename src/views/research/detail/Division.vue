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
          <el-tabs>
            <el-tab-pane label="民警">
              <el-table :data="policeList" height="300">
                <el-table-column prop="memberName" label="姓名"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="辅警">
              <el-table :data="policeList2" height="300">
                <el-table-column prop="memberName" label="姓名"/>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <el-tabs>
            <el-tab-pane label="其他任务">
              <el-table :data="missionList" height="300">
                <el-table-column prop="missionName" label="任务名称"/>
              </el-table>
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
      <el-button v-if="stepActive==parseInt(taskStatus)" type="primary" >提交</el-button>
      <el-button v-if="stepActive==parseInt(taskStatus)" @click="doTempSavePerson">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=3">下一步</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {tempSavePerson} from '@/api/wisResPerson'
import {getMemberList, getMissionList, importContacts} from '@/api/wisResMission'

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
      policeList: [],
      policeList2: [],
      missionList: []
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
      this.fetchPoliceList()
      this.fetchPoliceList2()
      this.fetchMissionList()
    }
  },
  methods: {
    fetchPoliceList() {
      getMemberList({
        taskCode: this.taskCode,
        memberType: '01'
      }).then(resp => {
        this.policeList = resp.data
      })
    },
    fetchPoliceList2() {
      getMemberList({
        taskCode: this.taskCode,
        memberType: '02'
      }).then(resp => {
        this.policeList2 = resp.data
      })
    },
    fetchMissionList() {
      getMissionList({
        taskCode: this.taskCode,
        missionType: '02'
      }).then(resp => {
        this.missionList = resp.data
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

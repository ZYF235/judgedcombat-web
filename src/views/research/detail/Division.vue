<template>
  <el-form label-width="100px">
    <el-card header="相关人员信息" shadow="never">
      <el-row>
        <el-col :span="24">
          <el-button type="text" @click="handleDownloadClick">下载模版</el-button>
          <el-upload action="" class="el-upload-container" :show-file-list="false" :http-request="handleHttpRequest">
            <el-button type="text">导入通讯录</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-container>
        <el-aside width="300px">
          <el-tabs>
            <el-tab-pane label="民警">
              <el-table :data="policeList" height="200">
                <el-table-column prop="memberName" label="姓名"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="辅警">
              <el-table :data="auxPoliceList" height="200">
                <el-table-column prop="memberName" label="姓名"/>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <el-tabs>
            <el-tab-pane label="其他任务">
              <el-table :data="missionList" height="200">
                <el-table-column prop="missionName">
                  <template slot="header">
                    <span style="line-height: 32px">任务名称</span>
                    <el-button type="text" class="el-pull-right" @click="dialogFormVisible=true">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-aside>

        <el-main>
          <el-tabs>
            <el-tab-pane label="指挥人员">
              <el-table :data="contacts.directorList" height="200">
                <el-table-column prop="memberName" label="姓名"/>
                <el-table-column prop="memberContact" label="联系方式"/>
                <el-table-column>
                  <template v-slot="{$index}">
                    <el-popconfirm title="确定删除吗？">
                      <el-button slot="reference" type="text" @click="contacts.directorList.splice($index, 1)">删除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <el-tabs>
            <el-tab-pane label="分工架构">
              <el-table :data="contacts.divisionList" row-key="id" height="200">
                <el-table-column prop="mission" label="任务名称" width="180">
                  <template v-slot="{row}">
                    <span>{{ row.mission.missionName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="policeList" label="民警">
                  <template v-slot="{row}">
                    <span>{{ row.policeList.map(value => value.memberName).join('、') }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="auxPoliceList" label="辅警">
                  <template v-slot="{row}">
                    <span>{{ row.auxPoliceList.map(value => value.memberName).join('、') }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                  <template slot="header">
                    <el-button type="text" @click="divisionFormVisible=true">添加</el-button>
                  </template>
                  <template v-slot="{row}">
                    <el-button type="text" @click="tableRow = row;divisionFormVisible = true">添加下级</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-card>

    <el-row>
      <el-button @click="stepActive=1">上一步</el-button>
      <el-button v-if="stepActive===parseInt(taskStatus)" type="primary">提交</el-button>
      <el-button v-if="stepActive===parseInt(taskStatus)">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=3">下一步</el-button>
    </el-row>

    <el-dialog title="添加任务" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogFormModel" label-width="100px">
        <el-form-item label="任务名称" prop="missionName">
          <el-input v-model="dialogFormModel.missionName" placeholder="请输入任务名称"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDialogCancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加分工" :visible.sync="divisionFormVisible">
      <el-form ref="divisionForm" :model="divisionFormModel" label-width="100px">
        <el-form-item prop="missionId" label="任务">
          <el-select v-model="divisionFormModel.missionId" placeholder="请选择任务">
            <el-option v-for="item in missionList" :key="item.missionId" :value="item.missionId" :label="item.missionName"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="policeIds" label="民警">
          <el-select v-model="divisionFormModel.policeIds" multiple placeholder="请选择民警">
            <el-option v-for="item in policeList" :key="item.memberId" :value="item.memberId" :label="item.memberName"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="auxPoliceIds" label="辅警">
          <el-select v-model="divisionFormModel.auxPoliceIds" multiple placeholder="请选择辅警">
            <el-option v-for="item in auxPoliceList" :key="item.memberId" :value="item.memberId" :label="item.memberName"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleDivisionCancel">取 消</el-button>
        <el-button type="primary" @click="handleDivisionConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </el-form>
</template>

<script>
import {getDivisionList, getMemberList, getMissionList, importContacts, saveMission} from '@/api/common/wisCommonDivision'
import {download} from '@/api/common/wisCommonFile'

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
      auxPoliceList: [],
      missionList: [],
      contacts: [],
      dialogFormVisible: false,
      dialogFormModel: {
        missionName: ''
      },
      divisionFormVisible: false,
      divisionFormModel: {
        missionId: '',
        policeIds: [],
        auxPoliceIds: []
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
      this.fetchPoliceList()
      this.fetchAuxPoliceList()
      this.fetchMissionList()
      this.fetchContacts()
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
    fetchAuxPoliceList() {
      getMemberList({
        taskCode: this.taskCode,
        memberType: '02'
      }).then(resp => {
        this.auxPoliceList = resp.data
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
    fetchContacts() {
      getDivisionList({
        taskCode: this.taskCode
      }).then(resp => {
        this.contacts = resp.data
      })
    },
    handleDownloadClick() {
      download({
        fileId: '1560087022621745154'
      }).then(res => {
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(res)
        a.href = url
        a.download = '研判通讯录模板.xlsx'
        a.click()
        window.URL.revokeObjectURL(url)
      })
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
        this.fetchPoliceList()
        this.fetchAuxPoliceList()
      })
    },
    handleDialogCancel() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields()
    },
    handleDialogSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.dialogFormModel.taskCode = this.taskCode
          saveMission(this.dialogFormModel).then(resp => {
            this.$message({
              type: 'success',
              message: resp.message
            })

            this.handleDialogCancel()
            this.fetchMissionList()
          })
        }
      })
    },
    handleDivisionCancel() {
      this.divisionFormVisible = false
      this.$refs.divisionForm.resetFields()
    },
    handleDivisionConfirm() {
      const mission = this.missionList.find(item => item.missionId === this.divisionFormModel.missionId)
      const policeList = this.policeList.filter(item => this.divisionFormModel.policeIds.indexOf(item.memberId) >= 0)
      const auxPoliceList = this.auxPoliceList.filter(item => this.divisionFormModel.auxPoliceIds.indexOf(item.memberId) >= 0)

      this.contacts.divisionList.push({
        mission: mission,
        policeList: policeList,
        auxPoliceList: auxPoliceList
      })
      this.handleDivisionCancel()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form, .el-card {
  margin-bottom: 20px;
}

.el-main {
  padding: 0 0 0 20px;
}

.el-upload-container {
  display: inline-block;
}

.el-pull-right {
  float: right;
}
</style>

<style lang="scss">
.el-transfer-panel {
  width: 300px;
}
</style>

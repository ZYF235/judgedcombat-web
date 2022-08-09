<template>
  <div>
    <el-card header="人员分配" shadow="never">
      <el-button type="text" @click="dialogFormVisible = true">添加任务</el-button>

      <el-dialog title="添加任务" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" :model="dialogFormModel" label-width="68px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="actionType" label="行动类型">
                <el-select v-model="dialogFormModel.actionType" placeholder="请选择行动类型">
                  <el-option label="抓捕嫌疑人" value="01"/>
                  <el-option label="其他任务" value="02"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="actionName" label="行动名称">
                <el-input v-model="dialogFormModel.actionName" placeholder="请输入行动名称"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="policeUnit" label="民警单位">
                <el-cascader v-model="dialogFormModel.policeUnit" placeholder="请选择民警单位" :props="unitProps" :options="unitOptions" :show-all-levels="false" @change="fetchUser1"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="policeUser" label="民警">
                <el-cascader v-model="dialogFormModel.policeUser" placeholder="请选择民警" :props="unitProps" :options="userOptions1" :show-all-levels="false"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="auxPoliceUnit" label="辅警单位">
                <el-cascader v-model="dialogFormModel.auxPoliceUnit" placeholder="请选择辅警单位" :props="unitProps" :options="unitOptions" :show-all-levels="false" @change="fetchUser2"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="auxPoliceUser" label="辅警">
                <el-cascader v-model="dialogFormModel.auxPoliceUser" placeholder="请选择辅警" :props="unitProps" :options="userOptions2" :show-all-levels="false"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="handleDialogCancelClick">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirmClick">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="actionType" label="行动类型" width="180">
          <template slot-scope="{row}">
            <span v-if="row.actionType=='01'">抓捕嫌疑人</span>
            <span v-else-if="row.actionType=='02'">其他任务</span>
          </template>
        </el-table-column>
        <el-table-column prop="actionName" label="行动名称" width="180"/>
        <el-table-column prop="policeList" label="民警">
          <template slot-scope="{row}">
            <span>{{ row.policeList.map(value => value.userName).join('、') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="auxPoliceList" label="民警">
          <template slot-scope="{row}">
            <span>{{ row.auxPoliceList.map(value => value.userName).join('、') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="{row}">
            <el-button type="text" @click="tableRow = row;dialogFormVisible = true">添加下级任务</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-button @click="handleSubmitClick">提交</el-button>
      <el-button v-if="stepActive==parseInt(taskStatus)" @click="handleTempSaveClick">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=2">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
import {getNetActionList, saveNetAction} from '@/api/network/wisNetAction'
import {getUserTreeVoList} from '@/api/wisUserInfo'
import {lastItem} from '@/utils'
import {getUnitTreeVoList} from '@/api/wisUnitInfo'

export default {
  name: 'Assign',
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
      dialogFormVisible: false,
      dialogFormModel: {
        actionType: '',
        actionName: '',
        policeUnit: '',
        policeUser: '',
        auxPoliceUnit: '',
        auxPoliceUser: ''
      },
      unitProps: {
        multiple: true,
        checkStrictly: true
      },
      unitOptions: [],
      userOptions1: [],
      userOptions2: [],
      tableRow: undefined,
      tableData: [{
        "id": 1660035610323,
        "taskCode": "S33000020220804001",
        "actionType": "01",
        "actionName": "张三",
        "children": [{
          "id": 1660035653438,
          "taskCode": "S33000020220804001",
          "actionType": "02",
          "actionName": "啦啦啦",
          "children": [],
          "policeList": [{"unitCode": "330300000000", "userCode": "030001", "userName": "毛万燢"}, {"unitCode": "330300000000", "userCode": "030002", "userName": "王茖啣"}],
          "auxPoliceList": [{"unitCode": "330300000000", "userCode": "030003", "userName": "叶閯騫"}, {"unitCode": "330300000000", "userCode": "030005", "userName": "李佌欶"}]
        }],
        "policeList": [{"unitCode": "330100000000", "userCode": "010001", "userName": "罗锚鮩"}, {"unitCode": "330100000000", "userCode": "010002", "userName": "费劗凘"}],
        "auxPoliceList": [{"unitCode": "330100000000", "userCode": "010003", "userName": "金蝢絑"}, {"unitCode": "330100000000", "userCode": "010005", "userName": "汪渎岼"}]
      }, {
        "id": 1660035630754,
        "taskCode": "S33000020220804001",
        "actionType": "01",
        "actionName": "李四",
        "children": [],
        "policeList": [{"unitCode": "330200000000", "userCode": "020001", "userName": "王桐鬹"}, {"unitCode": "330200000000", "userCode": "020002", "userName": "项惆侃"}],
        "auxPoliceList": [{"unitCode": "330200000000", "userCode": "020005", "userName": "张昅厂"}, {"unitCode": "330200000000", "userCode": "020006", "userName": "罗力濲"}]
      }],
      treeProps: {}
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
      this.fetchNetActionList()
      this.fetchUnit()
    }
  },
  methods: {
    fetchNetActionList() {
      getNetActionList({
        taskCode: this.taskCode
      }).then(resp => {
        this.tableData = resp.data
      })
    },
    fetchUnit() {
      getUnitTreeVoList({
        unitCode: ''
      }).then(resp => {
        this.unitOptions = resp.data
      })
    },
    fetchUser1() {
      const policeUnit = this.dialogFormModel.policeUnit
      if (policeUnit instanceof Array) {
        const array = policeUnit.map(value => lastItem(value))

        getUserTreeVoList({
          unitCode: array.join(',')
        }).then(resp => {
          this.userOptions1 = resp.data
        })
      }
    },
    fetchUser2() {
      const auxPoliceUnit = this.dialogFormModel.auxPoliceUnit
      if (auxPoliceUnit instanceof Array) {
        const array = auxPoliceUnit.map(value => lastItem(value))

        getUserTreeVoList({
          unitCode: array.join(',')
        }).then(resp => {
          this.userOptions2 = resp.data
        })
      }
    },
    handleDialogCancelClick() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields()
    },
    handleDialogConfirmClick() {
      const model = this.dialogFormModel
      console.log(model)

      const userMap1 = {}
      this.userOptions1.forEach(unit => {
        unit.children.forEach(user => {
          userMap1[unit.value + '_' + user.value] = user.label
        })
      })

      const userMap2 = {}
      this.userOptions2.forEach(unit => {
        unit.children.forEach(user => {
          userMap2[unit.value + '_' + user.value] = user.label
        })
      })

      const obj = {
        id: Date.now(),
        taskCode: this.taskCode,
        actionType: model.actionType,
        actionName: model.actionName,
        children: [],
        policeList: model.policeUser.map(value => {
          return {
            unitCode: value[0],
            userCode: value[1],
            userName: userMap1[value[0] + '_' + value[1]]
          }
        }),
        auxPoliceList: model.auxPoliceUser.map(value => {
          return {
            unitCode: value[0],
            userCode: value[1],
            userName: userMap2[value[0] + '_' + value[1]]
          }
        })
      }
      console.log(obj)

      if (this.tableRow) {
        this.tableRow.children.push(obj)
      } else {
        this.tableData.push(obj)
      }

      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields()
    },
    handleSubmitClick() {
      saveNetAction({
        taskCode: this.taskCode,
        treeList: this.tableData
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存人员分配成功'
        })
        this.stepActive = 4
        this.taskStatus = '04'
      })
    },
    handleTempSaveClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

.el-input, .el-select, .el-cascader {
  width: 100%;
}
</style>

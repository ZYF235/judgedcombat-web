<template>
  <div>
    <el-card header="各小组行动进程" shadow="never">
      <el-table v-loading="dataLoading" :data="dataList">
        <el-table-column prop="actionName" label="小组"/>
        <el-table-column label="任务查收" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node1" :type="row.node1t" plain @click="handleNodeDetailClick(row.node1)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="前期踩点" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node2" :type="row.node2t" plain @click="handleNodeDetailClick(row.node2)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="到达点位" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node3" :type="row.node3t" plain @click="handleNodeDetailClick(row.node3)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="抓捕结果" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node4" :type="row.node4t" plain @click="handleNodeDetailClick(row.node4)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="现场取证" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node5" :type="row.node5t" plain @click="handleNodeDetailClick(row.node5)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="到达办案区" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node6" :type="row.node6t" plain @click="handleNodeDetailClick(row.node6)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="讯问完毕" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node7" :type="row.node7t" plain @click="handleNodeDetailClick(row.node7)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="采取强制措施" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.node8" :type="row.node8t" plain @click="handleNodeDetailClick(row.node8)">&nbsp;&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="70">
          <template slot-scope="{row}">
            <el-button type="text" @click="dialogFormModel.actionId=row.id; dialogFormVisible=true">添加节点</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加节点" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" :model="dialogFormModel" label-width="68px">
          <el-form-item prop="nodeName" label="节点名称">
            <el-input v-model="dialogFormModel.nodeName" placeholder="请输入节点名称"/>
          </el-form-item>
          <el-form-item prop="nodeDescribe" label="节点描述">
            <el-input v-model="dialogFormModel.nodeDescribe" placeholder="请输入节点名称"/>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="handleDialogCancelClick">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirmClick">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="节点详情" :visible.sync="nodeDetailVisible">
        <el-descriptions :column="1">
          <el-descriptions-item label="节点名称">{{ nodeDetailModel.nodeName }}</el-descriptions-item>
          <el-descriptions-item label="是否完成">{{ nodeDetailModel.isCompleted ? '是' : '否' }}</el-descriptions-item>
          <el-descriptions-item label="节点照片">
            <el-image fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
            <el-image fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
            <el-image fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
          </el-descriptions-item>
          <el-descriptions-item label="节点描述">{{ nodeDetailModel.nodeDescribe }}</el-descriptions-item>
          <el-descriptions-item label="反馈时间">{{ nodeDetailModel.feedbackTime }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import {getActionNodeList, saveActionNode} from '@/api/network/wisNetAction'

export default {
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
      total: 0,
      dataList: [],
      dataLoading: true,
      dialogFormVisible: false,
      dialogFormModel: {
        actionId: '',
        nodeName: '',
        nodeDescribe: ''
      },
      nodeDetailVisible: false,
      nodeDetailModel: {}
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
      this.fetchActionNodeList()
    }
  },
  methods: {
    fetchActionNodeList() {
      getActionNodeList({
        taskCode: this.taskCode
      }).then(resp => {
        const nodeMap = [
          {name: '任务查收', value: 'node1'},
          {name: '前期踩点', value: 'node2'},
          {name: '到达点位', value: 'node3'},
          {name: '抓捕结果', value: 'node4'},
          {name: '现场取证', value: 'node5'},
          {name: '到达办案区', value: 'node6'},
          {name: '讯问完毕', value: 'node7'},
          {name: '采取强制措施', value: 'node8'}
        ]

        this.dataList = resp.data.map(value => {
          const nodeList = value.nodeList || []

          nodeList.forEach(value1 => {
            nodeMap.forEach(node => {
              if (value1.nodeName == node.name) {
                value[node.value] = value1
                value[node.value + 't'] = value1.isCompleted ? 'success' : 'danger'
              }
            })
          })

          return value
        })
        this.dataLoading = false
      })
    },
    handleDialogCancelClick() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields()
    },
    handleDialogConfirmClick() {
      const data = this.dialogFormModel
      data.taskCode = this.taskCode
      console.log(data)

      saveActionNode(data).then(() => {
        this.handleDialogCancelClick()
        this.fetchActionNodeList()
      })
    },
    handleNodeDetailClick(node) {
      this.nodeDetailModel = node
      this.nodeDetailVisible = true
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

.el-button.is-plain {
  width: 100%;
  vertical-align: middle;
}

.el-image {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
</style>

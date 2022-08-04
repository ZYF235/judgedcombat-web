<template>
  <el-form label-width="100px">
    <el-card header="任务基本信息" shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="任务编号">
            <el-input v-model="taskInfo.taskCode" placeholder="请输入任务编号" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务名称">
            <el-input v-model="taskInfo.taskName" placeholder="请输入任务名称"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="任务等级">
            <el-select v-model="taskInfo.taskLevel" placeholder="请选择任务等级">
              <el-option label="A" value="A"/>
              <el-option label="B" value="B"/>
              <el-option label="C" value="C"/>
              <el-option label="D" value="D"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起时间">
            <el-input v-model="taskInfo.launchTime" placeholder="请选择发起时间" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发起单位">
            <el-input v-model="taskInfo.launchUnitName" placeholder="请选择发起单位" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起单位">
            <el-input v-model="taskInfo.launchUserName" placeholder="请选择发起人员" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="研判对象">
            <el-select v-model="taskInfo.researchObject" placeholder="请选择研判对象">
              <el-option value="01" label="线索"/>
              <el-option value="02" label="案件"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止办理时间">
            <el-date-picker v-model="taskInfo.deadlineTime" type="datetime" placeholder="请选择截止办理时间"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card header="线索基本信息" shadow="never">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="线索类型">
            <el-select v-model="clueInfo.clueType" placeholder="请选择线索类型">
              <el-option value="01" label="惊雷线索"/>
              <el-option value="02" label="本地线索"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="线索编号">
            <el-input v-model="clueInfo.clueCode" placeholder="请输入线索编号" :disabled="clueInfo.clueType=='02'" @change="fetchClueInfo"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="线索名称">
            <el-input v-model="clueInfo.clueName" placeholder="请输入线索名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="线索等级">
            <el-select v-model="clueInfo.clueLevel" placeholder="请选择线索等级">
              <el-option label="A" value="A"/>
              <el-option label="B" value="B"/>
              <el-option label="C" value="C"/>
              <el-option label="D" value="D"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="线索来源">
            <el-select v-model="clueInfo.clueSource" placeholder="请选择线索来源" @change="fetchClueSourceDetail">
              <el-option v-for="item in options.clueSource" :key="item.dicId" :value="item.dicId" :label="item.name"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="线索来源详情">
            <el-select v-model="clueInfo.clueSourceDetail" placeholder="请选择线索来源详情">
              <el-option v-for="item in options.clueSourceDetail" :key="item.dicId" :value="item.dicId" :label="item.name"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="线索详情">
            <el-input v-model="clueInfo.clueDetail" type="textarea"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="涉及领域">
            <el-select v-model="clueInfo.involveDomain" placeholder="请选择涉及领域" @change="fetchInvolveAccusation">
              <el-option v-for="item in options.involveDomain" :key="item.dicId" :value="item.dicId" :label="item.name"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="涉及罪名">
            <el-select v-model="clueInfo.involveAccusation" placeholder="请选择涉及罪名">
              <el-option v-for="item in options.involveAccusation" :key="item.dicId" :value="item.dicId" :label="item.name"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="涉及地">
            <el-table :data="clueInfo.clueRegions" border fit highlight-current-row>
              <el-table-column label="省" width="200">
                <template slot-scope="{row}">
                  <el-select v-model="row.provinceId" placeholder="请选择省">
                    <el-option v-for="item in filterDivisionList(null, 0)" :key="item.jlId" :value="item.jlId" :label="item.name"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="市" width="200">
                <template slot-scope="{row}">
                  <el-select v-model="row.cityId" placeholder="请选择市">
                    <el-option v-for="item in filterDivisionList(row.provinceId, 1)" :key="item.jlId" :value="item.jlId" :label="item.name"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="区（县）" width="200">
                <template slot-scope="{row}">
                  <el-select v-model="row.districtId" placeholder="请选择区（县）">
                    <el-option v-for="item in filterDivisionList(row.cityId, 2)" :key="item.jlId" :value="item.jlId" :label="item.name"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="{row, column, $index}">
                  <el-link v-for="item in row.fileList" :key="item.name" :href="item.fileUrl" type="primary" target="_blank">{{ item.fileName }}</el-link>
                  <el-upload action="" :show-file-list="false" :http-request="(data)=>handleUploadFile(data,$index)">
                    <el-button icon="el-icon-upload" size="mini" plain>上传</el-button>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="50">
                <template slot="header">
                  <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="clueInfo.clueRegions.push({})"/>
                </template>
                <template slot-scope="{row, column, $index}">
                  <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="clueInfo.clueRegions.splice($index,1)"/>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="线索要素">
            <el-table :data="clueInfo.clueElements" border fit highlight-current-row>
              <el-table-column label="要素类型" width="200">
                <template slot-scope="{row}">
                  <el-select v-model="row.elementType" placeholder="请选择要素类型">
                    <el-option v-for="item in options.clueElementType" :key="item.dicId" :value="item.dicId" :label="item.name"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="要素说明">
                <template slot-scope="{row}">
                  <el-input v-model="row.elementDescription" placeholder="请输入要素说明"/>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="50">
                <template slot="header">
                  <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="clueInfo.clueElements.push({})"/>
                </template>
                <template slot-scope="{row, column, $index}">
                  <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="clueInfo.clueElements.splice($index,1)"/>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-row>
      <el-button type="primary" @click="fnSubmitTask">提交</el-button>
      <el-button @click="fnTempSaveTask">暂存</el-button>
      <el-button v-if="stepActive<parseInt(taskStatus)" @click="stepActive=2">下一步</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {parseTime} from '@/utils'
import {getClueElementType, getClueInfo, getClueSource, getClueSourceDetail, getDivisionList, getInvolveAccusation, getInvolveDomain, uploadClueFile} from '@/api/wisResClue'
import {getTask, submitTask, tempSaveTask} from '@/api/wisResTask'

export default {
  name: 'Initiate',
  props: {
    user: {
      required: true,
      type: Object
    },
    active: {
      required: true,
      type: Number
    },
    status: {
      required: true,
      type: String
    },
    taskType: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      taskInfo: {
        taskCode: '',
        taskName: '测试任务' + parseTime(new Date(), '{h}{i}{s}'),
        taskLevel: 'A',
        launchUnitCode: '',
        launchUnitName: '',
        launchUserCode: '',
        launchUserName: '',
        launchTime: parseTime(new Date()),
        deadlineTime: '',
        researchObject: '01'
      },
      clueInfo: {
        clueType: '02',
        clueCode: '',
        clueName: '测试线索' + parseTime(new Date(), '{h}{i}{s}'),
        clueLevel: '',
        clueDetail: '测试线索' + parseTime(new Date(), '{h}{i}{s}'),
        clueSource: '',
        clueSourceDetail: '',
        involveDomain: '',
        involveAccusation: '',
        clueRegions: [{}],
        clueElements: [{}]
      },
      options: {
        clueSource: [],
        clueSourceDetail: [],
        involveDomain: [],
        involveAccusation: [],
        divisionList: [],
        clueElementType: []
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
  watch: {
    user(data) {
      if (!this.taskCode) {
        this.stepActive = 1
        this.taskStatus = '01'

        this.taskInfo.launchUnitCode = data.unitCode
        this.taskInfo.launchUserCode = data.userCode
        this.taskInfo.launchUserName = data.userName
      }
    }
  },
  created() {
    this.taskCode = this.$route.params && this.$route.params.taskCode
    if (this.taskCode) {
      this.fetchTaskInfo()
    }

    this.fetchClueSource()
    this.fetchInvolveDomain()
    this.fetchDivisionList()
    this.fetchClueElementType()
  },
  methods: {
    fetchTaskInfo() {
      getTask({
        taskCode: this.taskCode
      }).then(resp => {
        const data = resp.data

        if (data) {
          this.taskInfo = data

          this.taskStatus = data.taskStatus
          this.stepActive = parseInt(data.taskStatus)

          const clueInfo = data.clueInfo
          this.clueInfo = clueInfo

          this.fetchClueSourceDetail(clueInfo.clueSource)
          this.fetchInvolveAccusation(clueInfo.involveDomain)
        }
      })
    },
    fetchClueInfo(data) {
      if (this.clueInfo.clueType == '01') {
        getClueInfo(data).then(resp => {
          this.clueInfo = resp.data
        })
      }
    },
    fetchClueSource() {
      getClueSource().then(resp => {
        this.options.clueSource = resp.data
      })
    },
    fetchClueSourceDetail(data) {
      getClueSourceDetail(data).then(resp => {
        this.options.clueSourceDetail = resp.data
      })
    },
    fetchInvolveDomain() {
      getInvolveDomain().then(resp => {
        this.options.involveDomain = resp.data
      })
    },
    fetchInvolveAccusation(data) {
      getInvolveAccusation(data).then(resp => {
        this.options.involveAccusation = resp.data
      })
    },
    fetchDivisionList() {
      getDivisionList('').then(resp => {
        this.options.divisionList = resp.data
      })
    },
    filterDivisionList(prevId, level) {
      return this.options.divisionList.filter(item => item.prevId == prevId && item.level == level)
    },
    fetchClueElementType() {
      getClueElementType().then(resp => {
        this.options.clueElementType = resp.data
      })
    },
    handleUploadFile(data, index) {
      const file = data.file
      const clueCode = this.clueInfo.clueCode

      const formData = new FormData()
      formData.set('file', file)
      formData.set('clueCode', clueCode)

      uploadClueFile(formData).then(resp => {
        this.$message({
          type: 'success',
          message: resp.message
        })
        if (this.clueInfo.clueRegions[index].fileList instanceof Array) {
          this.clueInfo.clueRegions[index].fileList.push({
            fileName: file.name,
            fileUrl: resp.data
          })
        } else {
          this.clueInfo.clueRegions[index].fileList = [{
            fileName: file.name,
            fileUrl: resp.data
          }]
        }
      })
    },
    fetchFormData() {
      const taskInfo = this.taskInfo
      const clueInfo = this.clueInfo

      if (taskInfo.deadlineTime instanceof Date) {
        taskInfo.deadlineTime = parseTime(taskInfo.deadlineTime)
      }

      if (taskInfo.researchObject == '01') {
        taskInfo.researchCode = clueInfo.clueCode
      }

      taskInfo.taskType = this.taskType
      taskInfo.clueInfo = clueInfo
      console.log(taskInfo)
      return taskInfo
    },
    fnSubmitTask() {
      const formData = this.fetchFormData()

      submitTask(formData).then(() => {
        this.$message({
          type: 'success',
          message: '提交研判令成功'
        })
        this.stepActive = 2
        this.taskStatus = '02'
      })
    },
    fnTempSaveTask() {
      const formData = this.fetchFormData()

      tempSaveTask(formData).then(() => {
        this.$message({
          type: 'success',
          message: '暂存研判令成功'
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

.el-input, .el-select, .el-cascader, .el-date-picker {
  width: 100%;
}
</style>

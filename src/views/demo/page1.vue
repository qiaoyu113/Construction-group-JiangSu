<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">弹出框模板</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRules" ref="ruleForm" @submit.native.prevent label-width="110px">
      <el-card shadow="never">
        <div slot="header">
          <t-sub-title :title="'弹出框'"></t-sub-title>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目选择" prop="projectId">
                <t-project-select placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject"></t-project-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人" prop="userId">
                <t-handler-select label="经办人" placeholder="选择一个经办人" v-model="dataForm.userId" @selectedUser="getSelectedUser"></t-handler-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联营公司名称" prop="companyId">
                <t-partner-select placeholder="选择一个联营公司" v-model="dataForm.companyId" @selectedPartner="getSelectedPartner"></t-partner-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="主要负责人" prop="mainPid">
                <t-maincharge-select placeholder="选择一个主要负责人" v-model="dataForm.mainPid" @selectedMainCharge="getSelectedMainCharge"></t-maincharge-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备案项目" prop="recordId">
                <t-record-select placeholder="选择一个备案项目" v-model="dataForm.recordId" @selectedRecord="getSelectedRecord"></t-record-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目经理" prop="managerId">
                <t-manager-select placeholder="选择一个项目经理" v-model="dataForm.managerId" @selectedManager="getSelectedManager"></t-manager-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div style="float: right;margin-right: 12px;">
        <el-button type="primary" @click="consoleData()">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
	import util from '@/util'
	import moment from 'moment'
	import baseView from '@/base/baseView'

	export default {
		extends: baseView,
		data() {
			return {
				readOnly: false,
				dataForm: {
          projectId: '',
          userId: '',
          companyId: '',
          mainPid: '',
          managerId: '',
          recordId: ''
        },
        dataRules: {
          projectId: [
            {required: true, message: '项目id不能为空', trigger: 'change'},
          ],
          userId: [
            {required: true, message: '用户不能为空', trigger: 'change'},
          ],
          companyId: [
            {required: true, message: '公司不能为空', trigger: 'change'},
          ],
          mainPid: [
            {required: true, message: '负责人不能为空', trigger: 'change'},
          ],
          managerId: [
            {required: true, message: '项目经理不能为空', trigger: 'change'},
          ],
          recordId: [
            {required: true, message: '备案项目不能为空', trigger: 'change'},
          ],
        }
			}
		},
		components: {},
		created() {},
		watch: {},
		activated() {
			this.$nextTick(() => {})
		},
		computed: {},
		methods: {
      getSelectedProject(project) {
          console.log('current project', project)
        // project为从弹窗框列表带出来的那一行的数据
        // 项目 id 已从从组件里已经带出来，这里定义为 dataForm.projectId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的项目的值，从这里的project获取
        // 例如 this.dataForm.proCode = project.proCode
      },
      getSelectedUser(user) {
        console.log('current user', user)
        // user为从弹窗框列表带出来的那一行的数据
        // 用户id 已从从组件里已经带出来，这里定义为 dataForm.userId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的user的其他值，从这里的user获取
        // 例如 this.dataForm.id = user.id
      },
      getSelectedPartner(company) {
        console.log('current company', company)
        // company为从弹窗框列表带出来的那一行的数据
        // 公司id 已从从组件里已经带出来，这里定义为 dataForm.companyId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的company的其他值，从这里的company获取
        // 例如 this.dataForm.creditCode = company.creditCode
      },
      getSelectedMainCharge(charge) {
        console.log('current charge', charge)
        // charge为从弹窗框列表带出来的那一行的数据
        // 主要负责人id 已从从组件里已经带出来，这里定义为 dataForm.mainPid，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的charge的其他值，从这里的charge获取
        // 例如 this.dataForm.id = charge.id
      },
      getSelectedManager(manager) {
        console.log('current manager', manager)
        // manager为从弹窗框列表带出来的那一行的数据
        // 项目经理id 已从从组件里已经带出来，这里定义为 dataForm.managerId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的manager的其他值，从这里的manager获取
        // 例如 this.dataForm.id = manager.id
      },
      getSelectedRecord(record) {
        console.log('current record', record)
        // record为从弹窗框列表带出来的那一行的数据
        // 备案项目id 已从从组件里已经带出来，这里定义为 dataForm.recordId，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的record的其他值，从这里的record获取
        // 例如 this.dataForm.id = record.id
      },
			consoleData() {
        console.log('dataForm', this.dataForm)
        console.log('self.$refs', this.$refs)
        console.log(this.$refs['ruleForm'].validate())
      }
		}
	}
</script>

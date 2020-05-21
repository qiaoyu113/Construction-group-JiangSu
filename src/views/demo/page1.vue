<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">弹出框模板</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRules" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="110px">
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
          companyId: ''
        },
        dataRules: {
          projectId: [
            {required: true, message: '项目id不能为空', trigger: 'change'},
          ],
          userId: [
            {required: true, message: '用户id不能为空', trigger: 'blur'},
          ],
          companyId: [
            {required: true, message: '公司id不能为空', trigger: 'blur'},
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
			consoleData() {
        console.log('dataForm', this.dataForm)
        console.log('self.$refs', this.$refs)
        console.log(this.$refs['ruleForm'].validate())
      }
		}
	}
</script>

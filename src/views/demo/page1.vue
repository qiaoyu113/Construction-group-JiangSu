<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">弹出框模板</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px">
      <el-card shadow="never">
        <div slot="header">
          <t-sub-title :title="'弹出框'"></t-sub-title>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col :span="8">
              <t-project-select label="项目选择" placeholder="选择一个项目" v-model="dataForm.projectId" @selectedProject="getSelectedProject"></t-project-select>
            </el-col>
            <el-col :span="8">
              <t-handler-select label="经办人" placeholder="选择一个经办人" v-model="dataForm.userId" @selectedUser="getSelectedUser"></t-handler-select>
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
          userId: ''
				},
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
        // 用户id 已从从组件里已经带出来，这里定义为 dataForm.id，可以自行修改为当前传到接口的变量名
        // 实际上需要传到接口的的user的其他值，从这里的user获取
        // 例如 this.dataForm.id = user.id
      },
			consoleData() {
        console.log('dataForm', this.dataForm)
      }
		}
	}
</script>

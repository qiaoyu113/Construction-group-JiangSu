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
          <t-project-select label="项目选择" placeholder="选择一个项目" v-model="dataForm.proName" @selectedProject="getSelectedProject"></t-project-select>
          <t-handler-select label="经办人" placeholder="选择一个经办人" v-model="dataForm.name" @selectedUser="getSelectedUser"></t-handler-select>
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
          proName: '',
          proCode: '',
          
          name: '',
          id: ''
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
        // dataForm.proName是页面上展示的值，实际上需要传到接口的项目的值，从这里的project获取
        // 例如 this.dataForm.proCode = project.proCode
      },
      getSelectedUser(user) {
        console.log('current user', user)
        // user为从弹窗框列表带出来的那一行的数据
        // dataForm.name是页面上展示的值，实际上需要传到接口的项目的值，从这里的user获取
        // 例如 this.dataForm.id = user.id
      },
			consoleData() {
        console.log('dataForm', this.dataForm)
      }
		}
	}
</script>

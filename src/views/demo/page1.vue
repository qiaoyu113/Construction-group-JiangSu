<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">弹出框模板</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" ref="ruleForm" @submit.native.prevent @keyup.enter.native="doSave()" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="切换只读">
            <el-switch v-model="readOnly"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-card shadow="never">
        <div slot="header">
          <t-sub-title :title="'弹出框'"></t-sub-title>
        </div>
        <div>
          <t-project-select label="项目选择" v-model="dataForm.proName" @selectProject="getSelectProject"></t-project-select>
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
          proCode: ''
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
      getSelectProject(project) {
        console.log('current project', project)
        // project为从弹窗框列表带出来的那一行的数据
        // dataForm.proName是页面上展示的值，实际上需要传到接口的项目的值，从这里的project获取
        // 例如 this.dataForm.proCode = project.proCode
      },
			consoleData() {
        console.log('dataForm', this.dataForm)
      }
		}
	}
</script>

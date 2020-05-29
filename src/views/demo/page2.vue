<template>
  <div>
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">地区下拉框</div>
      </el-col>
    </el-row>
    <el-form :model="dataForm" :rules="dataRules" ref="ruleForm" @submit.native.prevent label-width="110px">
      <el-card shadow="never">
        <div slot="header">
          <t-sub-title :title="'地区下拉框'"></t-sub-title>
        </div>
        <div>
          <el-row :gutter="0">
            <el-col :span="16">
              <el-form-item label="所属地区" prop="region" class="is-required">
                <!-- v-model 请绑定当前页面的对应值 -->
                <t-region-picker :province.sync="dataForm.province" :city.sync="dataForm.city" :district.sync="dataForm.district"  :readOnly="readOnly"></t-region-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属地区" prop="region" class="is-required">
                <!-- v-model 请绑定当前页面的对应值 -->
                <t-region-s-picker :province.sync="dataForm.province1" :city.sync="dataForm.city1" :readOnly="readOnly"></t-region-s-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别-下拉-单选" prop="sexId" class="is-required">
                <t-dic-dropdown-select dicType="public_sex" v-model="dataForm.sexId" :readOnly="readOnly"></t-dic-dropdown-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-button type="primary" @click="doSave()">保存</el-button>
      </el-card>
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
          province: '',
          city: '',
          province1: '',
          city1: '',
          district: '',
          sexId: ''
        },
        dataRules: {

        }
			}
		},
		components: {},
		created() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.dataForm = this.$util.deepObjectAssign({}, this.dataForm, {
            province: '我的天',
            city: '我的地',
            province1: '我的天1',
            city1: '我的地1',
            district: '我的家',
            sexId: 'public_sex_m'
          })
        })
      }, 5000)
    },
		watch: {},
		activated() {
			this.$nextTick(() => {})
		},
		computed: {},
		methods: {
      doSave () {
        let self = this
        let selfValidPromise = self.$refs['ruleForm'].validate()

        Promise.all([selfValidPromise]).then(resultList => {

            let model = { ...self.dataForm }
            console.log('model', model)
          }).catch(function (e) {
          self.$notify.error({
            title: '错误',
            message: '系统输入验证失败！'
          })
          return false
        })
      },
		}
	}
</script>

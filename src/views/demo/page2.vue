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
          district: '',
        },
        dataRules: {

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
      getProvince (province) {
        console.log('province', province)
        // 赋值给实际页面的值
        this.dataForm.province = province
      },
      getCity (city) {
        console.log('city', city)
        // 赋值给实际页面的值
        this.dataForm.city = city
      },
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

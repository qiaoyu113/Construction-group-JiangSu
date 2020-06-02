<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥信息更新列表</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="所属地区：" prop="region">
              <!--<t-region-picker ref="region" v-model="gridOptions.dataSource.serviceInstanceInputParameters.province"
                               @province="getProvince" @city="getCity" :required="false"></t-region-picker>-->
              <t-region-s-picker :province.sync="gridOptions.dataSource.serviceInstanceInputParameters.province"
                                 :city.sync="gridOptions.dataSource.serviceInstanceInputParameters.city"
                                 :required="false"></t-region-s-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="密钥类别：" prop="keyType">
              <t-dic-dropdown-select dicType="key_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="申请时间：" prop="dateRange2">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange2"
                                       @change="onStartApplyforDateChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="有效截止日：" prop="dateRange1">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange1"
                                       @change="onStartExpirationDateChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>


        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary" icon="el-icon-circle-close" @click="doReset()">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
    </el-card>
    <el-card shadow="never">
      <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
      </t-grid>
    </el-card>
  </div>
</template>
<script>
  import baseView from '@/base/baseView'
  import util from '@/util'

  export default {
    name: 'myTask',
    extends: baseView,
    props: {
      readOnly: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data() {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBaseinfoKeyApproval.getPagedList,
            serviceInstanceInputParameters: {
              keyType: null,
              province: null,
              city: null,
              dateRange1: '',
              dateRange2: ''
            }
          },
          grid: {
            offsetHeight: 125, // 125:查询部分高度
            mutiSelect: false,
            operates: {
              width: 60,
              fixed: 'left',
              list: [{
                type: 'text',
                show: true,
                label: '查看',
                method: this.doEdit
              }]
            }, // 列操作按钮
            columns: [
              {
                prop: 'province',
                label: '所属地区',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.getProvinceCityName(row.province, row.city)
                }
              },
              {
                prop: 'keyType',
                label: '密钥类别',
                sortable: false,
                width: '100px',
                formatter: (row, column, cellValue) => {
                  return util.dataDicFormat('key_type', row.keyType) // 第一个参数为字典类型值，复用替换字典类型值，第二个为当前cell值
                }
              },
              {
                prop: 'authCompany',
                label: '批准单位',
                sortable: false
              },
              {
                prop: 'loginUsername',
                label: '登陆网名',
                sortable: false
              },
              {
                prop: 'loginUrl',
                label: '登陆网址',
                sortable: false
              },
              {
                prop: 'expirationDate',
                label: '有效期至',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.expirationDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'useScenes',
                label: '用途',
                sortable: false
              },
              {
                prop: 'applyforDate',
                label: '申请时间',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.applyforDate, 'YYYY-MM-DD')
                }
              },
              {
                prop: 'sign',
                label: '登记人',
                sortable: false
              },
              {
                prop: 'signTime',
                label: '登记时间',
                sortable: false,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD')
                }
              }
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'descending'
            }
          }
        }
      }
    },
    components: {},
    created() {
      this.loadCodeTableList()
    },
    methods: {
      // 获取码表值
      loadCodeTableList() {
        // 以下为示例
      },
      onStartDateRangeChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1]
      },
      handleSelectionChange(val) {
        this.checkededRows = val
      },

      doReset() {
        this.$refs.search.resetFields()
        this.gridOptions.dataSource.serviceInstanceInputParameters = {}
        this.doRefresh()
      },
      onStartExpirationDateChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.expirationDateStart = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.expirationDateEnd = val[1]
      },
      onStartApplyforDateChanged(val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.applyforDateStart = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.applyforDateEnd = val[1]
      },
      doExportExcel() {
        // eslint-disable-next-line no-template-curly-in-string
        this.$refs.searchReulstList.exportCSV('密钥信息更新列表')
      },
      doRefresh() {
        this.$refs.searchReulstList.refresh()
      },
      getProvince(province) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.province = province
      },
      getCity(city) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.city = city
      },
      doEdit(key, row) {
        let tpath = '/jcxxsubsystem/keyManage/keyAdd?id=' + row.id

        this.$router.push({
          path: tpath
        })
      }
    }
  }
</script>


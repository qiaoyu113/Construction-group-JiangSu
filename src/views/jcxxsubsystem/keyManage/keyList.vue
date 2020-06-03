<template>
  <div class="mod-role">
    <el-row :gutter="20" class="page-title">
      <el-col>
        <div class="title">密钥列表</div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="search-top-operate">
      <el-button class="demo-button" type="primary" plain icon="el-icon-download" @click="doExportExcel()">导出
      </el-button>
    </el-row>
    <el-card shadow="never">
      <t-form ref="search" @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px"
              :model="gridOptions.dataSource.serviceInstanceInputParameters">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="所属地区：" prop="region">
              <t-region-s-picker :province.sync="gridOptions.dataSource.serviceInstanceInputParameters.province"
                                 :city.sync="gridOptions.dataSource.serviceInstanceInputParameters.city"
                                 :required="false"></t-region-s-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="密钥类别：">
              <t-dic-dropdown-select dicType="key_type"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyType"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="申请时间：" prop="dateRange">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange"
                                       @change="onStartApplyforDateChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="办理单位：">
              <el-input v-model="gridOptions.dataSource.serviceInstanceInputParameters.authCompany"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密钥状态：">
              <t-dic-dropdown-select dicType="key_status"
                                     v-model="gridOptions.dataSource.serviceInstanceInputParameters.keyStatus"
                                     :readOnly="readOnly"></t-dic-dropdown-select>
            </el-form-item>
          </el-col>

          <el-col :span="8" class="search-date-picker">
            <el-form-item label="有效截止日：" prop="dateRange1">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange1"
                                       @change="onStartExpirationDateChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="经办人：" prop="signId">
              <t-handler-select placeholder="选择一个经办人" v-model="name" @selectedUser="getSelectedUser"></t-handler-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="经办日期：" prop="dateRange2">
              <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange2"
                                       @change="onStartSignTimeChanged">
              </t-datetime-range-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary" icon="el-icon-circle-close" @click="doReset">清空</el-button>
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
    extends: baseView,
    data () {
      return {
        checkededRows: [],
        processDefinationlist: [],
        startDateRange: null,
        name: '',
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.tBaseinfoKeyApproval.getPagedList,
            serviceInstanceInputParameters: {
              sign: null,
              keyType: null,
              province: null,
              city: null,
              authCompany: null,
              keyStatus: null,
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
                prop: '',
                label: '办理单位',
                sortable: false
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
                prop: 'keyStatus',
                label: '密钥状态',
                sortable: false
              },
              {
                prop: '',
                label: '领用单位',
                sortable: false,
                emptyText: '-'
              },
              {
                prop: '',
                label: '领用日期',
                sortable: false,
                emptyText: '-'
              },
              {
                prop: '',
                label: '归还日期',
                sortable: false,
                emptyText: '-'
              },
              {
                prop: 'sign',
                label: '经办人',
                sortable: false
              },
              {
                prop: 'signTime',
                label: '经办时间',
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
    created () {
      this.loadCodeTableList()
    },
    methods: {
      getSelectedUser (user) {
        console.log('current user', user)
        this.gridOptions.dataSource.serviceInstanceInputParameters.signId = user.id

      },
      // 获取码表值
      loadCodeTableList () {
        // 以下为示例
      },
      onStartExpirationDateChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.expirationDateStart = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.expirationDateEnd = val[1]
      },
      onStartSignTimeChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.signTimeStart = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.signTimeEnd = val[1]
      },
      onStartApplyforDateChanged (val) {
        this.gridOptions.dataSource.serviceInstanceInputParameters.applyforDateStart = val[0]
        this.gridOptions.dataSource.serviceInstanceInputParameters.applyforDateEnd = val[1]
      },
      handleSelectionChange (val) {
        this.checkededRows = val
      },
      doReset () {
        this.$refs.search.resetFields()
        this.gridOptions.dataSource.serviceInstanceInputParameters = {
          signId: null,
          keyType: null,
          province: null,
          city: null,
          authCompany: null,
          keyStatus: null,
          dateRange1: '',
          dateRange2: ''
        }
        this.doRefresh()
      },
      doExportExcel () {
        // eslint-disable-next-line no-template-curly-in-string
        this.$refs.searchReulstList.exportCSV('密钥列表')
      },
      doRefresh () {
        this.$refs.searchReulstList.refresh()
      },
      doEdit (key, row) {
        let tpath = ''
        // 根据秘钥领用状态，跳转到不同页面
        if (row.keyStatus === 'can_recipients') { // 可领用
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        } else if (row.keyStatus === 'pending_approval') { // 领用审批中
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        } else if (row.keyStatus === 'process_approval') { // 办理审批中
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        } else if (row.keyStatus === 'recipients') { // 领用中
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        } else if (row.keyStatus === 'return_approval') { // 归还审批中
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        } else {
          tpath = '/tbglsubsystem/TBidPckeyApproval/TBidPckeyApprovalAdd?id=' + row.id
        }
        // this.$router.replace({
        //   path: tpath
        // })
        util.closeCurrentTabNav('TBidPckeyApprovalAdd')
      }
    }
  }
</script>


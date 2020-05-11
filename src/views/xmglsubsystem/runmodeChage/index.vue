<template>
    <div class="mod-role">
        <t-form ref="search"  @submit.native.prevent @keyup.enter.native="doRefresh()" label-width="100px">
            <el-row :gutter="10" class="search-top-operate">
                <el-button  icon="el-icon-download" type="success" @click="doExportExcel()">
                    <i class="fa fa-lg fa-level-down"></i>导出
                </el-button>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="选择关键字">
                        <el-select placeholder="请选择" v-model="gridOptions.dataSource.serviceInstanceInputParameters.processDefinationKey" clearable>
                            <el-option v-for="(item, index) in processDefinationlist" :key='item.key' :label="item.name" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="search-date-picker">
                    <el-form-item label="创建时间">
                        <t-datetime-range-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.dateRange" @change="onStartDateRangeChanged">
                        </t-datetime-range-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="关键字">
                        <el-input  @submit.native.prevent @keyup.enter.native="doRefresh()" v-model="gridOptions.dataSource.serviceInstanceInputParameters.searchKey" placeholder="单据描述" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
                <el-col :span="12">
                    <el-form-item>
                        <el-button  @click="doRefresh()" type="primary" icon="el-icon-search">查询</el-button>
                        <el-button  icon="el-icon-download" @click="doReset()">
                            <i class="fa fa-lg fa-level-down"></i>清空
                        </el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </t-form>
        <t-grid ref="searchReulstList" :options="gridOptions" @selection-change="handleSelectionChange">
        </t-grid>
    </div>
</template>
<script>
    import baseView from '@/base/baseView'
    export default {
        name: 'myTask',
        extends: baseView,
        data() {
            return {
                checkededRows: [],
                processDefinationlist: [],
                startDateRange: null,
                gridOptions: {
                    dataSource: {
                        serviceInstance: tapp.services.proRunmodeChageApproval.getPagedList,
                        serviceInstanceInputParameters: {
                            searchKey: null,
                            processDefinationKey: null,
                            dateRange: ''
                        }
                    },
                    grid: {
                        offsetHeight: 125, //125:查询部分高度
                        mutiSelect: false,
                        columns: [
                                                                                                                                                                                                    {
                                            prop: 'bId',
                                            label: '业务id用于和一个流程实例绑定',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'actTaskKey',
                                            label: 'activiti执行任务key',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'pId',
                                            label: '项目id',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proRunModeO',
                                            label: '原经营方式（字典表）',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proProfitRateO',
                                            label: '原项目净利润承诺超-%',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompanyMerateO',
                                            label: '原联营单位管理费-%',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompanyO',
                                            label: '原联营公司名称',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proContacterO',
                                            label: '原自营方联系人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompanyContacterO',
                                            label: '原联营公司负责人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proContactwayO',
                                            label: '原联营公司联系方式',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conSelfRateO',
                                            label: '原自营分配率',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conUnionCompanyRateO',
                                            label: '原联营分配率',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conDepositO',
                                            label: '原合同履约保证金',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conPorjectFund',
                                            label: '待确认工程款',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proRunMode',
                                            label: '经营方式（字典表）',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proProfitRate',
                                            label: '项目净利润承诺超-%',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompanyMerate',
                                            label: '联营单位管理费-%',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompany',
                                            label: '联营公司名称',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proContacter',
                                            label: '自营方联系人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proUnionCompanyContacter',
                                            label: '联营公司负责人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'proContactway',
                                            label: '联营公司联系方式',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conSelfRate',
                                            label: '自营分配率',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conUnionCompanyRate',
                                            label: '联营分配率',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'conDeposit',
                                            label: '合同履约保证金',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'approvalStatus',
                                            label: '审批状态（字典表）',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'reason',
                                            label: '变更原因',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'sign',
                                            label: '执行人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'signTime',
                                            label: '执行时间',
                                            sortable: true,
                                            formatter: (row, column, cellValue) => {
                                                return this.$util.dateFormat(row.signTime, 'YYYY-MM-DD');
                                            }
                                        },
                                                                                                                                                                                                            {
                                            prop: 'propose',
                                            label: '审核意见',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'result',
                                            label: '审核结果',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'createtime',
                                            label: '创建时间',
                                            sortable: true,
                                            formatter: (row, column, cellValue) => {
                                                return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
                                            }
                                        },
                                                                                                                                                                                                            {
                                            prop: 'updatetime',
                                            label: '更新时间',
                                            sortable: true,
                                            formatter: (row, column, cellValue) => {
                                                return this.$util.dateFormat(row.updatetime, 'YYYY-MM-DD');
                                            }
                                        },
                                                                                                                                                                                                            {
                                            prop: 'createuser',
                                            label: '创建人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'updateuser',
                                            label: '更新人',
                                            sortable: true
                                        },
                                                                                                                                                                                                            {
                                            prop: 'datastatus',
                                            label: '数据有效性 1有效 0无效',
                                            sortable: true
                                        },
                                                                                                                        ], // 需要展示的列
                        defaultSort: {
                            prop: 'id',
                            order: 'descending'
                        },
                    }
                }
            }
        },
        components: {},
        created() {
            this.loadCodeTableList();
        },
        methods: {
            // 获取码表值
            loadCodeTableList() {
                // 以下为示例
                                                                            },
            onStartDateRangeChanged(val) {
                this.gridOptions.dataSource.serviceInstanceInputParameters.startDateBegin = val[0];
                this.gridOptions.dataSource.serviceInstanceInputParameters.startDateEnd = val[1];
            },
            handleSelectionChange(val) {
                this.checkededRows = val;
            },
            doReset() {
                this.$refs.search.resetFields();
            },
            doExportExcel() {
                this.$refs.searchReulstList.exportCSV('${comments}表');
            },
            doRefresh() {
                this.$refs.searchReulstList.refresh();
            }
        }
    }
</script>


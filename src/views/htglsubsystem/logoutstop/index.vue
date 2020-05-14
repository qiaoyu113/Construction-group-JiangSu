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
                            <i class="el-icon-delete"></i>清空
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
                        serviceInstance: tapp.services.tContCancelLog.getPagedList,
                        serviceInstanceInputParameters: {
                            searchKey: null,
                            processDefinationKey: null,
                            dateRange: ''
                        }
                    },
                    grid: {
                        offsetHeight: 125, //125:查询部分高度
                        mutiSelect: false,
                        fit: true, // 列的宽度是否自撑开
                        columns: [
                                                                                                                                                                                                    {
                                            prop: 'cId',
                                            label: '合同id',
                                            sortable: true,
                                            minWidth: 120,
                                        },
                                                                                                                                                                                                            {
                                            prop: 'opType',
                                            label: '操作类型（字典表）',
                                            sortable: true,
                                            minWidth: 120,
                                        },
                                                                                                                                                                                                            {
                                            prop: 'cType',
                                            label: '合同类型（字典表）',
                                            sortable: true,
                                            minWidth: 120,
                                        },
                                                                                                                                                                                                            {
                                            prop: 'createtime',
                                            label: '创建时间',
                                            sortable: true,
                                            minWidth: 120,
                                            formatter: (row, column, cellValue) => {
                                                return this.$util.dateFormat(row.createtime, 'YYYY-MM-DD');
                                            }
                                        },
                                                                                                                                                                                                            {
                                            prop: 'createuser',
                                            label: '创建人',
                                            sortable: true,
                                            minWidth: 120,
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


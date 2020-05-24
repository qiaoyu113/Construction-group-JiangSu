<template>
  <div class="mod-role">
    <el-card shadow="never">
      <t-form
        ref="search"
        @submit.native.prevent
        @keyup.enter.native="doRefresh()"
        label-width="100px"
      >
        <el-row :gutter="10" class="search-top-operate">
          <el-button
            type="primary"
            class="demo-button"
            plain
            icon="el-icon-download"
            @click="doExportExcel()"
          >导出</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="所属分公司：">
              <el-input
                @submit.native.prevent
                @keyup.enter.native="doRefresh()"
                v-model="gridOptions.dataSource.serviceInstanceInputParameters.proSubCompany"
                placeholder="所属分公司"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search-date-picker">
            <el-form-item label="项目名称：">
              <el-input
                @submit.native.prevent
                @keyup.enter.native="doRefresh()"
                v-model="gridOptions.dataSource.serviceInstanceInputParameters.proName"
                placeholder="项目名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" :span="8" justify="end" class="search-bottom-operate">
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" plain icon="el-icon-search" @click="doRefresh()">查询</el-button>
              <el-button icon="el-icon-download" @click="doReset()">
                <i class="el-icon-delete"></i>清空
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid
        ref="searchReulstList"
        :options="gridOptions"
        @selection-change="handleSelectionChange"
      ></t-grid>
    </el-card>
  </div>
</template>
<script>
import baseView from "@/base/baseView";
export default {
  name: "myTask",
  extends: baseView,
  data() {
    return {
      checkededRows: [],
      processDefinationlist: [],
      startDateRange: null,
      gridOptions: {
        dataSource: {
          serviceInstance: tapp.services.finaGetBorrow.getPagedGetList,
          serviceInstanceInputParameters: {
            proSubCompany: null,
            proName: null
          }
        },
        grid: {
          offsetHeight: 125, //125:查询部分高度
          mutiSelect: false,
          fit: true, // 列的宽度是否自撑开
          columns: [
            {
              prop: "proName",
              label: "项目名称",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "proSubCompany",
              label: "所属分公司",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "realAmount",
              label: "确认借款额度（万元）",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "tiimeLimit",
              label: "借款期限",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "borrowDate",
              label: "借款日期",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "getAmount",
              label: "放款",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "approvalStatus",
              label: "付款",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "totalAmount",
              label: "累计已还款金额（万元）",
              sortable: true,
              minWidth: 120
            },
            {
              prop: "arrearAmount",
              label: "累计未还款金额（万元）",
              sortable: true,
              minWidth: 120
            }
          ], // 需要展示的列
          defaultSort: {
            prop: "borrowDate",
            order: "descending"
          }
        }
      }
    };
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
    handleSelectionChange(val) {
      this.checkededRows = val;
    },
    doReset() {
      this.$refs.search.resetFields();
    },
    doExportExcel() {
      this.$refs.searchReulstList.exportCSV("项目借还款列表");
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
};
</script>


<template>
  <div class="acceptance-bill-table-container">
    <el-row class="fina-function-button">
      <el-col :span="4">
        <el-button @click="openDialog" type="primary">项目借款</el-button>
      </el-col>
      <el-col :span="6">
        <span>小计金额：{{ totalAmount }}万元</span>
      </el-col>
    </el-row>
    <el-table :data="dataInfo" border size="mini">
      <el-table-column align="center" label="借款额度（万元）" prop="lNum"></el-table-column>
      <el-table-column align="center" label="可使用借款额度（万元）" prop="aoAmount"></el-table-column>
      <el-table-column align="center" label="本次付款金额（万元）" prop="technicalTitle"></el-table-column>
      <el-table-column align="center" label="本次借款期限" prop="asAmount"></el-table-column>
      <el-table-column align="center" label="借款合同编号" prop="asAmount">
        <template slot-scope="row">
          <t-input v-model="row.asAmount" placeholder="审批完成后回填" :readOnly="readOnly"></t-input>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="项目到帐请款列表"
      :visible.sync="dialogVisible"
      width="80%"
      center
      @click="openDialog"
    >
      <t-form
        ref="search"
        label-width="120px"
        :model="gridOptions.dataSource.serviceInstanceInputParameters"
      >
        <el-row :gutter="10" class="search-top-operate">
          <el-button type="primary" @click="choose">确定</el-button>
          <el-button type="info" @click="dialogVisible = false">取消</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="借款日期：" prop="rType" style="margin-bottom: 15px;">
              <t-datetime-picker v-model="gridOptions.dataSource.serviceInstanceInputParameters.rType" type="date"></t-datetime-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </t-form>
      <t-grid
        ref="searchResultList"
        :options="gridOptions"
        @selection-change="handleSelectionChange"
      >
      <template slot="columnDataHeader">
          <t-edit-grid-column prop="subjectType" label="乙方单位" verify :maxLength="200" min-width="150" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.subjectType" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
        </template>
      </t-grid>
      <!-- <t-edit-grid ref="searchResultList" :options="gridOptions" disabled @selection-change="handleSelectionChange">
        <template slot="columnDataHeader">
          <t-edit-grid-column prop="subjectType" label="乙方单位" verify :maxLength="200" min-width="150" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.subjectType" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
        </template>
      </t-edit-grid> -->
    </el-dialog>
  </div>
</template>

<script>
import baseView from "@/base/baseView";
export default {
  extends: baseView,
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    searchData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      dataInfo: [],
      totalAmount: 0, // 小计
      dialogVisible: false,
      gridOptions: {
        mutiSelect: true,
        dataSource: {
          serviceInstance: tapp.services.finaTakebackApproval.getPagedList,
          serviceInstanceInputParameters: {
            rWay: "", // 默认承兑汇票 promise_draft
            rType: ""
          }
        },
        grid: {
          offsetHeight: 125, // 125:查询部分高度
          mutiSelect: true,
          maxHeight: 350,
          columns: [
            {
              prop: "proName",
              label: "项目名称"
            },

            {
              prop: "proCode",
              label: "项目借款额度（万元）",
              width: 200
            },
            {
              prop: "proCode",
              label: "借款日期",
            },
            {
              prop: "proCode",
              label: "借款额度期限",
              width: 120
            },
            {
              prop: "proCode",
              label: "剩余可用额度（万元）",
              width: 200
            },
            {
              prop: "proManager",
              label: "本次付款金额（万元）",
              width: 200
            },
            {
              prop: "proManager",
              label: "本次借款期限",
              width: 120
            }
          ], // 需要展示的列
          defaultSort: {
            prop: "id",
            order: "descending"
          }
        }
      },
      // gridOptions: {
      //   dataSource: [],
      //   grid: {
      //     offsetHeight: 36, // 36:查询部分高度
      //     defaultSort: {
      //       prop: "id",
      //       order: "ascending"
      //     },
      //   },
      // }
    };
  },
  components: {},
  created() {
    this.currentValue = this.value;
  },
  watch: {
    searchData: {
      handler(newValue, oldValue) {
        this.gridOptions.dataSource.serviceInstanceInputParameters = newValue;
        this.doRefresh();
      },
      deep: true
    }
  },
  activated() {
    this.$nextTick(() => {});
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      this.selectedRows = val;
      console.log("selectedData 选中的数据", val);
    },
    doRefresh() {
      console.log(
        "doRefresh 查询条件",
        this.gridOptions.dataSource.serviceInstanceInputParameters
      );
      this.$refs.searchResultList.refresh();
    },
    // 打开承兑汇票弹框
    openDialog() {
      // 给弹出的框赋值查询条件
      this.dialogVisible = true;
    },
    // 打开承兑汇票弹框
    closeDialog() {
      this.dialogVisible = false;
    },
    doReset() {
      this.$refs.search.resetFields();
      this.selectedRows = [];
      this.doRefresh();
    },
    // 点击确定
    choose() {
      this.dialogVisible = false;

      // =============================
      this.selectedRows = [{lNum: 23, aoAmount: 2}]
      // =============================
      // 给承兑汇票的table赋值
      this.dataInfo = this.selectedRows;
      this.setTotalAmount(this.dataInfo);
      // 传送到父组件
      this.$emit("selectedData", this.dataInfo);
      this.doReset();
    },
    // 计算小计
    setTotalAmount(data) {
      let sum = 0;
      data.map(v => {
        sum += Number(v.aoAmount);
      });
      this.totalAmount = sum;
    }
  }
};
</script>
<style scoped type="text/css">
.acceptance-bill-table-container {
  margin: 10px 0;
}

.fina-function-button {
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
}
</style>


<template>
<div class="mod-role">
  <t-form :inline="true">
    <el-form-item label="年">
      <el-select v-model="year" placeholder="请选择" @change='handleYearChange'>
        <el-option v-for="item in years" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button  @click="doSystemGenerateList()" >系统生成</el-button>
      <el-button   type="primary" @click="doSave()">保存</el-button>
    </el-form-item>
  </t-form>
  <t-grid ref="searchReulstList" :options="gridOptions">
    <template slot="columnDataHeader"> 
    <el-table-column label="是否假期" width="200" fixed="left">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.wk"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
    </template>
    </el-table-column>
    <el-table-column label="日期" min-width="200"  fixed="left">
      <template slot-scope="scope">
        <t-datetime-picker v-model="scope.row.cdate" type="date" :disabled="true">
        </t-datetime-picker>
      </template>
    </el-table-column>
</template>
</t-grid>
</div>
</template>

<script>
import baseView from '@/base/baseView'
export default {
  extends:baseView,
  data() {
    return {
      years: [],
      year: null,
      gridOptions: {
        dataSource: [],
        grid: {   offsetHeight: 36, //36:查询部分高度
          customColumnDataHeader: true,
          pageable: false,
          mutiSelect: false,
          defaultSort: {
            prop: 'cdate',
            order: 'ascending'
          },
        }
      }
    }
  },
  components: {},
  created() {
    let currYear = this.getCurrYear();
    this.year = currYear;
    this.initYears();
    this.handleYearChange();
  },
  methods: {
    getCurrYear() {
      let now = new Date();
      let currYear = now.getFullYear();
      return currYear;
    },
    initYears() {
      let currYear = this.getCurrYear();
      for (let i = currYear - 2; i <= currYear + 10; i++) {
        this.years.push(i);
      }
    },
    handleYearChange() {
      let self = this;
      tapp.services.base_HolidaySet.getListByYear(self.year).then(function(result) {
        self.gridOptions.dataSource = result;
      });
    },
    doSystemGenerateList() {
      let self = this;
      tapp.services.base_HolidaySet.systemGenerateList(self.year).then(function(result) {
        self.gridOptions.dataSource = result;
      });
    },
    doSave() {
      let self = this;
      let model = self.gridOptions.dataSource;
      tapp.services.base_HolidaySet.saveList(model).then(function() {
        self.$notify.success({
          title: '操作成功',
          message: '保存成功！',
        });
      });
    },
    doRefresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
}
</script>

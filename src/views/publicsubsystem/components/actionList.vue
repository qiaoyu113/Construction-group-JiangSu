<template>
<div class="mod-role">
  <t-grid ref="searchReulstList" :options="gridOptions">
  </t-grid>
</div>
</template>
<script>
export default {
  props: {
    businessDocId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      gridOptions: {
        dataSource: {
          loadDataOnFirst: false,
          serviceInstance: tapp.services.base_Action.getList,
          serviceInstanceInputParameters: this.businessDocId
        },
        grid: {
          mutiSelect: false,
          pageable:false,
          columns: [{
              prop: 'actUserName',
              label: '操作人',
              sortable: true,
              width: 120
            },
            {
              prop: 'actDate',
              label: '操作日期',
              sortable: true,
              width: 150,
              formatter: (row, column, cellValue) => {
                return this.$util.datePatternFormat(row.actDate, 'YYYY-MM-DD HH:mm');
              }
            },
            {
              prop: 'doAction',
              label: '操作',
              width: 120
            },
            {
              prop: 'content',
              label: '操作内容',
              minWidth: 150,
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
  created() {},
  methods: {
    refresh() {
      this.$refs.searchReulstList.refresh();
    }
  }
}
</script>

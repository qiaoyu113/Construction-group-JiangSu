<template>
  <div>
    <t-grid ref="searchReulstList" :options="gridOptions">
    </t-grid>
  </div>
</template>

<script>
  export default {
    props: {
      pId: -1
    },
    name: 'approvalList',
    data() {
      return {
        visible: false,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaFpayoffApproval.getFpayoffList,
            serviceInstanceInputParameters: {
              pId: pId,
            }
          },
          grid: {
            mutiSelect: false,
            columns: [{
              prop: 'proName',
              label: '项目名称',
              fixed: 'left',
              width: 120
            },
              {
                prop: 'name',
                label: '银行帐户名称',
                fixed: 'left',
                width: 120
              },
              {
                prop: 'mobile',
                label: '银行帐号',
                minWidth: 120
              },
              {
                prop: 'mobile',
                label: '发放金额（万元）',
                minWidth: 120
              },
              {
                prop: 'mobile',
                label: '银行帐号',
                minWidth: 120,
                formatter: (row, column, cellValue) => {
                  return this.$util.dateFormat(row.openTime, 'YYYY-MM-DD');
                }
              },
            ], // 需要展示的列
            defaultSort: {
              prop: 'id',
              order: 'ascending',
            },
          }
        }
      }
    },
    components: {},
    created() {
    },
    methods: {
      // 初始化
      init(pId) {
        console.log(pId)


      },
    }
  }
</script>

<template>
  <div>
    <t-grid ref="approvallist" :options="gridOptions">
    </t-grid>
  </div>
</template>

<script>
  export default {
    props: {
      pId: {
        type: String || Number,
        default: -1,
        required: false,
      },
    },
    name: 'approvalList',
    data() {
      return {
        visible: false,
        gridOptions: {
          dataSource: {
            serviceInstance: tapp.services.finaFpayoffApproval.getFpayoffList,
            serviceInstanceInputParameters: {
              pId: this.pId,
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
                prop: 'bankName',
                label: '银行帐户名称',
                fixed: 'left',
                width: 120
              },
              {
                prop: 'bankAccount',
                label: '银行帐号',
                minWidth: 120
              },
              {
                prop: 'payoffMoney',
                label: '发放金额（万元）',
                minWidth: 120
              },
              {
                prop: 'signTime',
                label: '发放时间',
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
    mounted() {
      this.init()
      this.doRefresh()
    },
    watch: {
      pId(val) {
        this.$emit('getPid', val)
      }
    },
    methods: {
      // 初始化
      init() {
        this.$refs.approvallist.refresh();
      },
      doRefresh() {
        this.$refs.approvallist.refresh();
      },

    }
  }
</script>

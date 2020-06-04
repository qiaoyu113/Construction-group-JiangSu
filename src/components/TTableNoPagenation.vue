<template>
<div class="table">
  <el-table ref="mutipleTable" :max-height="maxHeight" v-bind="tableOptions" :empty-text="emptyText" :data="data" size="medium" @selection-change="handleSelectionChange" @sort-change="handleSortChange" @filter-change="handleFilterChange" @cell-click="handleCellClick" header-cell-class-name="tableHeader">
    <!--region 选择框-->
    <el-table-column v-if="mutiSelect" type="selection" :selectable='mutiSelectSelectable' style="width: 55px;">
    </el-table-column>
    <el-table-column type="index" label="行号" width="50" fixed='left'>
    </el-table-column>


    <el-table-column width="50" v-if="editable">
      <template slot-scope="scope">
             <el-tooltip class="item" effect="dark" :content="scope.row.errorMessage" placement="top-start" v-if="scope.row.hasError">
               <el-button type="danger" icon="el-icon-warning" circle size="mini" style="padding:4px"></el-button>
             </el-tooltip>
           </template>
    </el-table-column>

    <!--endregion-->
    <!--region 按钮操作组-->
    <el-table-column v-if="operates.list!=null&&operates.list.length>0" ref="fixedColumn" label="操作" align="center" :min-width="operates.minWidth" :width="operates.width" :fixed="operates.fixed">
      <template slot-scope="scope">
        <template v-for="(btn, key) in operates.list">
         <el-button :type="btn.type" size="small" :icon="btn.icon" :disabled="btn.disabled" :style="btn.style"
             @click.native.prevent="btn.method(key,scope.row)">
             {{ btn.render==null?btn.label:btn.render(key,scope.row) }}
         </el-button>
        </template>
      </template>
    </el-table-column>
    <!--endregion-->

    <!--region 数据列-->
    <slot name="columnDataHeader">
      <template v-for="(column, index) in availColumns">
          <el-table-column v-bind="column">
            <template slot-scope="scope">
              <template v-if="!column.render">
                <template v-if="column.formatter">
                  <span v-html="column.formatter(scope.row, column)"></span>
                </template>
      <template v-else>
                  <span>{{scope.row[column.prop]}}</span>
                </template>
      </template>
      <template v-else>
                <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
              </template>
      </template>
      </el-table-column>
      </template>
    </slot>
    <!--endregion-->

  </el-table>

</div>
</template>
<!--endregion-->
<script>
const defaultTableOptins = {
  stripe: false,
  border: false,
  highlightCurrentRow: true
}
const defaultOperatorsPropsOptions = {
  width: 200,
  fixed: 'right',
  list: null
}

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    options: {
      type: Object,
      default: function () {
        return {
          table: {},
          operates: {
            type: Object,
            default: {

            } // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，disabled：是否禁用，method：回调方法
          },
          pagination: {
            type: Object,
            default: {

            } // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
          }
        }
      } // table 表格的控制参数
    },
    emptyText: {
      type: String,
      default: function () {
        return '...数据待加载'
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    total: {
      type: Number,
      default: function () {
        return 0
      }
    },
    maxHeight: {
      type: Number,
      default: function () {
        return null
      }
    },
    currentPageIndex: {
      type: Number,
      default: function () {
        return 1
      }
    }
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
  },
  data () {
    return {
      tableOptions: {},
      operates: {},
      mutiSelectSelectable: null,
      mutiSelect: false,
      pageable: false,
      paginationPropsOptions: {},
      editable: false
    }
  },
  created () {
    this.init(this.options)
  },
  computed: {
    availColumns: {
      // 动态计算currentValue的值
      get: function () {
        if (this.tableOptions.columns == null) {
          return null
        }
        let aColumns = this.tableOptions.columns.filter((item) => {
          return item.visible == null || item.visible === true
        })
        return aColumns
      }
    }
  },
  watch: {
    options: {
      handler (newValue, oldValue) {
        this.init(newValue)
      },
      deep: true
    }
  },
  mounted () {

  },
  methods: {
    init (options) {
      if (!options) {
        return
      }
      let {
        pagination,
        pageable,
        editable,
        mutiSelect,
        operates,
        selectable,
        ...tableOptions
      } = options

      this.operates = { ...defaultOperatorsPropsOptions,
        ...operates
      }
      this.paginationPropsOptions = {
        ...pagination
      }

      this.pageable = pageable
      this.mutiSelect = mutiSelect && !this.disabled
      this.mutiSelectSelectable = selectable
      this.editable = editable
      this.tableOptions = {
        ...defaultTableOptins,
        ...tableOptions
      }
    },
    handleFilterChange (filters) {
      this.$emit('filter-change', filters)
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    handleSortChange (sort) {
      this.$emit('sort-change', sort)
    },
    handleCellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    // 切换每页显示的数量
    handleSizeChange (size) {
      if (this.pageable) {
        this.$emit('size-change', size)
      }
    },
    // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
    doLayout () {
      this.$refs.mutipleTable.doLayout()
    },

    // 切换页码
    handleIndexChange (currnet) {
      if (this.pageable) {
        this.$emit('current-change', currnet)
      }
    }
  }

}
</script>

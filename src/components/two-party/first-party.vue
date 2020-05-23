<template>
  <el-form-item label="添加甲方：" class="is-required">
    <el-col>
      <t-edit-grid ref="firstPartyGrid" :options="firstPartyGridOptions" :readOnly="readOnly" >
        <template slot="columnDataHeader">
          <t-edit-grid-column prop="updateuser" label="甲方单位" verify :maxLength="200" min-width="150" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.updateuser" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="datastatus" label="签订人" idcard :maxLength="50" min-width="100" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.datastatus" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="datastatus" label="开户行名称" verify min-width="100" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.datastatus" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="datastatus" label="银行账户名称" verify min-width="100" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.datastatus" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="datastatus" label="银行账号" verify min-width="100" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.datastatus" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="loanMoneyAmount" label="联系方式" verify min-width="80" class-name="is-required" >
            <template slot-scope="scope">
              <t-number-input v-model="scope.row.loanMoneyAmount" :readOnly="readOnly" ></t-number-input>
            </template>
          </t-edit-grid-column>
          <t-edit-grid-column prop="datastatus" label="地址" verify min-width="100" class-name="is-required" >
            <template slot-scope="scope">
              <t-input v-model="scope.row.datastatus" :readOnly="readOnly" ></t-input>
            </template>
          </t-edit-grid-column>
        </template>
      </t-edit-grid>
    </el-col>
  </el-form-item>
</template>

<script>
export default {
  components: {},
  props: {
    readOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      firstPartyGridOptions: {
        dataSource: [],
        grid: {
          offsetHeight: 36, // 36:查询部分高度
          defaultSort: {
            prop: "id",
            order: "ascending",
          },
        },
      },
    };
  },
  watch: {

  },
  created() {
    setTimeout(() => {
      this.firstPartyGridOptions.dataSource = [];
    }, 300)
  },
  mounted() {},
  computed: {},
  methods: {
    getData() {
      return this.$refs.firstPartyGrid.getData()
    },
    validate() {
      return this.$refs.firstPartyGrid.validate()
    }
  },
};
</script>
<style lang="scss"></style>

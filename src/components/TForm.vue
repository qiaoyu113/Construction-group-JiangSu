<template>
<div> 
<el-form class="t-form" ref="ruleForm" v-bind="$attrs" v-on="$listeners" :model="innerModel">
  <slot/>
</el-form>
</div>
</template>
<script>
export default {
  props: {
    model: Object,
  },
  data() {
    return {
      innerModel: {},
    }
  },
  watch: {
    model: {
      deep: true,
      handler: function(val) {
        this.innerModel = val;
         console.log(this.innerModel);
      }
    }
  },
  created() {
    if (!this.innerModel) {
      this.innerModel = {};
    }
    this.$nextTick(() => {

      let ruleForm = this.$refs.ruleForm;
      Object.keys(this.innerModel).filter(p => this.innerModel[p] === undefined).forEach(p => {
        this.innerModel[p] = null;
      });
    })
    this.innerModel = this.$util.deepObjectAssign({}, this.innerModel);
   
  },
  activated() {},
  methods: {
    resetFields() {
      this.$refs.ruleForm.resetFields();
    },
    clearValidate(props = []) {
      this.$refs.ruleForm.clearValidate(props);
    },
    validate(callback) {
      return this.$refs.ruleForm.validate(callback);
    },
    validateField(props, cb) {
      this.$refs.ruleForm.validateField(props, cb);
    },
  }
}
</script>

<template>
  <el-col :span="span">
    <el-form-item :prop="prop" :class="{
        'is-required': (required !== undefined && required !== false),
        'is-error': feedback && feedback.type === 'error',
        'is-success': feedback && feedback.type === 'success'
      }">
      <template slot="label">
        <slot name="label">{{label}}</slot>
      </template>
      <el-input ref="input" :type="type || 'text'" :rows="parseInt(rows)" :value="value" @change="onChange" @focus="onFocus"  @blur="onBlur" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners" :disabled="inputreadOnly">
        <template slot="prepend" v-if="$slots.prepend">
          <slot name="prepend">
          </slot>
        </template>
        <template slot="append" v-if="$slots.append">
          <slot name="append"></slot>
        </template>
        <template slot="append" v-if="!$slots.append && issearch">
          <slot name="append">
            <el-button icon="el-icon-search" @click="search"></el-button>
          </slot>
        </template>
      </el-input>
    </el-form-item>
  </el-col>
</template>

<script>
 import emitter from 'element-ui/src/mixins/emitter'
export default {
   components: {},
   mixins: [emitter],
   props: {
     onSearch: { type: Function },
     type: {
       type: String,
     },
     rows: { type: String },
     required: {
       type: Boolean,
       default: false,
       required: false
     },
     issearch: {
       type: Boolean,
       default: false,
       required: false
     },
     span: {
       type: Number,
       default: 8,
       required: true
     },
     label: {
       type: String,
       default: '',
       required: true
     },
     prop: {
       type: String,
       default: '',
       required: false
     },
     value: {
       type: String,
       default: '',
       required: false
     },
     placeholder: {
       type: String,
       default: '',
       required: false
     },
     inputreadOnly: {
       type: Boolean,
       default: false,
       required: false
     },
     disabled: {
       type: Boolean,
       default: false,
       required: false
     }
   },
   data () {
     return {
       selectValue: null,
       // 输入项验证结果
        feedback: null
     }
   },
   watch: {
     value (newValue) {
       this.value = newValue
     }
   },
   mounted () {},
   computed: {
     
   },
   mounted () {},
   methods: {
     onFocus () {
       if (this.$refs.input) {
         this.$refs.input.focus()
       }
       this.$emit('focus')
     },
     onBlur () {
       this.$emit('blur')
     },
     onChange () {
       this.$emit('change', this.selectValue)
     },
     isEmpty () {
       return this.value == null || this.value.length == 0
     },
     search () {
       this.onSearch()
     }
   }
}
</script>
<style lang="scss" scoped>
.el-form-item.is-required .el-form-item__label:after {
  float: left
}
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  margin-right: 4px !important;
}
</style>


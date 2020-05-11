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
      <el-input ref="input" :type="type || 'text'" :rows="parseInt(rows)" v-model="currentValue" @change="onChange" @focus="onFocus"  @blur="onBlur" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners" :disabled="inputreadOnly">
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
     value: null,
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
     value (value) {
       this.currentValue = value
     }
   },
   created () {
     this.currentValue = this.value
   },
   mounted () {},
   computed: {
     currentValue: {
      // 动态计算currentValue的值
       get: function () {
         return this.selectValue
       },
       set: function (val) {
        // 如果原值，新值都为空，无需重新赋值，防止首次进入显示必输提示
         if ((val == null || val == undefined) && (this.selectValue == null || this.selectValue == undefined)) {
           return
         }
         this.selectValue = val
         this.$emit('input', this.selectValue)
         this.dispatch('ElFormItem', 'el.form.change', this.selectValue)
       }
     }
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
       return this.currentValue == null || this.currentValue.length == 0
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


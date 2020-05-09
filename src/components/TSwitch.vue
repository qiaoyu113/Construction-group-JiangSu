<template>
<div> 
  <el-switch v-model="currentValue" :disabled="disabled" v-if="!readOnly"></el-switch>
  <div v-else class="t-readonly  t-switch-readonly-div">
    <span>{{selectValue == null?'':(selectValue?'是':'否')}}</span>
  </div>
</div>
</template>
<script>
import util from '@/util'
import emitter from 'element-ui/src/mixins/emitter';
export default {
  mixins: [emitter],
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    readOnly: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  data() {
    return {
      selectValue: null,
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.currentValue = value;
      } else {
        this.currentValue = null;
      }

    }
  },
  created() {
    if (this.value) {
      this.currentValue = this.value;
    } else {
      this.currentValue = null;
    }
  },
  mounted() {},
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return !!this.selectValue;
      },
      set: function(val) {
        //如果原值，新值都为空，无需重新赋值，防止首次进入显示必输提示
        if ((val == null || util.isUndefined(val)) && (this.selectValue == null || util.isUndefined(this.selectValue))) {
          return;
        }

        this.selectValue = !!val;
        this.$emit('input', this.selectValue);
        this.$emit('change', this.selectValue);
        this.$emit('blur');
         this.dispatch('ElFormItem', 'el.form.change', this.selectValue); 
     
      }
    }
  },
  mounted() {},
  methods: {
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0;
    },
  },
}
</script>

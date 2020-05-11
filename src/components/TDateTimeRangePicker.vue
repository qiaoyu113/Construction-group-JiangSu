<template>
<el-date-picker v-model="currentValue" :value-format="valueFormat" type="daterange" :picker-options="pickerOptions" range-separator="-" align="right" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder">
</el-date-picker>
</template>
<script>
import moment from 'moment';
import util from '@/util'
import emitter from 'element-ui/src/mixins/emitter';
export default {
  mixins: [emitter],
  components: {},
  props: {
    value: null,

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
    startPlaceholder: {
      type: String,
      required: false,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      required: false,
      default: '结束日期'
    },
  },
  data() {
    return {
      selectValue: null,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            let _fromValue = null;
            let _toValue = null;
            _fromValue = util.datetimeFormat(moment().startOf('day'));
            _toValue = util.datetimeFormat(moment().endOf('day').toDate());
            picker.$emit('pick', [_fromValue, _toValue]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            let _fromValue = null;
            let _toValue = null;
            _fromValue = util.datetimeFormat(moment().startOf('day').subtract(1, 'days'));
            _toValue = util.datetimeFormat(moment().startOf('day').subtract(1, 'days'));
            picker.$emit('pick', [_fromValue, _toValue]);

          }
        }, {
          text: '本周',
          onClick(picker) {
            let _fromValue = null;
            let _toValue = null;
            _fromValue = util.datetimeFormat(moment().startOf('isoWeek'));
            _toValue = util.datetimeFormat(moment().endOf('isoWeek'));
            picker.$emit('pick', [_fromValue, _toValue]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            let _fromValue = null;
            let _toValue = null;
            _fromValue = util.datetimeFormat(moment().startOf('month'));
            _toValue = util.datetimeFormat(moment().endOf('month'));

            picker.$emit('pick', [_fromValue, _toValue]);
          }
        }, {
          text: '本年',
          onClick(picker) {
            let _fromValue = null;
            let _toValue = null;
            _fromValue = util.datetimeFormat(moment().startOf('year'));
            _toValue = util.datetimeFormat(moment().endOf('year'));
            picker.$emit('pick', [_fromValue, _toValue]);
          }
        }, {
          text: '不限',
          onClick(picker) {
            picker.$emit('pick', null);
          }
        }]
      },
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
    valueFormat: {
      get: function() {

        let datefromPattern = 'yyyy-MM-dd HH:mm:ss';
        return datefromPattern;

      },
    },

    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return this.selectValue;
      },
      set: function(val) {
         
        //如果原值，新值都为空，无需重新赋值，防止首次进入显示必输提示
        if ((val == null || val == undefined) && (this.selectValue == null || this.selectValue == undefined)) {
          return;
        }
        this.selectValue = val;

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

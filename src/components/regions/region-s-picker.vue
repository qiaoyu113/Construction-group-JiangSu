<template>
  <div class="region-picker">
    <el-col :span="12" style="padding-left: 0;padding-right: 2px;">
      <el-form-item prop="province" :rules="dataRules.province">
        <t-dic-dropdown-select ref="province" dicType="base_region" v-model="_province" :readonly="readOnly" :disabled="disabled"></t-dic-dropdown-select>
      </el-form-item>
    </el-col>
    <el-col :span="12" style="padding-left: 0;padding-right: 0;">
      <el-form-item prop="city" :rules="dataRules.city">
        <t-dic-dropdown-select ref="cityPicker" :dataisgood="currentProvince.items" v-model="_city" :readonly="readOnly" :disabled="disabled"></t-dic-dropdown-select>
      </el-form-item>
    </el-col>
  </div>
</template>
<script>
import find from 'lodash/find'
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: '',
      required: false
    },
    province: {
      type: String,
      default: '',
      required: false
    },
    city: {
      type: String,
      default: '',
      required: false
    },
    readOnly: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    required: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      // _province: '',
      // _city: '',
      selectValue1: null,
      selectValue2: null,
      currentProvince: {
        items: []
      },
      dataRules: {
        province: [{validator: this.isProvinceEmpty, trigger: 'change'}],
        city: [{validator: this.isCityEmpty, trigger: 'change'}],
      }
    }
  },
  created() {
    this._province = this.province;
    this._city = this.city;
  },
  watch: {
    province(val) {
      this._province = val;
    },
    city(val) {
      this._city = val;
    },
  },
  computed: {
    _province: {
      get: function() {
        return this.selectValue1;
      },
      set: function(val) {
        //如果原值，新值都为空，无需重新赋值，防止首次进入显示必输提示
        if ((!val || val.length == 0) && (!this.selectValue1 || this.selectValue1.length == 0)) {
          this.currentProvince.items = []
          return;
        }
        this.selectValue1 = val;
        if(!/^\d{6}$/.test(val)) {
          this.$emit('update:province', val)
          return val
        }
        if(this.$refs['cityPicker']) {
          this.$refs['cityPicker'].currentValue = '';
        }
        this.currentProvince = find(tapp.data.base_datadictionary['base_region'], {id: val})
        this.$emit('update:province', this.selectValue1);
      }
    },
    _city: {
      get: function() {
        return this.selectValue2;
      },
      set: function(val) {
        //如果原值，新值都为空，无需重新赋值，防止首次进入显示必输提示
        if ((!val || val.length == 0) && (!this.selectValue2 || this.selectValue2.length == 0)) {
          return;
        }
        this.selectValue2 = val;
        this.$emit('update:city', this.selectValue2);
      }
    },
  },
  methods: {
    isProvinceEmpty (rule, value, cb) {
      if (!this.required) return cb()
      if (this._province == null || this._province.length == 0 || this._province == '') {
        return cb(new Error('省份不能为空'))
      }
      return cb()
    },
    isCityEmpty (rule, value, cb) {
      if (!this.required) return cb()
      if (this.currentProvince && this.currentProvince.items && this.currentProvince.items.length == 0) {
        return cb()
      }
      if (this._city == null || this._city.length == 0 || this._city == '') {
        return cb(new Error('城市不能为空'))
      }
      return cb()
    },
  }
}
</script>

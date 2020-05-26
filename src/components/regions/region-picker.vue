<template>
  <div class="region-picker">
    <el-col :span="8" style="padding-left: 0;padding-right: 2px;">
      <el-form-item prop="province" :rules="dataRules.province">
        <t-dic-dropdown-select ref="province" dicType="base_region" v-model="_province" :readOnly="readOnly" :disabled="disabled" @input="provinceChange"></t-dic-dropdown-select>
      </el-form-item>
    </el-col>
    <el-col :span="8" style="padding-left: 0;padding-right: 0;">
      <el-form-item prop="city" :rules="dataRules.city">
        <t-dic-dropdown-select ref="cityPicker" :dataisgood="currentProvince.items" v-model="_city" :readOnly="readOnly" :disabled="disabled" @input="cityChange"></t-dic-dropdown-select>
      </el-form-item>
    </el-col>
    <el-col :span="8" style="padding-left: 0;padding-right: 0;">
      <el-form-item prop="city" :rules="dataRules.district">
        <t-dic-dropdown-select ref="districtPicker" :dataisgood="currentCity.items" v-model="_district" :readOnly="readOnly" :disabled="disabled" @input="districtChange"></t-dic-dropdown-select>
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
    district: {
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
      _province: '',
      _city: '',
      _district: '',
      currentProvince: {
        items: []
      },
      currentCity: {
        items: []
      },
      dataRules: {
        province: [{validator: this.isProvinceEmpty, trigger: 'change'}],
        city: [{validator: this.isCityEmpty, trigger: 'change'}],
        district: [{validator: this.isCityEmpty, trigger: 'change'}]
      }
    }
  },
  created() {
    this._province = this.province;
    this._city = this.city;
    this._district = this.district;
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
    isDistrictEmpty (rule, value, cb) {
      if (!this.required) return cb()
      if (this.currentCity && this.currentCity.items && this.currentCity.items.length == 0) {
        return cb()
      }
      if (this._district == null || this._district.length == 0 || this._district == '') {
        return cb(new Error('地区不能为空'))
      }
      return cb()
    },
    provinceChange(val) {
      this.$emit('update:city', '')
      if(this.$refs['cityPicker']) {
        this.$refs['cityPicker'].currentValue = '';
      }
      if (!val) {
        this.currentProvince.items = []
        return
      }
      this.currentProvince = find(tapp.data.base_datadictionary['base_region'], {id: val})
      this._province = val;
      this.$emit('update:province', val)
    },
    cityChange(val) {
      this.$emit('update:district', '')
      if(this.$refs['districtPicker']) {
        this.$refs['districtPicker'].currentValue = '';
      }
      if (!val) {
        this.currentCity.items = []
        return
      }
      this.currentCity = find(this.currentProvince.items, {id: val})
      this._city = val;
      this.$emit('update:city', val)
    },
    districtChange(val) {
      this.$emit('update:district', val)
    }
  }
}
</script>

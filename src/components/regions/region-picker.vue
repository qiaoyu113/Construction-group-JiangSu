<template>
  <div class="region-picker">
    <el-col :span="12" style="padding-left: 0;padding-right: 2px;">
      <el-form-item prop="province" :rules="dataRules.province">
        <t-dic-dropdown-select dicType="base_region" v-model="province" :readOnly="readOnly" :disabled="disabled"></t-dic-dropdown-select>
      </el-form-item>
    </el-col>
    <el-col :span="12" style="padding-left: 0;padding-right: 0;">
      <el-form-item prop="city" :rules="dataRules.city">
        <t-dic-dropdown-select :dataisgood="currentProvince.items" v-model="city" :readOnly="readOnly" :disabled="disabled"></t-dic-dropdown-select>
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
      province: '',
      city: '',
      currentProvince: {},
      selectValue: '',
      dataRules: {
        province: [{validator: this.isProvinceEmpty, trigger: 'change'}],
        city: [{validator: this.isCityEmpty, trigger: 'change'}]
      }
    }
  },
  watch: {
    province (value) {
      this.city = ''
      if (!value) {
        this.currentProvince.items = []
        return
      }
      this.currentProvince = find(tapp.data.base_datadictionary['base_region'], {id: value})
      this.$emit('province', value)
    },
    city (value) {
      this.$emit('city', value)
    }
  },
  methods: {
    isProvinceEmpty (rule, value, cb) {
      if (!this.required) return cb()
      if (this.province == null || this.province.length == 0 || this.province == '') {
        return cb(new Error('省份不能为空'))
      }
      return cb()
    },
    isCityEmpty (rule, value, cb) {
      if (!this.required) return cb()
      if (this.currentProvince && this.currentProvince.items && this.currentProvince.items.length == 0) {
        return cb()
      }
      if (this.city == null || this.city.length == 0 || this.city == '') {
        return cb(new Error('城市不能为空'))
      }
      return cb()
    }
  }
}
</script>

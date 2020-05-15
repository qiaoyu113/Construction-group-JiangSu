<template>
  <div>
    <el-col :span="12">
      <t-dic-dropdown-select dicType="base_region" v-model="provinceCode" :readOnly="readOnly"></t-dic-dropdown-select>
    </el-col>
    <el-col :span="12" >
      <t-dic-dropdown-select :dataisgood="currentProvince.items" v-model="cityCode" :readOnly="readOnly"></t-dic-dropdown-select>
    </el-col>
  </div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter';
import find from 'lodash/find'
export default {
  components: {},
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      provinceCode: null,
      cityCode: '',
      currentProvince: {},
      readOnly: false
    }
  },
  watch: {
    provinceCode(value) {
      this.cityCode = value
      this.currentProvince = find(tapp.data.base_datadictionary['base_region'], {id: value});
      this.cityCode = ''
    },
    cityCode(value) {
      console.log('value12121', value)
      this.value = this.provinceCode+','+this.cityCode
    }
  },
  created() {
    this.provinceCode = this.value || (this.multiple ? [] : null);
  },
  mounted() {},
  computed: {
    
  },
  mounted() {},
  methods: {
    isEmpty() {
      return this.provinceCode == null || this.provinceCode.length == 0;
    },
  },
}
</script>

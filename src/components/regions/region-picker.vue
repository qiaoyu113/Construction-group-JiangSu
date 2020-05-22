<template>
  <el-form-item label="地区" prop="region" class="is-required">
    <el-col :span="12">
      <t-dic-dropdown-select dicType="base_region" v-model="provinceCode" :readOnly="readOnly"></t-dic-dropdown-select>
    </el-col>
    <el-col :span="12" >
      <t-dic-dropdown-select :dataisgood="currentProvince.items" v-model="cityCode" :readOnly="readOnly"></t-dic-dropdown-select>
    </el-col>
  </el-form-item>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter';
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
  },
  data() {
    return {
      provinceCode: null,
      cityCode: '',
      currentProvince: {},
      selectValue: '',
    }
  },
  watch: {
    provinceCode(value) {
      this.provinceCode = value
      this.currentProvince = find(tapp.data.base_datadictionary['base_region'], {id: value});
      this.$emit('province', value)
      this.$emit('input', value)
    },
    cityCode(value) {
      this.$emit('city', value);
      this.$emit('input', value)
    }
  },
  created() {

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

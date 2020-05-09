<template>
<div>
  <div v-if="!readOnly">
    <t-cascader :options="controlOptions" v-model="currentValue" :disabled="disabled" size="small"></t-cascader>
  </div>
  <div v-else class="t-readonly  t-dic-tree-multi-select-readonly-div">
    <span v-for="tag in selectedData" :key="tag.id" value-key="id" class="t-dic-tree-multi-select-readonly-item-span"> {{!tag||!tag.path ?'':tag.path.replace('.;', '').replace(';', '/')}}</span>
  </div>
</div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter';
export default {
  mixins: [emitter],
  components: {},
  props: {
    dicType: {
      type: String,
      required: false
    },
    data: {
      type: Array,
      default: null,
      required: false
    },
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
  },
  data() {
    return {
      controlOptions: {
        dataSource: [],
        cascader: {
          props: {
            multiple: true,
            checkStrictly: true,
          }
        },
      },

      selectValue: null,
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    dicType: {　　　　
      handler(newValue, oldValue) {　
        if (newValue) {
          this.controlOptions.dataSource = tapp.data.base_datadictionary[newValue.toLowerCase()];
        }
      },
      immediate: true,
    },
    data: {　　　　
      handler(newValue, oldValue) {　
        if (newValue) {
          this.controlOptions.dataSource = newValue;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.currentValue = this.value;
  },
  mounted() {},
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return this.selectValue;
      },
      set: function(val) {
        if ((!val || val.length == 0) && (!this.selectValue || this.selectValue.length == 0)) {
          return;
        }
        this.selectValue = val || [];
        this.$emit('input', this.selectValue);
        this.$emit('change', this.selectValue);
        this.$emit('blur');
        this.dispatch('ElFormItem', 'el.form.change', this.selectValue);   
      }
    },
    arrayData: {
      get: function() {
        return this.$util.treeToArray(this.controlOptions.dataSource);
      },
    },
    selectedData: {
      get: function() {
        if (!this.currentValue) {
          return [];
        }
        let dataList = null;
        if (!Array.isArray(this.currentValue)) {
          dataList = [this.currentValue];
        } else {
          dataList = this.currentValue.map(p => {
            let pp = p.split('/');
            return pp[pp.length - 1];
          })
        }
        let selectedItems = this.arrayData.filter(p => p && dataList.includes(p.id));
        return selectedItems;
      },
    },
  },
  mounted() {},
  methods: {
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0;
    },
  },
}
</script>

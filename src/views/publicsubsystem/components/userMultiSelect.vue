<template>
<div>

  <el-tag :key="tag.id" v-for="tag in currentValue" closable :disable-transitions="false" @close="handleClose(tag)">
    {{tag.name}}
  </el-tag>
  <el-button size="medium"  @click="onNew()">+点击选择</el-button>
  <open-dialog v-if="openDialogVisible" :init-data="currentValue" ref="openDialog" @select="onOpenDialogSelect"></open-dialog>
</div>
</template>
<script>
import OpenDialog from './userMultiSelectOpenDialog'
import emitter from 'element-ui/src/mixins/emitter';
export default {
  mixins: [emitter],
  components: {
    OpenDialog
  },
  props: {
     roleCategory: {
      type: String,
      required: false
    },
    roleId: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    value: {
      type: Array,
      default:()=> [],
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
      currentValue: [],
      openDialogVisible: false,
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
  },
  created() {
    this.currentValue = this.value;
  },
  mounted() {},
  computed: {},
  mounted() {},
  methods: {
    handleClose(tag) {
      this.currentValue.splice(this.currentValue.indexOf(tag), 1);
    },
    onNew() {
      if (this.disabled) {
        return;
      }
      this.openDialogVisible = true
      this.$nextTick(() => {
        this.$refs.openDialog.init(this.roleCategory, this.roleId,this.currentValue);
      })
    },
    onOpenDialogSelect(val) {
      this.openDialogVisible = false;
      this.currentValue = val;
      this.$emit('input', val);
      this.$emit('change', val);
      this.$emit('blur');
      this.dispatch('ElFormItem', 'el.form.change', self.currentValue);
    },
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0;
    },
  },
}
</script>

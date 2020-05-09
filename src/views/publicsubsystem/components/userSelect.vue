<template>
<div>
  <div v-if="!readOnly">
    <el-input ref="ref1" :placeholder="placeholder" v-model="currentText" v-on:click.native="onSelect()" readOnly="true" :disabled="disabled">
      <i class="el-icon-close el-input__icon" slot="suffix" @click.stop="onClear">
    </i>
    </el-input>
    <user-open-dialog v-if="userOpenDialogVisible" ref="userOpenDialog" @select="onUserOpenDialogSelect"></user-open-dialog>
  </div>
  <div v-else>
    <span>{{currentText}}</span>
  </div>
</div>
</template>
<script>
import UserOpenDialog from './userOpenDialog'
import emitter from 'element-ui/src/mixins/emitter';
export default {
  mixins: [emitter],
  components: {
    UserOpenDialog
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
      type: String,
      required: false
    },
    text: {
      type: String,
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
      userOpenDialogVisible: false,
      currentValue: null,
      currentText: null,
    }
  },
  watch: {
    value(value) {
      if(!value){
        this.currentValue = null;
        this.currentText = null;
      }else{
        this.currentValue = value;
      }
    },
    text(text) {
      this.currentText = text;
    }
  },
  created() {
    this.currentValue = this.value;
    this.currentText = this.text;
  },
  mounted() {},
  computed: {},
  mounted() {},
  methods: {
    onSelect() {
      if (this.disabled) {
        return;
      }
      this.userOpenDialogVisible = true
      this.$nextTick(() => {
        this.$refs.userOpenDialog.init(this.roleCategory, this.roleId);
      })
    },
    onClear(event) {
      if (this.disabled) {
        return;
      }
      this.currentText = null;
      this.currentValue = null;
      this.$emit('input', null);
      this.$emit('change', null);
      this.$emit('blur');
      this.dispatch('ElFormItem', 'el.form.change', null); 
       
    },
    onUserOpenDialogSelect(val) {
      this.userOpenDialogVisible = false;
      this.currentText = val.name;
      this.currentValue = val.id;
      let self = this;
      tapp.services.base_User.getUserWithDepartments(val.id).then(function(result) {
        self.$emit('input', result.id);
        self.$emit('change', result);
        self.$emit('blur');
        this.dispatch('ElFormItem', 'el.form.change', self.currentValue); 
    
      });
    },
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0;
    },
  },
}
</script>

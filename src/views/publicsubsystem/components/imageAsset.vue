<template>
<div>
  <div>
    <img class="el-upload-list__item-thumbnail" :src="file.url" :alt="file.name" style="height:146px">
    <span class="el-upload-list__item-actions">
       <span
         class="el-upload-list__item-preview"
         @click="handlePreview(file)"
       >
         <i class="el-icon-zoom-in"></i>
       </span>
    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
         <i class="el-icon-download"></i>
       </span>
    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
         <i class="el-icon-delete"></i>
       </span>
    </span>
  </div>
</div>
</template>
<script>
//ES6引入
export default {
  props: {
    file: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  data() {
    return {}
  },
  components: {

  },
  created() {


  },
  activated() {},
  computed: {},
  watch: {},
  methods: {
    handleDownload() {
      window.open(window.SITE_CONFIG['serverUrl'] + "/pmtapi/base_AssetManagement/download?id=" + this.file.id, '_blank');
    },
    handlePreview() {
      this.$emit('preview', this.file);
    },
    handleRemove() {
      let self = this;
      self.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tapp.services.base_Attachment.delete(this.file.id).then(function(result) {
          self.$emit('remove', self.file);
          self.$notify.success({
            title: '操作成功',
            message: '系统删除成功！'
          });
        })
      });
    },
  }

}
</script>
<style>
</style>

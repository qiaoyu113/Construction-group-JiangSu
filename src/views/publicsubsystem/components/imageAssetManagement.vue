<template>
<div>
  <ul class="el-upload-list el-upload-list--picture-card" v-if="limit == 1 && fileList.length>0">
    <li tabindex="0" class="el-upload-list__item is-success">
      <image-asset :file="fileList[0]" :disabled="disabled" @preview="handlePreview" @remove="handleRemove"></image-asset>
    </li>
  </ul>
  <el-upload v-else :multiple="multiple" :drag="drag" :limit="limit" :show-file-list="showFileList" :list-type="listType" :disabled="disabled" :action="fileUploadUrl" :data="fileData" :with-credentials="true" :file-list="fileList"
  :before-upload="onUploadBeforeSend" :on-success="onSuccess" :on-error="onError">
    <i slot="default" class="el-icon-plus  avatar-uploader-icon"></i>
    <div slot="file" slot-scope="{file}">
      <image-asset :file="file" :disabled="disabled" @preview="handlePreview" @remove="handleRemove"></image-asset>
    </div>
  </el-upload>
  <el-image-viewer v-if="fileViewerVisible" :on-close="handleCloseViewer" :url-list="imagelist" />
</div>
</template>
<script>
// 导入组件
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import ImageAsset from './imageAsset'
import {
  mapMutations,
  mapState,
} from 'vuex'

//ES6引入
export default {
  props: {
    businessDocId: {
      type: String,
      required: false
    },
    assetCategory: {
      type: String,
      required: false
    },
    multiple: { //是否支持多选文件
      type: Boolean,
      default: true,
      required: false
    },
    drag: { //是否启用拖拽上传
      type: Boolean,
      default: false,
      required: false
    },
    limit: { //最大允许上传个数
      type: Number,
      default: null,
      required: false
    },
    showFileList: { //是否显示已上传文件列表
      type: Boolean,
      default: true,
      required: false
    },
    listType: { //文件列表的类型	string	text/picture/picture-card
      type: String,
      required: false,
      default: 'picture-card',
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  data() {
    return {
      fileUploadUrl: '',
      fileViewerVisible: false,
      fileIdList: [],
      fileList: [],
      fileData: {},
    }
  },
  components: {
    ElImageViewer,
    ImageAsset
  },
  created() {
    this.fileUploadUrl = window.SITE_CONFIG['serverUrl'] + '/authapi/base_AssetManagement/upload';
    this.load();

  },
  activated() {},
  computed: {
    ...mapState({
      user: state => state.app.user,
    }),
    imagelist: {
      // 动态计算currentValue的值
      get: function() {
        let imglist = this.fileList.map((item) => {
          return item.url;
        });
        return imglist;
      },
    }
  },
  watch: {
    businessDocId(value) {
      this.load();
    }
  },
  methods: {
    isEmpty() {
      return this.fileList == null || this.fileList.length == 0;
    },
    load() {
      let self = this;
      tapp.services.base_Common.getSUIds(200).then(function(result) {
        self.fileIdList = result;
        self.loadViewFileList();
      });
    },
    getFileId() {
      if (this.fileIdList.length == 0) {
        this.$notify.info({
          title: '系统提示',
          message: '您超出最大文件上传个数！'
        });
        return null;
      }
      return this.fileIdList.shift();
    },

    handlePreview(file) {
      this.fileViewerVisible = true;
    },
    // 关闭查看器
    handleCloseViewer() {
      this.fileViewerVisible = false
    },
    handleRemove(file) {
      let self = this;
      let itemIndex = self.fileList.findIndex((innerItem) => {
        return innerItem.id == file.id;
      });
      self.fileList.splice(itemIndex, 1);
    },
    loadViewFileList() {
      if (!this.assetCategory || !this.businessDocId) {
        return;
      }
      let requestModel = {
        'businessDocId': this.businessDocId,
        "categoryId": this.assetCategory
      };
      let self = this;
      tapp.services.base_Attachment.getList(requestModel).then(function(result) {
        self.fileList = result.map(p => {
          return {
            'id': p.id,
            'name': p.name,
            'url': window.SITE_CONFIG['serverUrl'] + "/pmtapi/base_AssetManagement/view?id=" + p.id,
          };
        })
      });
    },
    doRefresh() {
      this.loadViewFileList();
    },
    onUploadBeforeSend(file) {
      this.fileData.fid = this.getFileId();
      this.fileData.id = this.fileData.fid;
      this.fileData.businessDocId = this.businessDocId;
      this.fileData.attachmentCategoryId = this.assetCategory;
      this.fileData.name = file.name;
      this.fileData.size = file.size;
      this.fileData.type = file.type;
      this.fileData.lastModifiedDate = file.lastModifiedDate;
      this.fileData.multiple = false;
    },
    onSuccess(response, file, fileList) {
      this.fileList.push(file);
    },
    onError(err, file, fileList) {
      this.$notify.error({
        title: '文件上传失败',
        message: err
      });
    },
  }

}
</script>
<style>

</style>

<template>
  <el-row class="sub-title" :gutter="20">
    <el-col>
      <div style="display: flex;">
        <div class="title">{{title}}</div>
        <div v-if="!readOnly" class="extra" @click="handleExtraClick">{{extra}}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
   components: {},
   props: {
     title: {
       type: String,
       default: '',
       required: true
     },
     extra: {
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
   data () { return {} },
   watch: {},
   created () {},
   mounted () {},
   computed: {},
   methods: {
     handleExtraClick() {
       this.$emit('extraClick')
     }
   }
}
</script>
<style lang="scss">
@import '../../assets/scss/_variables.scss';
.sub-title .title {
  font-weight: 500;
  font-size: 15px;
  color: #333;
  padding: 0 0 12px 0;
  z-index: 100;
  background: transparent;
  width: fit-content;
}
.sub-title .title:after {
  content: '';
  background: #5E98F8;
  height: 6px;
  position: relative;
  display: block;
  border-radius:8px;
  transform: translate(0, 1px);
  z-index: 1;
}
.sub-title .el-row-hr {
  margin-top: 0;
}
.sub-title .extra {
  font-size: 14px;
  color: #5E98F8;
  margin-left: 25px;
  padding-top: 2px;
  cursor: pointer;
}
</style>


<template>
  <el-row class="sub-title" :gutter="20">
    <el-col>
      <div class="title">{{title}}</div>
      <hr class="el-row-hr" />
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
   },
   data () { return {} },
   watch: {},
   created () {},
   mounted () {},
   computed: {},
   methods: {}
}
</script>
<style lang="scss">
@import '../../assets/scss/_variables.scss';
.sub-title .title {
  font-weight: 500;
  font-size: 14;
  color: #303133;
  padding: 12px 0;
  background: $background-sub-title;
  padding-left: 10px;
}
.sub-title .el-row-hr {
  margin-top: 0;
}
</style>


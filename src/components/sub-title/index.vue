<template>
  <el-row class="sub-title" :gutter="20">
    <el-col>
      <div>
        <div class="title-background"></div>
        <div class="title">{{title}}</div>
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
  font-size: 20px;
  color: #333;
  padding: 12px 0;
  padding-left: 28px;
  z-index: 20000;
  background: transparent;
  width: fit-content;
}
.sub-title .title:after {
  content: '';
  background: #5E98F8;
  height: 8px;
  position: relative;
  display: block;
  border-radius:8px;
  transform: translate(20px, -10px);
  // top: 35px;
  z-index: 1;
}
.sub-title .el-row-hr {
  margin-top: 0;
}
</style>


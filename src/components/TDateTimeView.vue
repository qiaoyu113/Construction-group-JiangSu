<template>
<div>
  <i class="el-icon-time"></i>
  <span style="margin-left: 2px">{{currentValue }}</span>
</div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
  },
  data() {
    return {}
  },
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        if (!this.value) {
          return '';
        }
        if(this.type == 'datetime'){
          return this.$util.datetimeFormat(this.value);
        }
        return this.$util.dateFormat(this.value);
      },
    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {}
}
</script>

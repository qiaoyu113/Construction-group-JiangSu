
<template>
</template>
<script>
import {
  mapMutations,
  mapState,
} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isLoading: state => state.ui.isLoading,
    }),
  },
  created() {},
  activated() {},
  methods: {
    resetData() {

      Object.assign(this.$data, this.$options.data());
    },
  }
}
</script>

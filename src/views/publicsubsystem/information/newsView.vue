<template>
<div id="newscontent">
  <h1 style="text-align: center;">{{model.title}}</h1>
  <span style="color: gainsboro;">{{ $util.datetimeFormat(model.gmtCreatedOn) }}</span>
  <p>
    <div v-html="model.content"></div>
  </p>
</div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      docId: null,
      model: {}
    }
  },
  components: {},
  created() {
    this.docId = this.$route.query.id;
    this.load();
  },
  mounted() {},
  computed: {

  },
  methods: {
    load() {
      let self = this;
      if (self.docId) {
        tapp.services.base_Information.get(self.docId).then(function(result) {
          self.model = self.$util.deepObjectAssign({},self.model,result);
        });
      }
    },
  }
}
</script>
<style lang="scss" scoped>
#newscontent div {
  position: relative;
  margin: 10%;
}

#newscontent img {
  max-width: 300px;
  border: 1px dashed #000;
  width: expression(document.body.clientWidth>document.getElementById("newscontent").scrollWidth*9/10? "300px": "auto");
}

p {
  text-align: left;
}
</style>

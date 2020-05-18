<template>
  <div class="workflow-map" :style="{height: hasKey ? '500px' : '200px'}">
    <div v-if="hasKey" id="canvas" ref="canvas" :style="{width: 100 * scale + '%',height: 100 * scale + '%'}"></div>
    <div v-else class="no-map">
      没有可展示的流程图
    </div>
  </div>
</template>

<script>
import BpmnViewer from "bpmn-js/lib/Viewer";
export default {
  components: {},
  props: {
    businessKey: {
      type: String,
      default: "",
      required: false,
    },
  },
  data() {
    return {
      code: "",
      containerEl: null,
      bpmnModeler: null,
      scale: 1,
      hasKey: true
    };
  },
  watch: {},
  created() {
    this.codeView(this.businessKey);
  },
  mounted() {},
  computed: {},
  methods: {
    codeView(businessKey) {
      let self = this;
      if(businessKey) {
        tapp.services.wf_Model.codeRead(businessKey).then(function (result) {
          if(result) {
            self.code = result;
            self.hasKey = true
            self.previewTemp(self.code);
          } else {
            self.hasKey = false
          }
        });
      } else {
        self.hasKey = false
      }
    },
    previewTemp(xml) {
      this.containerEl = document.getElementById("canvas");
      // 避免缓存，每次清一下
      this.bpmnModeler && this.bpmnModeler.destroy();
      this.scale = 1;
      this.bpmnModeler = new BpmnViewer({ container: this.containerEl });
      const viewer = this.bpmnModeler;
      this.bpmnModeler.importXML(xml, (err) => {
        if (err) {
          console.error(err);
        } else {
          const canvas = viewer.get("canvas");
          canvas.zoom("fit-viewport");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.workflow-map {
  width: 100%;
  height: 500px;
  .bjs-powered-by {
    display: none;
  }
  svg {
    height: 500px;
  }
  .viewport {
    transform: matrix(0.856899, 0, 0, 0.856899, -11.9966, -29.1346) scale(0.8);
    transform-origin: 50% 35% 0
  }
  .no-map {
    color: #838383;
    font-size: 14px;
    text-align: center;
    padding: 90px;
  }
}
</style>

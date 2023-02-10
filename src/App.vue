<template>
  <div class="view">
    <div class="view__content">
      <visualzeFlow></visualzeFlow>
    </div>
    <TabBar />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TabBar from "./components/TabBar.vue";
import visualzeFlow from "./components/visualzeFlow.vue";
export default defineComponent({
  name: "App",
  components: {
    TabBar,
    visualzeFlow,
  },
  setup() {
    const show = ref(true);
    const isBg = ref(false);
    const hash = ref("");
    // @ts-ignore
    const displayHeader = (payload: any) => {
      // @ts-ignore
      show.value = payload?.show;
      // @ts-ignore
      isBg.value = payload?.isBg;
      // @ts-ignore
      hash.value = payload?.hash;
    };
    return {
      displayHeader,
      show,
      isBg,
      hash,
    };
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .view {
    position: relative;
  }
  .view__header {
    // background-color: rgba(18, 18, 18, 0.34);
    // height: 64px;
    // position: -webkit-sticky;
    // position: sticky;
    position: absolute;
    top: 0;
    z-index: 999;
    min-width: 1200px;
    // &:hover {
    //   visibility: visible;
    // }
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .view__content {
    // position: relative;
    // width: 100%;
    // min-width: 1200px;
    // min-height: 800px;
    // height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
}
</style>

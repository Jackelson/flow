<template>
  <div
    class="frame"
    :class="{ framBorder: isBorder }"
    :style="{
      height: `${height}px`,
      // border: isBorder ? '1px dashed #bde4f9' : 'none',
      flexDirection,
      justifyContent,
    }"
  >
    <slot></slot>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <span
      class="
        frame__horn frame--lt
      "
    ></span>
    <span
      class="
        frame__horn frame--rt
      "
    ></span>
    <span
      class="
        frame__horn frame--lb
      "
    ></span>
    <span
      class="
        frame__horn frame--rb
      "
    ></span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Frame",
  components: {},
  props: {
    height: Number,
    isBorder: Boolean,
    flexDirection: String,
    justifyContent: String,
  },
  setup() {},
});
</script>
<style lang="scss">
.frame {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.frame__horn {
  position: absolute;
  padding: 15px;
  border-style: solid;
  border-color: #bde4f9;
}
.frame--lt {
  left: -1px;
  top: -1px;
  border-width: 4px 0 0 4px;
}
.frame--rt {
  right: -1px;
  top: -1px;
  border-width: 4px 4px 0 0;
}
.frame--lb {
  left: -1px;
  bottom: -1px;
  border-width: 0 0 4px 4px;
}
.frame--rb {
  right: -1px;
  bottom: -1px;
  border-width: 0 4px 4px 0;
}
.framBorder {
  padding: 0 4px;
  box-sizing: border-box;
  box-shadow: inset 0 0 10px #bde4f9;
}
</style>

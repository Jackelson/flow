<template>
  <div>
    <div class="top_bar" ref="tbRef" @click="changeMenuStatus"></div>
    <div ref="menuRef" class="menu_box">
      <ul class="menu" v-show="show">
        <li @click="jump('http://10.101.80.10:8001/flow/#/flow')">
          <img src="../../public/images/home.jpg" alt="回到主页" />
          <p>回到主页</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="backGround" v-show="show" @click="changeMenuStatus"></div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let menuRef = ref();
    let tbRef = ref();
    let show = ref(false);
    const changeMenuStatus = () => {
      if (tbRef.value.className === "top_bar") {
        tbRef.value.className = "top_bar top_bar_alive";
        menuRef.value.className = "menu_box menu_alive";
        show.value = true;
      } else {
        tbRef.value.className = "top_bar";
        menuRef.value.className = "menu_box";
        show.value = false;
      }
    };
    const jump = (url) => {
      window.location.href = url;
    };
    return {
      menuRef,
      show,
      tbRef,
      changeMenuStatus,
      jump,
    };
  },
});
</script>

<style lang="scss" scoped>
.backGround {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
}
.top_bar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 200px;
  height: 10px;
  border-radius: 5px;
  background: rgba($color: #fff, $alpha: 0.5);
  z-index: 999999999;
  transition: all 0.5s ease;
}
.top_bar_alive {
  width: 230px;
  height: 20px;
  border-radius: 10px;
  background-color: rgb(253, 170, 123);
}
.menu_box {
  position: absolute;
  left: 50%;
  // background-color: rgba($color: rgb(207, 207, 207), $alpha: 0.8);
  transform: translate(-50%, -50%);
  top: 50%;
  z-index: 99999;
  background: transparent;
  // border-radius: 10vh;
  border-radius: 20px;
  width: 10vh;
  height: 10vh;
  z-index: 0;
  // display: none;
  transition: all 0.2s ease;
  .menu {
    width: 10vh;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      img {
        width: 7vh;
      }
      p {
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
    }
  }
}
.menu_alive {
  background: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  z-index: 999999999;
}
</style>

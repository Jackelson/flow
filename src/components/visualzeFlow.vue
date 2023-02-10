<template>
  <div class="visualzeFlow">
    <div class="visualzeFlow__left">
      <div class="visualzeFlow__left--analyze">
        <frame :height="400" :isBorder="false" justifyContent="space-between">
          <div class="visualzeFlow__left--interact">
            <div
              class="header"
              :style="{ backgroundImage: `url(${visualzeBgSmall})` }"
            >
              <img :src="visualzeIntentIcon" />
              <h4>视觉意图</h4>
            </div>
            <div class="content video">
              <Video />
            </div>
          </div>
          <div class="visualzeFlow__left--interact">
            <div
              class="header"
              :style="{ backgroundImage: `url(${visualzeBgSmall})` }"
            >
              <img :src="visualzeSenseIcon" />
              <h4>近场感知</h4>
            </div>
            <div class="content content__sense">
              <div class="circle">
                <p>3米</p>
                <div class="in-circle">
                  <p>2米</p>
                  <div class="circle">
                    <p>1米</p>
                  </div>
                </div>
                <img
                  v-if="viewDeg"
                  src="../../public/images/ange.png"
                  :style="{ transform: `rotate(${viewDeg - 45}deg)` }"
                />
                <img
                  v-if="!viewDeg"
                  src="../../public/images/ange.png"
                  :style="{ transform: `rotate(-45deg)` }"
                />
                <div
                  class="dot"
                  v-for="(item, index) in perception"
                  :key="`dot_${index}`"
                  :style="{
                    left: `${item?.locationX}px`,
                    top: `${item?.locationY}px`,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div class="visualzeFlow__left--interact">
            <div
              class="header"
              :style="{ backgroundImage: `url(${visualzeBgSmall})` }"
            >
              <img :src="visualzeWakeIcon" />
              <h4>语音唤醒</h4>
            </div>
            <div class="content content__wake">
              <div
                class="circle"
                :style="
                  msg?.wakeupAngle !== null && msg?.wakeupAngle !== undefined
                    ? { animation: 'twinkling 1s infinite ease-in-out' }
                    : {}
                "
              >
                <img
                  :src="visualzeWakeAngle"
                  :style="{
                    transform:
                      msg?.wakeupAngle !== null &&
                      msg?.wakeupAngle !== undefined
                        ? `rotate(${msg?.wakeupAngle + 45}deg)`
                        : 'rotate(45deg)',
                  }"
                />
              </div>
              <p
                v-if="
                  msg?.wakeupAngle !== null && msg?.wakeupAngle !== undefined
                "
              >
                {{ msg?.wakeupAngle }}<span>o</span>
              </p>
              <p v-else>睡眠</p>
            </div>
          </div>
        </frame>
      </div>
      <div class="visualzeFlow__left--understanding">
        <frame :height="437" :isBorder="true">
          <template v-slot:header>
            <div
              class="header"
              :style="{ backgroundImage: `url(${visualzeBgLong})` }"
            >
              <h4>任务理解</h4>
            </div>
          </template>
          <template v-slot:content>
            <div class="content">
              <div class="input">
                <img :src="visualzeInput" />
                <p class="input__title">输入</p>
                <p
                  style="width:1140px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                >
                  {{ msg?.taskUnstanding?.input }}
                </p>
              </div>
              <div class="output">
                <img :src="visualzeOutput" />
                <p class="output__title">输出</p>
                <div class="output__content">
                  <ul>
                    <li>
                      <p
                        style="width:220px;height: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;"
                      >
                        {{ msg?.taskUnstanding?.output?.sub }}
                      </p>
                      <p>主体</p>
                    </li>
                    <li>
                      <p
                        style="width:220px;height: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;"
                      >
                        {{ msg?.taskUnstanding?.output?.action }}
                      </p>
                      <p>行为</p>
                    </li>
                    <li>
                      <p
                        style="width:220px;height: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;"
                      >
                        {{ msg?.taskUnstanding?.output?.obj }}
                      </p>
                      <p>对象</p>
                    </li>
                    <li>
                      <p
                        style="width:220px;height: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;text-align: center;"
                      >
                        {{ msg?.taskUnstanding?.output?.destination }}
                      </p>
                      <p>目的地</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
        </frame>
      </div>
      <div style="position: absolute;top: 920px;left: 750px;z-index: 9999;">
        <img
          style="transform: rotate(90deg);"
          src="../assets/iconfont/right.gif"
        />
      </div>
      <div class="visualzeFlow__left--behaviourtree">
        <frame :height="1140" :isBorder="true" flexDirection="column">
          <template v-slot:header>
            <div
              class="header"
              :style="{ backgroundImage: `url(${visualzeBgShort})` }"
            >
              <h4>行为树</h4>
              <div class="history" style="display: flex; margin-right: 10px;">
                <p
                  style="margin-right: 20px;width: 40px; background-color: deepskyblue;height: 40px;margin-top: 10px;border-radius: 10px;line-height: 40px;text-align: center;"
                  @click="
                    nodeTree = JSON.parse(
                      treeList[treeList.length - 1]?.content
                    )
                  "
                >
                  <img
                    src="../../public/images/return.png"
                    style="height: 30px;width: 30px;cursor: pointer;margin-top: 5px;"
                    alt=""
                  />
                </p>
                <h4>历史行为树</h4>
                <select
                  style="width: 150px; height:50px;margin-left: 20px;"
                  onmousedown="if(options.length>50){size=30}"
                  onchange="size=0"
                  @change="getTreeD"
                  v-model="nodeName"
                >
                  <option v-for="n in treeList" :key="n.id" :value="n.id">{{
                    n.title
                  }}</option>
                </select>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <div class="content">
              <tree
                :nodeTree="nodeTree"
                :changeNode="changeNode"
                :treeList="treeList"
              />
            </div>
          </template>
        </frame>
      </div>
    </div>
    <div>
      <div
        style="position: absolute;z-index: 9999;top: 225px;transform: translate(-50%);"
        :style="{ left: dWdith + 'px' }"
      >
        <img src="../assets/iconfont/right.gif" />
      </div>
      <div
        style="position: absolute;z-index: 9999;top: 687px;transform: translate(-50%);"
        :style="{ left: dWdith + 'px' }"
      >
        <img
          style="transform: rotate(180deg);"
          src="../assets/iconfont/right.gif"
        />
      </div>
    </div>
    <div class="visualzeFlow__right" style="position:relative">
      <div class="visualzeFlow__right--knowledgegraph">
        <frame :height="2059" :isBorder="true" flexDirection="column">
          <template v-slot:header>
            <div
              class="header"
              style="background: linear-gradient(to bottom,rgba(92,140,177, 0.3) 30%,#161D31);background-repeat: no-repeat;background-size: 100% 50%;"
            >
              <h4>知识库</h4>
              <div class="groups">
                <ul>
                  <li
                    v-for="(item, index) in visualzeGraph"
                    :key="index"
                    style="cursor: pointer"
                  >
                    <div
                      class="img__wrapper"
                      :style="{ backgroundColor: item.color }"
                      @click="resetGraphData(item.type)"
                    >
                      <img :src="item.img" style="width: 44px; height: 42px;" />
                    </div>
                    <p>{{ item.title }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <div class="content">
              <visualze :knowMap="msg?.knowMap" ref="visualize" />
              <!-- <bubbles :knowMap="msg?.knowMap" /> -->
            </div>
          </template>
        </frame>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import frame from "./frame.vue";
import visualze from "./visualze.vue";
import Video from "./video.vue";
import tree from "./tree.vue";
import useMQTT from "@/utils/mqtt";
const constant = require("../data/constant.json");
import { getNodetree } from "@/composition/getTree";
import { getDetail } from "@/composition/getDetail";
import resize from "@/composition/resize";
import { setRadar } from "@/composition/radars";
export default defineComponent({
  name: "VisualzeFlow",
  components: {
    frame,
    visualze,
    tree,
    Video,
  },
  setup(prop, context) {
    const visualze = ref(constant.visualze);
    // 行为树对象
    // 历史行为树名字
    const nodeName = ref("");
    // 知识库类别点击事件
    const visualize = ref();

    // 返回主页面函数
    function returnMain() {
      window.location.replace("http://10.101.80.10:8001/flow/#/flow");
    }

    const resetGraphData = (type: any) => {
      visualize.value.resetGraphData(type);
    };
    // @ts-ignore
    const {
      msg,
      nodeTree,
      changeNode,
      viewDeg,
    } = useMQTT("ws://10.5.24.28:8083/mqtt", [
      "visualization/tree",
      "screen/13/wakeup_angle",
      "screen/13/version_human",
      "/tu/command",
      "web/show",
      "event/13/btree",
      "robotOrientation",
    ]);
    const {
      webpack: visualzeBgSmall,
      visualzeBgLong,
      visualzeIntentIcon,
      visualzeSenseIcon,
      visualzeWakeIcon,
      visualzeWakeAngle,
      visualzeInput,
      visualzeOutput,
      visualzeBgShort,
      visualzeGraph,
    } = visualze.value;
    context.emit("displayHeader", {
      show: window.location.hash === "#/visualze",
      isBg: false,
      hash: window.location.hash,
    });
    return {
      visualzeBgSmall,
      visualzeBgLong,
      visualzeIntentIcon,
      visualzeSenseIcon,
      visualzeWakeIcon,
      visualzeWakeAngle,
      visualzeInput,
      visualzeOutput,
      visualzeBgShort,
      visualzeGraph,
      msg,
      nodeTree,
      changeNode,
      nodeName,
      visualize,
      resetGraphData,
      ...getNodetree(),
      ...getDetail(nodeTree, nodeName),
      ...resize(),
      ...setRadar(),
      viewDeg,
      returnMain,
    };
  },
});
</script>
<style lang="scss">
// 近场感知和语音唤醒圆的大小
$width: 240px;
// 距顶部距离
$top: -30px;
p,
h4 {
  font-size: 40px;
  font-weight: 400;
  color: #fff;
}
.video {
  margin-top: -20px;
}
.visualzeFlow {
  background-color: #161d31;
  width: 100%;
  min-width: 3840px;
  min-height: 2160px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 46px;
}
.visualzeFlow__left--analyze {
  position: relative;
  width: 1476px;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.visualzeFlow__left--interact {
  width: 460px;
  // border: 1px solid #bde4f9;
  box-shadow: inset 0 0 10px #bde4f9;
  .header {
    width: 100%;
    height: 162px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 112px 53px 60px;
    .history {
      display: flex;
    }
    img {
      width: 80px;
      height: 80px;
    }
    h4 {
      font-size: 40px;
      color: #b3e5fc;
    }
  }
  .content {
    justify-content: center;
    display: flex;
  }

  .content__sense {
    padding: 0 79px 80px 68px;
    margin-top: $top;
    .circle {
      width: $width;
      height: $width;
      border: 2px solid #bde4f9;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      img {
        width: $width/2;
        height: $width/2;
        position: absolute;
        top: 0px;
        left: $width/2;
        transform-origin: bottom left;
      }
      p {
        position: absolute;
        font-size: 13px;
        right: 0;
        top: $width/2;
      }
      .dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #edbd00;
        position: absolute;
        z-index: 9999999;
      }
      .in-circle {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: $width * 2/3;
        height: $width * 2/3;
        border: 2px solid #bde4f9;
        border-radius: 50%;
        p {
          right: 0;
          top: $width * 2/3/2;
          right: 0;
        }
        .circle {
          width: $width * 1/3;
          height: $width * 1/3;
          border: 2px solid #bde4f9;
          border-radius: 50%;
          p {
            right: 0;
            top: $width * 1/3/2;
            right: 0;
          }
        }
      }
    }
    .circle::before {
      content: "";
      display: block;
      width: 0.5px;
      height: $width;
      background: #bde4f9;
      position: absolute;
    }
    .circle::after {
      content: "";
      display: block;
      width: $width;
      height: 0.5px;
      background: #bde4f9;
      position: absolute;
    }
    .tips {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
    }
  }
  .content__wake {
    width: 100%;
    position: relative;
    margin-top: $top;
    .circle {
      width: $width;
      height: $width;
      border: 8px solid #4394ff;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      img {
        width: $width/2;
        position: absolute;
        left: $width/2;
        transform-origin: bottom left;
      }
    }
    p {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span {
      font-size: 24px;
      position: absolute;
      top: -5px;
      right: -15px;
    }
  }
}
.visualzeFlow__left--understanding {
  margin-top: 42px;
  margin-bottom: 40px;
  position: relative;
  .header {
    height: 200px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    padding: 20px 0 0 40px;
  }
  .content {
    position: absolute;
    top: 140px;
    display: flex;
    flex-direction: column;
    width: 100%;
    img {
      width: 65px;
      height: 57px;
    }
    .input,
    .output {
      display: flex;
      flex-direction: row;
      padding: 0 0 0 69px;
      width: 100%;
    }
    .input {
      margin-bottom: 56px;
    }
    .input__title,
    .output__title {
      color: #b3e5fc;
      margin-left: 20px;
      margin-right: 60px;
    }
    .output__content {
      width: 80%;
      ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          p:last-child {
            margin-bottom: 20px;
            margin-top: 20px;
          }
        }
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        li:nth-child(1) {
          p {
            color: #fadd81;
          }
        }
        li:nth-child(2) {
          p {
            color: #ffa4c0;
          }
        }
        li:nth-child(3) {
          p {
            color: #9dd0ff;
          }
        }
        li:nth-child(5) {
          p {
            color: #c4a1fe;
          }
        }
      }
    }
  }
}
.visualzeFlow__left--behaviourtree {
  .header {
    height: 100px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0 0 40px;
  }
  .content {
    position: absolute;
    top: 97px;
    width: 100%;
  }
}
.visualzeFlow__right--knowledgegraph {
  width: 2226px;
  height: 2067px;
  .header {
    position: relative;
    width: 100%;
    padding: 19px 0 0 31px;
    flex-direction: column;
    height: auto;
    .groups {
      display: flex;
      flex-direction: row-reverse;
    }
    ul {
      display: flex;
      flex-direction: row;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 42px;
      }
      .img__wrapper {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
      }
      p {
        font-size: 24px;
        font-weight: 300;
        line-height: 60px;
      }
    }
  }
  .content,
  .visualze {
    height: 100%;
  }
  svg {
    margin: 0;
    // padding: 30px;
  }
}
@keyframes twinkling {
  0% {
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  50% {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  100% {
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
}
@-webkit-keyframes twinkling {
  0% {
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  50% {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  100% {
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
}
</style>

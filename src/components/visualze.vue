<template>
  <div class="visualze" id="visualize"></div>
  <ul class="box"></ul>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import ForceGraph3D from "3d-force-graph";
import SpriteText from "three-spritetext";
import { getMotion } from "../api/graph";
import initData from "../data/graph.json";
import {
  CSS2DRenderer,
  // CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import Storage from "../utils/storage";
//定义ForceGraph3D对象
let Graph;
// let taskQueues = []; //任务推理执行的任务队列
// let timer = null; //定义聚焦延时器
// let taskQueuesTimer = null; //定义任务队列执行定时器
let spinTimer = null; //定义旋转定时器
let delayedExecution = null; //定义旋转延时器
let angle = 0; //记录旋转点
// let showListTimer = null;
let i = 0; //高亮节点下标
const highlightData = [
  {
    classify: "ontology",
    highLight: 0,
    id: 259,
    level: 0,
    singleTag: "项目管理_ontology",
    title: "项目管理",
  },
  {
    classify: "concept",
    highLight: 0,
    id: 917,
    level: 0,
    singleTag: "ChangeEvent19_concept",
    title: "ChangeEvent19",
  },
  {
    classify: "motion",
    highLight: 0,
    id: 740478,
    level: 0,
    singleTag: "讲解_motion",
    title: "讲解",
  },
];

export default defineComponent({
  name: "Visualze",
  components: {},
  props: {
    knowMap: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    // 颜色列表
    let colorList = new Map();
    colorList.set("concept", "rgb(109,230,151)");
    colorList.set("env", "rgb(232,216,127)");
    colorList.set("motion", "rgb(128,179,230)");
    colorList.set("ontology", "rgb(164,99,230)");
    colorList.set("algo", "rgb(233,131,131)");
    colorList.set("action", "rgb(230,96,96)");
    // 高亮节点以及边列表
    let highLightnode = 0;
    // let highLightlinksList = ref();
    let showList = ref([]);
    // 是否双击
    let doubleClickFlag = false;
    onMounted(() => {
      init(initData);
      setInterval(() => {
        i++;
        if (i >= highlightData.length) {
          i = 0;
        }
        autoHighlight(highlightData[i]);
      }, 10000);
    });

    const autoHighlight = async (node) => {
      GraphSpin();
      highLightnode = node.id;
      Graph.nodeColor(Graph.nodeColor());
      let box = document.querySelector(".box");
      let res = await getMotion({
        dsp: "normal",
        name: node.title,
      });
      let li = document.createElement("li");
      li.innerHTML = `<div style="text-align:center">节点详情</div>vars:${res.data[0]?.vars}<br/>dsp:${res.data[0]?.dsp}<br/>motionId:${res.data[0]?.motionId}<br/>name:${res.data[0]?.name}`;
      li.setAttribute(
        "style",
        "list-style: none;background-color: #161d31;border: 6px solid green;white-space: nowrap;margin-top: 10px;color: white;font-size: 20px;position: relative;transition: all 1s ease;opacity: .7;top: 0;border-radius:10px;padding:10px 5px"
      );
      box.insertBefore(li, box.children[0]);
      if (box.children[3]) {
        box.children[3].style.opacity = 0;
        box.children[3].style.top = "100px";
        setTimeout(() => {
          box.removeChild(box.children[3]);
        }, 800);
      }
    };

    // 重置数据
    let directivesRecord = "all";
    function resetGraphData(directives) {
      if (directivesRecord !== directives) {
        let { nodes, links } = Storage.getItem("initData");
        if (directives === "all") {
          Graph.graphData({ nodes, links });
        } else {
          const node = nodes.filter((item) => {
            return item.classify === directives;
          });
          const nodeList = node.map((item) => item.id);
          const link = links.filter((item) => {
            if (
              nodeList.includes(item.source) &&
              nodeList.includes(item.target)
            )
              return item;
          });
          Graph.graphData({ nodes: node, links: link });
        }
        directivesRecord = directives;
      }
      GraphSpin();
    }
    // Graph旋转  在不进行操作的时候进行旋转
    function GraphSpin() {
      clearTimeout(delayedExecution);
      clearInterval(spinTimer);
      delayedExecution = null;
      spinTimer = null; //先清空之前的状态
      delayedExecution = setTimeout(() => {
        spinTimer = setInterval(() => {
          Graph.cameraPosition(
            {
              x: 1000 * Math.sin(angle),
              z: 1000 * Math.cos(angle),
            },
            { x: 0, y: 0, z: 0 },
            7000
          );
          //angle的状态需要一直记录
          angle += Math.PI / 2;
        }, 13000);
      }, 30000);
    }
    // 双曲线位置函数
    function getQuadraticXY(t, sx, sy, sz, cp1x, cp1y, cp1z, ex, ey, ez) {
      return {
        x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
        y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey,
        z: (1 - t) * (1 - t) * sz + 2 * (1 - t) * t * cp1z + t * t * ez,
      };
    }

    function init(value) {
      GraphSpin();
      const visualize = document.getElementById("visualize");
      Graph = ForceGraph3D({
        extraRenderers: [new CSS2DRenderer()],
      })(visualize)
        .height(1845)
        .width(visualize.clientWidth)
        .graphData(value)
        .backgroundColor("#161d31")
        .nodeOpacity(0.5)
        .nodeColor((node) => {
          if (highLightnode == node.id) {
            const distance = 400;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            const newPos =
              node.x || node.y || node.z
                ? {
                    x: node.x * distRatio,
                    y: node.y * distRatio,
                    z: node.z * distRatio,
                  }
                : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)
            Graph.cameraPosition(
              newPos, // new position
              node, // lookAt ({ x, y, z })
              1500 // ms transition duration
            );
            return "red";
          } else {
            return colorList.get(node.classify);
          }
        })
        //给节点添加文字
        .nodeThreeObjectExtend(true)
        .nodeThreeObject((node) => {
          const sprite = new SpriteText(node.title);
          sprite.material.depthWrite = false; // make sprite background transparent
          sprite.textHeight = 5;
          sprite.color = "white";
          return sprite;
        })
        .nodeResolution(25) //控制节点精细度  值越高  渲染代价越大
        .onNodeClick((node) => {
          // Aim at node from outside it
          const distance = 400;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
          const newPos =
            node.x || node.y || node.z
              ? {
                  x: node.x * distRatio,
                  y: node.y * distRatio,
                  z: node.z * distRatio,
                }
              : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)
          Graph.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            1000 // ms transition duration
          );
          // 点击聚焦完之后进行旋转
          GraphSpin();
        })
        .linkOpacity(1)
        // 设置高亮
        .linkColor(() => "#87CEFA")
        .linkDirectionalArrowResolution(100)
        // 给关系添加文字
        .linkThreeObjectExtend(true)
        .linkWidth(() => 0.6)
        .linkThreeObject((link) => {
          const sprite = new SpriteText(`${link.title}`);
          sprite.color = "white";
          sprite.textHeight = 3;
          return sprite;
        })
        .onBackgroundClick(() => {
          if (doubleClickFlag) {
            Graph.cameraPosition({ x: 0, y: 0, z: 1200 });
            doubleClickFlag = false;
          } else {
            doubleClickFlag = true;
            setTimeout(() => {
              doubleClickFlag = false;
            }, 400);
          }
          GraphSpin();
        })
        // 给节点文字关系设置位置  双向关系设置为曲线
        .linkPositionUpdate((sprite, { start, end }, link) => {
          if (link.__curve) {
            const middlePos = getQuadraticXY(
              0.5,
              start.x,
              start.y,
              start.z,
              link.__curve.v1.x,
              link.__curve.v1.y,
              link.__curve.v1.z,
              end.x,
              end.y,
              end.z
            );
            Object.assign(sprite.position, middlePos);
          }
          // 格外的
          else {
            const middlePos = Object.assign(
              ...["x", "y", "z"].map((c) => ({
                [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
              }))
            );
            Object.assign(sprite.position, middlePos);
          }
        })

        //添加箭头
        .linkDirectionalArrowLength(4)
        // 箭头位置
        .linkDirectionalArrowRelPos(1)
        // 添加自动播放的移动小球
        // .linkDirectionalParticles(2)
        .linkCurveRotation(2)
        .linkDirectionalParticles(() => 0)
        .linkDirectionalParticleWidth(2)
        .linkCurvature((link) => {
          //给双重关系设置为曲线
          if (link.source === link.target) return 0.6;
          return link.isDouble ? 0.4 : 0;
        });
    }
    return {
      showList,
      resetGraphData,
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 200px;
  right: 20px;
}
</style>

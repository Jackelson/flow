<template>
  <div class="edw" id="mountNode">
    <span class="iconfont icon-jiantou_xiangyou_o"></span>
  </div>
</template>
<script>
import G6 from "@antv/g6";
import { filter } from "@/utils/hadelData";
import rect from "@/utils/rect";
import ellipse from "@/utils/ellipse";
import diamond from "@/utils/diamond";
// 数组去重
// function unique(arr) {
//   let unique = {};
//   arr.forEach(function(item) {
//     unique[JSON.stringify(item)] = item; //键名不会重复
//   });
//   arr = Object.keys(unique).map(function(u) {
//     //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
//     return JSON.parse(u);
//   });
//   return arr;
// }
// 图配置
let graph = null;
// 防止行为树刷新过快，达到一定时间之后再进行执行
let timeout = null;
// 记录状态执行到的位置
let count = 0;
// 已经执行过的状态
let node = [];
// 未执行的状态列表
let changes = [];
// 设置一个锁
let lock = false;
// 添加图例
let legend = null;
export default {
  data() {
    return {
      // 渲染的节点数据
      data: null,
      // 判断是否是首次渲染
      isFirst: true,
      // 定时器， 定时去状态列表拿状态执行
      tive: null,
    };
  },
  props: ["nodeTree", "changeNode", "treeList"],
  created() {
    // 进行边配置;
    this.eageoption();
    // 进行节点配置
    this.nodeOption();
    // 进行图例渲染
    this.initLegend();
  },
  mounted() {
    // 获取数据webpack://front_cloudbrain_portal/node_modules/@antv/g6-core/es/item/item.js?425b
    this.openIntaval();
    if (this.treeList) {
      this.data = filter(this.treeList);
      this.initG6();
    }
  },
  watch: {
    nodeTree: {
      handler(n, o) {
        if (n.btreeXmlUrl != o.btreeXmlUrl) {
          lock = false;
          this.data = filter(n);
        }
        timeout;
        // 一段时间之后行为树不更新，将节点添加上样式
        if (lock) return;
        timeout = setTimeout(() => {
          node.forEach((item) => {
            this.changeStatus(item, true);
          });
          // 数组去重
          // changes = unique(changes);
          // 查看当前数据中是否存在，状态改变的节点
          changes.forEach((item) => {
            const values = this.data.nodes.some((d) => d.labeel == item.name);
            if (values) {
              // 当行为树不更新之后才去执行行为树的行为
              lock = true;
            }
          });
        }, 1500);
        if (graph) {
          if (n.btreeXmlUrl == o.btreeXmlUrl) return;
          graph.destroy();
          this.initLegend();
          this.initG6();
        }
      },
      deep: true, // 可以深度检测到 person 对象的属性值的变化
    },
    data() {
      if (!graph) {
        this.initG6();
      }
    },
    changeNode: {
      handler(n) {
        if (n.name == "交互") n.name = "普通交互";
        changes.push(n);
        this.changeStatus(n, false);
      },
      deep: true,
    },
    treeList: {
      handler(n) {
        if (n && this.isFirst) {
          this.data = filter(JSON.parse(n[n.length - 1].content));
          this.initG6();
          this.isFirst = false;
        }
      },
    },
  },
  methods: {
    // 边配置
    eageoption() {
      const lineDash = [4, 2, 2, 3];
      G6.registerEdge(
        "can-running",
        {
          setState(name, value, item) {
            const shape = item.get("keyShape");
            if (name === "running") {
              if (value) {
                let index = 0;
                shape.animate(
                  () => {
                    index++;
                    if (index > 10) {
                      index = 0;
                    }
                    const res = {
                      lineDash,
                      lineDashOffset: -index,
                    };
                    // return the params for this frame
                    return res;
                  },
                  {
                    repeat: true,
                    duration: 3000,
                  }
                );
              } else {
                shape.stopAnimate();
                shape.attr("lineDash", null);
              }
            }
          },
        },
        "cubic-horizontal"
      );
    },
    // 节点配置
    nodeOption() {
      G6.registerNode(
        "sql",
        {
          draw(cfg, group) {
            let newNode = null;
            if (
              cfg.behaviorType == "decorate" ||
              cfg.behaviorType == "action"
            ) {
              newNode = ellipse(cfg, group);
            } else if (cfg.behaviorType == "condition") {
              newNode = diamond(cfg, group);
            } else {
              newNode = rect(cfg, group);
            }
            // 注册最外层的矩形
            return newNode;
          },
        },
        "single-node"
      );
    },
    // 渲染图形
    initG6() {
      const container = document.getElementById("mountNode");
      const width = container.scrollWidth;
      const height = container.scrollHeight;
      graph = new G6.Graph({
        container: container,
        width,
        height,
        fitView: true,
        layout: {
          type: "dagre",
          nodesepFunc: (d) => {
            if (
              d.behaviorType === "decorate" ||
              d.behaviorType === "condition" ||
              d.behaviorType == "action"
            ) {
              return 100;
            }
            return 50;
          },
          nodeSep: 100,
          ranksep: 100,
          controlPoints: true,
        },
        plugins: [legend],
        linkCenter: true,
        defaultNode: {
          type: "sql",
          size: [120, 20],
          icon: {
            show: true,
            width: 25,
            height: 25,
            img:
              "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
          },
        },
        defaultEdge: {
          style: {
            stroke: "#b5b5b5",
            lineWidth: "2",
          },
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            {
              offset: 0,
            },
          ],
        },
      });
      graph.data(this.data);
      graph.render();
      if (typeof window !== "undefined") {
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
      }
    },
    // 渲染图例
    initLegend() {
      const size = 30;
      const fontSize = 20;
      const legendData = {
        nodes: [
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#66e861",
            },
            label: "顺序节点",
            labelColor: "#66e861",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#ff871f",
            },
            label: "并行节点",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#d35cff",
            },
            label: "选择节点",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#fd5858",
            },
            label: "装饰节点",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#036cff",
            },
            label: "条件节点",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "l(90) 0:#e2d610 1:#e8740f",
            },
            label: "节点运行",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#ffffff",
            },
            label: "运行成功",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
          {
            id: "a",
            type: "rect",
            size: size,
            style: {
              fill: "#beb8bf",
            },
            label: "运行失败",
            labelCfg: {
              style: {
                x: -40,
                y: 33,
                fontSize: fontSize,
                fill: "#fff",
              },
            },
          },
        ],
        edges: [],
      };
      legend = new G6.Legend({
        data: legendData,
        align: "center",
        layout: "vertical", // horizontal
        position: "top-left",
        vertiSep: 20,
        horiSep: 0,
        offsetY: 0,
        offsetX: 24,
        margin: [0, 0, 0, 0],
        padding: [15, -35, 15, 15],
        containerStyle: {
          fill: "rgba(0,0,0,0)",
          lineWidth: 1,
          stroke: "#ccc",
          radius: 10,
        },
        title: "",
        titleConfig: {
          position: "center",
          offsetX: 0,
          offsetY: 0,
        },
        filter: {
          multiple: true,
          filterFunctions: {
            a: (d) => {
              if (d.cluster === "a") return true;
              return false;
            },
            b: (d) => {
              if (d.cluster === "b") return true;
              return false;
            },
            c: (d) => {
              if (d.cluster === "c") return true;
              return false;
            },
            d: (d) => {
              if (d.cluster === "d") return true;
              return false;
            },
          },
        },
      });
    },
    // 数据变化之后更新状态
    changeStatus(n, status) {
      if (!n) return;
      if (!graph) return;
      // 获取改变的节点
      if (n.name == "普通交互") {
        setTimeout(() => {
          graph.fitView(0, {}, true, {
            easing: "easeCubic",
            duration: 400,
          });
        }, 2000);
      }
      // 获取当前的状态节点
      const currentNode = graph.find("node", (nodes) => {
        return nodes.get("model").labeel == n.name;
      });
      if (!currentNode) return;
      // 获取改变的边
      const currentEdge = graph.find("edge", (edges) => {
        return edges.get("model").target == currentNode?._cfg.id;
      });
      // 判断状态
      if (n.state == "RUNNING") {
        // 运行状态
        graph.updateItem(currentNode, {
          style: {
            stroke: "l(90) 0:#e2d610 1:#e8740f",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "#e2d610",
            shadowBlur: 10,
          },
        });
        // 运行状态需要给边加上流水线
        // 过滤边数据，根据数据找到配置项，更新边
        // 给流水边加粗
        graph.updateItem(currentEdge, {
          style: {
            stroke: "#ffffff",
            lineWidth: 10,
          },
        });
        // const bbox = currentNode._cfg;
        if (!status) {
          graph.zoomTo(1.3);
        }
        // 设置流水边
        graph.setItemState(currentEdge, "running", true);
        // 如果是运行状态， 给此节点进行聚焦
        graph.focusItem(currentNode);
      } else if (n.state == "SUCCESS") {
        // 缩小并且让画布居中
        if (!status) {
          graph.fitView(0, {}, true, {
            easing: "easeCubic",
            duration: 400,
          });
        }
        // 成功状态
        graph.updateItem(currentNode, {
          style: {
            stroke: "#ffffff",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "#ffffff",
            shadowBlur: 10,
          },
        });
        // 取消边加粗
        graph.updateItem(currentEdge, {
          style: {
            stroke: "#ffffff",
            lineWidth: 1,
          },
        });
        // 清除流水边
        currentEdge.clearStates("running");
      } else {
        // 缩小并且让画布居中
        if (!status) {
          graph.fitView(0, {}, true, {
            easing: "easeCubic",
            duration: 400,
          });
        }
        // 失败状态
        graph.updateItem(currentNode, {
          style: {
            stroke: "#beb8bf",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "#beb8bf",
            shadowBlur: 15,
          },
        });
        // 取消边加粗
        graph.updateItem(currentEdge, {
          style: {
            stroke: "#ffffff",
            lineWidth: 1,
          },
        });
        // 清除流水边
        currentEdge.clearStates("running");
      }
    },
    openIntaval() {
      this.tive = setInterval(() => {
        //  设置锁，状态为空，或者锁闭情况下不改变状态
        if (changes.length <= 0 || !lock) return;
        // console.log("有状态");
        this.changeStatus(changes[count]);
        node.push(changes[count]);
        count++;
        if (count >= changes.length) lock = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.edw {
  width: 1473px;
  height: 1000px;
}
</style>

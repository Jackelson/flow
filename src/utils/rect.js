import sort from "@/assets/iconfont/sort.png";
import and from "@/assets/iconfont/and.png";
import what from "@/assets/iconfont/what.png";
let image = "";
export default function circle(cfg, group) {
  const bg = `l(90) 0:${cfg.color} 1:#000000`;
  if (cfg.behaviorType == "sequence") {
    image = sort;
  } else if (cfg.behaviorType == "parallel") {
    image = and;
  } else if (cfg.behaviorType == "select") {
    image = what;
  }
  const r = 4;
  const color = "rgba(44, 44, 44, 1)";
  const w = cfg.size[0];
  const h = cfg.size[1];
  const width = cfg.highLight == 1 ? 245 : 240;
  const height = cfg.highLight == 1 ? 95 : 90;
  // const borderColor = cfg.highLight == 1 ? 'l(90) 0:#e2d610 1:#e8740f' : 'rgba(238,239,89,0)'
  let borderColor = "";
  // 运行状态
  if (cfg.highLight == 1) {
    borderColor = "l(90) 0:#e2d610 1:#e8740f";
    // 成功状态
  } else if (cfg.highLight == 2) {
    borderColor = "#ffffff";
  } else {
    // 失败状态
    borderColor = "rgba(238,239,89,0)";
  }
  const rect = group.addShape("rect", {
    attrs: {
      x: -75,
      y: -25,
      width: width,
      height: height,
      radius: 10,
      stroke: borderColor,
      fill: cfg.color,
      lineWidth: 30,
    },
    name: "rect-shape1",
  });
  group.addShape("rect", {
    attrs: {
      x: -70,
      y: -20,
      width: width - 10,
      height: height - 10,
      radius: 10,
      stroke: "rgba(79,76,76, 1)",
      fill: bg,
      opacity: 0.8,
      lineWidth: 30,
      icon: {
        show: true,
        width: 25,
        height: 25,
        text: "iconfont icon-jiantou_xiangyou_o",
      },
    },
    name: "rect-shape2",
  });
  // 添加上边框的粗边框
  group.addShape("rect", {
    attrs: {
      x: -w / 9,
      y: -h / 0.8,
      width: w, //200,
      height: h / 2, // 60
      fill: "rgba(44, 44, 44, 1)",
      radius: [r, r, 0, 0],
    },
    name: "title-box2",
    draggable: true,
  });
  // 添加的下边框的粗边框
  group.addShape("rect", {
    attrs: {
      x: -w / 9,
      y: h / 0.37,
      width: w, //200,
      height: h / 2, // 60
      fill: color,
      radius: [r, r, 0, 0],
    },
    name: "title-box1",
    draggable: true,
  });
  // 添加序号的图形
  group.addShape("circle", {
    attrs: {
      x: 160,
      y: -15,
      r: 20,
      fill: "rgba(162,162,166, 1)",
    },
    name: "circle-shape",
  });
  // 添加标题文本
  if (cfg.labeel) {
    group.addShape("text", {
      attrs: {
        text: cfg.labeel == "root" ? "根节点" : cfg.labeel,
        x: 120,
        y: 10,
        fill: "#ffff",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "right",
        textBaseline: "middle",
      },
      name: "text-shape",
    });
    group.addShape("text", {
      attrs: {
        text: cfg.id,
        x: 160,
        y: -15,
        fill: "#ffff",
        fontSize: 25,
        textAlign: "center",
        textBaseline: "middle",
        fontWeight: "bold",
      },
      name: "text-shape1",
    });
    // 添加图标
    group.addShape("image", {
      attrs: {
        x: -50,
        y: -5,
        width: 24,
        height: 24,
        img: image,
      },
      name: "image-shape",
    });
  }
  return rect;
}

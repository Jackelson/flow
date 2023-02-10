// import { format } from "core-js/core/date";

export function filter(node) {
  let data = {};
  data.edges = node.edges.map((item) => {
    return {
      source: item.from + "",
      target: item.to + "",
      type: "can-running",
      color: item.color,
      highLight: item.highLight,
      title: item.title,
      label: item.label,
      dashes: item.dashes,
      style: {
        endArrow: true,
      },
    };
  });
  data.nodes = node.nodes.map((item) => {
    // const num = Math.random();
    let color = "";
    const b = item.behaviorType;
    if (b == "sequence") {
      // 绿色
      color = "#66e861";
    } else if (b == "parallel") {
      // 黄色
      color = "#ff871f";
    } else if (b == "select" || b == "action") {
      // 紫色
      color = "#d35cff";
    } else if (b == "decorate") {
      color = "#fd5858";
    } else {
      color = "#036cff";
    }
    return {
      id: item.id + "",
      dataType: "alps",
      name: "alps_file",
      labeel: item.label,
      title: item.title,
      level: item.level,
      highLight: item.highLight,
      shape: item.shape,
      color: color,
      behaviorType: item.behaviorType,
    };
  });
  return data;
}
//   webpack://front_cloudbrain_portal/node_modules/_@antv_g6-core@0.6.18@@antv/g6-core/es/item/edge.js?ddc3

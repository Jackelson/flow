import image from '@/assets/iconfont/drc.png'
export default function diamond(cfg, group){
  const bg = `l(90) 0:${cfg.color} 1:#000000`
  let borderColor =  '';
  if(cfg.highLight == 1) {
    borderColor = 'l(90) 0:#e2d610 1:#e8740f'
  } else if(cfg.highLight == 2) {
    borderColor = '#ffffff'
  } else {
    borderColor = 'rgba(238,239,89,0)'
  }
    const rect = group.addShape("path", {
      attrs: {
        linkPoints: {
          top: true,
          size: 100,
        },
        path: [
          ['M', 0, -105], // 上部顶点
          ['L', -105, 0], // 左侧顶点
          ['L', 0, 105], // 下部顶点
          ['L', 105, 0], // 右侧顶点
          ['Z'], // 封闭
        ], // 根据配置获取路径
        fill: cfg.color,
        stroke: borderColor,
        lineJoin: 'round',
        lineWidth: 30,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
      // 设置 draggable 以允许响应鼠标的图拽事件
      draggable: true,
      });
    group.addShape("path", {
      attrs: {
        linkPoints: {
          top: true,
          size: 100
        },
        path: [
          ['M', 0, -100], // 上部顶点
          ['L', -100, 0], // 左侧顶点
          ['L', 0, 100], // 下部顶点
          ['L', 100, 0], // 右侧顶点
          ['Z'], // 封闭
        ], // 根据配置获取路径
        fill: bg,
        lineJoin: 'round',
        stroke: `rgba(79,76,76, 0.8)`,
        lineWidth: 30,
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
      // 设置 draggable 以允许响应鼠标的图拽事件
      draggable: true,
      });
      // 添加序号的图形
      group.addShape("circle", {
        attrs: {
          x: 60,
          y: -60,
          r: 20,
          fill: "rgba(162,162,166, 1)",
        },
        name: "circle-shape",
      });

    if (cfg.labeel) {
      group.addShape("text", {
        attrs: {
          text: cfg.labeel == "root" ? "根节点" : cfg.labeel,
          x: 10,
          y: -2,
          fill: "#ffff",
          fontSize: 25,
          textAlign: "center",
          textBaseline: "middle",
          fontWeight: "bold",
        },
        name: "text-shape",
      });
      // 添加序号的文本
      group.addShape("text", {
        attrs: {
          text: cfg.id,
          x: 60,
          y: -60,
          fill: "#ffff",
          fontSize: 22,
          textAlign: "center",
          textBaseline: "middle",
          fontWeight: "bold",
        },
        name: "text-shape1",
      });
      // 添加图标
      group.addShape("image", {
        attrs: {
          x: -13,
          y: -65,
          width: 24,
          height: 24,
          img: image,
        },
        name: "image-shape",
      });
  }
    return rect;
}
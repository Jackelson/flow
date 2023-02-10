import decorate from '@/assets/iconfont/cond.png';
import action from '@/assets/iconfont/action.png';
export default function ellipse(cfg, group) {
  const bg = `l(90) 0:${cfg.color} 1:#000000`
    const rx = cfg.highLight == 1 ? 125 : 120;
    const ry = cfg.highLight == 1 ? 50 : 45;
    let borderColor =  '';
    if(cfg.highLight == 1) {
      borderColor = 'l(90) 0:#e2d610 1:#e8740f'
    } else if(cfg.highLight == 2) {
      borderColor = '#ffffff'
    } else {
      borderColor = 'rgba(238,239,89,0)'
    }
       const ellipse = group.addShape("ellipse", {
        attrs: {
          x: 0,
          y: 25,
          rx: rx,
          ry: ry,
          fill: cfg.color,
          stroke: borderColor,
          lineWidth: 30,
        },
        name: "ellipse-shape1",
      });
       group.addShape("ellipse", {
        attrs: {
          x: 0,
          y: 25,
          opacity: 0.8,
          rx: rx - 5,
          ry: ry - 5,
          fill: bg,
          stroke: "rgba(79,76,76, 1)",
          lineWidth: 20,
        },
        name: "ellipse-shape1",
      });
    //   圆形
      group.addShape("circle", {
        attrs: {
          x: 90,
          y: -10,
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
                y: 20,
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
                x: 90,
                y: -10,
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
                x: -90,
                y: 10,
                width: 24,
                height: 24,
                img: cfg.behaviorType == 'action' ? action : decorate,
              },
              name: "image-shape",
            });
        }  
      return ellipse;
}
import mqtt from 'mqtt';
import { ref, onMounted } from "vue";
import { getNodeTree, saveTree } from "@/api/nodeTree";
import graph from '../data/graph.json'
let name = '';
const options = {
  Name:'reason_engine_test',
  connectTimeout: 40000,
  clientId: '',
  username: '',
  password: '',
  cleanSession : false,
  keepAlive:60,
};

// 转码
const utf8decoder = new TextDecoder();
/**
 * 后端在公共的mqtt服务上publish相应的topic，由前端进行监听对应的topic获取即时消息
 * @param server string，协议头://host:port/path，这里用的是ws://10.5.24.28:8083/mqtt，mqtt连接常见的协议有mqtt://和ws://，在这里要通过浏览器进行通信，是基于mqtt over websocket,只能通过ws://
 * @param topic string|string[]，订阅的主题
 */
const useMQTT = (server: any, topic: any) => {
  // 存储mqtt返回的消息
  const msg = ref({});
  // 存储节点
  const nodeTree = ref({});
  // 存储状态和节点名称
  const changeNode = ref({});
  // 机器人旋转的角度
  const viewDeg = ref(0);
  // 连接mqtt
  const client = mqtt.connect(server, options);
  // 解码函数
  function decodeMsg(message: any) {
    if(!message?.length) return null;
    const type = Object.prototype.toString.call(message);
    let res = null;
    if (type === '[object Uint8Array]') {
      // @ts-ignore
      res = utf8decoder.decode(new Uint8Array(message))
    } else {
      res = JSON.stringify(message);
    }
    res = JSON.parse(res);
    return res;
  }
  onMounted(() => {
    // @ts-ignore
    // 连接mqtt
    client.on("connect", () => {
      console.log('connected')
    });
    client.on("error", (error) => {
      if (!error) {
        console.error("连接失败:", error);
      }
    });
    // 订阅topic
    client.subscribe(topic, { qos: 1 }, (error) => {
      if (!error) {
        console.log("订阅成功");
      } else {
        console.error("订阅失败");
      }
    });
    // mqtt返回的数据结果
    client.on("message", (topic, message) => {
      if(!message) return;
      if(topic == 'robotOrientation') return;
      console.log(topic, decodeMsg(message));
      // const type = Object.prototype.toString.call(message);
      // 任务理解
      if(topic == 'visualization/tree') {
          getNodeTree().then((res)=> {
            if(!message) {
              return
            }
            const mes = decodeMsg(message);
            const change =  {
              state: mes.state,
              name: mes.name,
            }
            changeNode.value = change;
            nodeTree.value = res.data;
            if(res.data.btreeXmlUrl == name ) return;
            name = res.data.btreeXmlUrl
            saveTree({title: `${res.data.name}&${new Date().getTime()}`, content: JSON.stringify(res.data)}).then(res => {});
          })
      } else if (topic === '/tu/command') {
        // @ts-ignore 
        msg.value.taskUnstanding = decodeMsg(message);
        // 语音唤醒
      } else if (topic.indexOf('/wakeup_angle') > -1) {
        console.log(decodeMsg(message));
        // @ts-ignore
        msg.value.wakeupAngle = decodeMsg(message)?.data?.angle;
        // 近场感知
      } else if (topic.indexOf('/version_human') > -1) {
        // @ts-ignore
        const human = decodeMsg(message)?.human;
        // 可视化大屏上尺寸跟实际距离之间的转换，实际机器人可以感知到自己5米以内的人。
        // const ratio = 17;
        if(!human?.length){
          // 视觉意图
          // @ts-ignore
          msg.value.isGaze = false;
        }
        // @ts-ignore
        msg.value.versionHuman = human?.map((item: any) => {
          let locationX = item?.locationX*17;
          let locationY = item?.locationY*17;
          if (locationX > 0) {
            locationX += 85;
          } else if (locationY > 0) {
            locationX = 85 - Math.abs(locationX);
          } else {
            locationX = 85 - Math.abs(locationX);
          }
          if (locationY > 0) {
            locationY = 85 - locationY;
          } else {
            locationY = 85 + Math.abs(locationY);
          }
          // 视觉意图
          // @ts-ignore
          msg.value.isGaze = item?.gaze;

          return {
            locationX,
            locationY,
          }
        })
      }else if(topic.indexOf('web/show') > -1){
        // @ts-ignore
        msg.value.knowMap = decodeMsg(message);
      }else if(topic.indexOf('/btree') > -1){
        // @ts-ignore
        msg.value.treeData = decodeMsg(message);
      } else if(topic == 'robotOrientation') {
        if(decodeMsg(message).yaw*180/Math.PI < 0) {
          viewDeg.value = Math.abs(decodeMsg(message).yaw*180/Math.PI);
        } else {
          viewDeg.value = -decodeMsg(message).yaw*180/Math.PI;
        }
      }
      return {
        msg,
      }
    })
  })
  return {
    msg,
    nodeTree,
    changeNode,
    viewDeg,
  }
}

export default useMQTT;

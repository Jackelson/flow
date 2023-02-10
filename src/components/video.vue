<template>
  <div class="video">
    <video id="myVideo" autoplay muted>
      <source
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        type="video/webm"
      />
    </video>
  </div>
</template>

<!-- js代码播放flv直播视频 -->
<!-- <script>
import flvjs from "flv.js";
let flvPlayer = null;
let videoElement = null;
let interval = null;
// 跳帧
function jumpCat() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  if (flvPlayer) {
    let end = flvPlayer.buffered.end(0); // 获取当前buffered值
    if (!end) return;
    let diff = end - flvPlayer.currentTime; // 获取buffered与currentTime的差值
    if (diff > 10) {
      flvPlayer.currentTime = flvPlayer.buffered.end(0) - 1;
      return;
    }
    if (diff > 1) {
      flvPlayer.currentTime = flvPlayer.buffered.end(0) - 1;
      videoElement.playbackRate = 1.2;
    } else {
      videoElement.playbackRate = 1;
    }
  }
}
// 创建播放器
function createdVideo() {
  videoElement = document.getElementById("myVideo");
  flvPlayer = flvjs.createPlayer({
    type: "flv",
    url:
      "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
    isLive: false,
    cors: true,
    hasVideo: true,
    hasAudio: false,
    enablenorker: true,
    autoCleanupSourceBuffer: true,
    enablestashBuffer: false,
    stashInitialsize: 128,
    lazyLoad: false,
  });
  flvPlayer.attachMediaElement(videoElement);
  flvPlayer.load();
  if (flvjs.Events.METADATA_ARRIVED) {
    flvPlayer.play();
  } else {
    setTimeout(() => {
      flvPlayer.play();
      // jumpCat();
    }, 1000);
  }
  videoElement.addEventListener("progress", jumpCat);
  videoElement.addEventListener(
    "ended",
    function() {
      //结束
      interval = setInterval(createdVideo, 2000);
    },
    false
  );
  flvPlayer.on(flvjs.Events.ERROR, () => {
    //视频出错后销毁重新创建
    if (flvPlayer) {
      flvPlayer.pause();
      flvPlayer.unload();
      flvPlayer.detachMediaElement();
      flvPlayer.destroy();
      flvPlayer = null;
      //重新加载当前停止的视频流，根据个人的方法来配置
      createdVideo();
    }
  });
}
export default {
  mounted() {
    createdVideo();
  },
};
</script> -->

<style lang="scss" scoped>
#myVideo {
  width: 437px;
  height: 397px;
  margin-top: -55px;
}
</style>

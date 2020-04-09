<template>
  <div :class="bemCss()">
    <div :class="bemCss('head')">
      <div :class="bemCss('verticalBar')"></div>
      <div :class="bemCss('title')">{{ this.option.title }}</div>
    </div>
    <video class="video-js vjs-big-play-centered" ref="myVideo"></video>
  </div>
</template>

<script>
import create from "../../core/create";

export default create({
  name: "video-player",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  computed: {
    width() {
      return this.option.width || "400px";
    },
    height() {
      return this.option.height || "300px";
    },
    source() {
      return this.option.source || {};
    }
  },
  methods: {
    initialize() {
      let options = {
        //<video>自带属性
        // 如果true,浏览器准备好时开始播放。
        autoplay: false,
        // 是否显示底部控制栏
        controls: true,
        // 默认情况下会静音。
        muted: false,
        // 是否循环播放。
        loop: false,
        // 预加载
        preload: "auto",
        //播放前显示的视频画面，播放开始之后自动移除。通常传入一个URL
        poster: "",
        width: this.width,
        height: this.height,
        // video.js特有的标签
        language: "zh-CN",
        // // 将播放器置于fluid模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // aspectRatio: "16:9",
        // // 当true时,它将按比例缩放以适应其容器;当为true时width和height无效。
        //fluid: true,
        sources: this.source,
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        //控制条组件
        controlBar: {
          // 自定义按钮的位置
          children: [
            { name: "playToggle" },
            { name: "currentTimeDisplay" },
            { name: "progressControl" },
            { name: "durationDisplay" },
            // 倍速播放
            {
              name: "playbackRateMenuButton",
              playbackRates: [0.5, 1, 1.5, 2]
            },
            //音量键控制，inline:false :垂直显示
            {
              name: "volumePanel",
              inline: false
            },
            { name: "fullscreenToggle" }
          ]
        }
      };
      this.player = this.$HxVueVideoPlay(
        this.$refs.myVideo,
        options
        /*function() {
          //监听事件
          this.on("ended", () => {
            console.log("播放结束！");
          });
          this.on("play", () => {
            console.log("播放开始");
          });
        }*/
      );
    },
    dispose() {
      this.player.dispose();
    }
  },
  mounted() {
    if (!this.player) {
      this.initialize();
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose();
    }
  }
});
</script>

<style lang="scss">
.hxvue-video-player {
  &__head {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  &__verticalBar {
    width: 3px;
    height: 18px;
    background: rgba(255, 0, 0, 0.8);
    margin-right: 10px;
  }
  &__title {
    font-size: 17px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
  }
}
// 视频暂停时显示播放按钮
.video-js.vjs-paused .vjs-big-play-button {
  display: block;
}
// 视频加载出错时隐藏播放按钮
.video-js.vjs-error .vjs-big-play-button {
  display: none;
}
// 显示当前时间和总时间；不加！important无效
.video-js .vjs-time-control {
  display: block !important;
}
// 调整倍速按钮的字体
.video-js .vjs-playback-rate .vjs-playback-rate-value {
  line-height: 2;
  font-size: 14px;
}
</style>

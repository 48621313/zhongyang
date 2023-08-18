<template>
    <div style="margin-left: 100px;">
        <!-- v-show="isDragging" -->
      <div   class="around" :style="{ top: `${page.y}px`, left: `${page.x}px`}">
        <p>x: {{ position.x }}</p>
        <p>y: {{ position.y }}</p>
      </div>
      <i>onclick  ondblclick  onmousedown onmousemove   onmouseover  onmouseup  onmouseout   </i>
      <br>
      x: {{ position.x }} y: {{ position.y }}
      <i>视频demo 人操作手机大概有1.轻点  2. 双轻点  3.轻点滑动  4.按压  5.闪动  6.缩放  7.转动 </i>
      <div class="box">
        <div class="video" id="video">
          <video class="main" autoplay="autoplay"  controls="controls" src="home.mp4"></video>
        </div>
        <div class="canvas">
          <canvas id="canvas" ref="canvas"></canvas>
        </div>
      </div>
      <!-- http://172.16.253.198/live?port=1935&app=demo&stream=robot1-1 -->
    </div>
  </template>
  <script>
  export default {
    name: 'Exception403',
    data () {
      return {
        name: '',
        position: { x: 0, y: 0 },
        page: { x: 0, y: 0 },
        isDragging: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        var canvas = this.$refs.canvas
        var that = this
        // 移动侦听
        canvas.addEventListener('mousemove', function (event) {
          this.isDragging = true
          // const position = { x: event.offsetX, y: event.offsetY }
          // this.position = { ...position }
          that.position.x = event?.offsetX || 0
          that.position.y = event?.offsetY || 0
          that.page.x = event?.pageX || 0
          that.page.y = event?.pageY || 0
          console.log(this.page, this.position)
        })
        canvas.addEventListener('mouseleave', function (event) {
          this.isDragging = false
        })
      },
      initCanvas () {
        this.$nextTick(() => {
          var c = this.$refs.canvas
          console.log(c, '999')
          var ctx = c.getContext('2d')
          ctx.rect(20, 20, 150, 100)
          ctx.fillStyle = 'green'
          ctx.fill()
        })
      },
      createVideo() {
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            this.player= flvjs.createPlayer({
              type: 'flv',
              isLive: true,
              hasAudio: false,
              url: 'http://172.16.253.198/live?port=1935&app=demo&stream=robot1-1'		// 自己的flv视频流
            },{
              cors: true, // 是否跨域
              // enableWorker: true, // 是否多线程工作
              enableStashBuffer: false, // 是否启用缓存
              stashInitialSize: 128, // 缓存大小(kb)  默认384kb
              autoCleanupSourceBuffer: true // 是否自动清理缓存
            });
            this.player.attachMediaElement(videoElement);//挂载元素
            this.player.load()//加载流
            this.player.play()//播放流
          }
          // 报错重连
           this.player.on(flvjs.Events.ERROR, (err, errdet) => {
            // 参数 err 是一级异常，errdet 是二级异常
            if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
              console.log('媒体错误')
              if(errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
                console.log('媒体格式不支持')
              }
            }
            if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
              console.log('网络错误')
              if(errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
                console.log('http状态码异常')
              }
            }
            if(err == flvjs.ErrorTypes.OTHER_ERROR) {
              console.log('其他异常：', errdet)
            }
             if (this.player) {
               this.destoryVideo()
               this.createVideo()
             }
           })
        },
        destoryVideo(){
          if (this.player) {
            this.player.pause()// 暂停播放数据流
            this.player.unload()// 取消数据流加载
            this.player.detachMediaElement()// 将播放实例从节点中取出
            this.player.destroy() // 销毁播放实例
            this.player= null;
          }
        }
    }
  }
  </script>
  <style lang="scss" scoped>
  .around {
    width: 100px;
    height: 48px;
    text-align: center;
    position: fixed;
    color: #fff;
    background-color: blue;
    z-index: 555;
    overflow: hidden;
    user-select: none;
    transition: all .1s;
    p{
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      margin: 0;
    }
  }
  .box {
    width: 375px;
    height: 812px;
    position: relative;
    border: 1px solid greenyellow;
    overflow: hidden;
    .video {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 333;
  
      .main {
        width: 100%;
        height: 100%;
      }
    }
  
    .canvas {
      width: 100%;
      height: 100%;
      position: relative;
      left: 0;
      top: 0;
      z-index: 444;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      #canvas{
        width: 100%;
        height: 100%;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
      }
    }
  }
  </style>
  
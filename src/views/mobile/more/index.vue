<template>
    <!-- x: {{ position.x }} y: {{ position.y }} {{ page.x }} {{ page.y }} -->
    <div class="page-wrapper">
        <div class="page-radius">
            <div class="page-common">
                <div class="title-common">
                    <div class="tit-lf tit-before"><span class="tit">多屏预览</span></div>
                    <div class="tit-rt">
                        <Progress :precent.sync="precent" title="滑动缩放" />
                    </div>
                </div>
                <div class="all-fetaure">
                    <div class="left">
                        <el-image class="choice" v-if="checkAll" :src="checkImg" fit="fill"
                            @click="changeAllChoice()"></el-image>
                        <el-image class="choice" v-else :src="unCheckImg" fit="fill" @click="changeAllChoice()"></el-image>
                        <span class="label">全选</span>
                    </div>
                    <div class="right">
                        <div class="feature">
                            <div class="lf flex-center">
                                <el-image class="icon-common" :src="leftImg" fit="fill"></el-image>
                            </div>
                            <div class="center">
                                <li class="one" v-for="i in icon_arr" :key="i.label">
                                    <el-tooltip class="item" effect="dark" :content="i.label" placement="top">
                                        <el-image class="icon-common" :src="i.url" fit="fill"></el-image>
                                    </el-tooltip>
                                </li>
                            </div>
                            <div class="rt flex-center">
                                <el-image class="icon-common" :src="rightImg" fit="fill"></el-image>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-box">
                    <div class="mobile-main" v-for="(i, j) in device_arr">
                        <!-- 设备号 -->
                        <div class="top">
                            <el-image class="choice" v-if="i.value" :src="checkImg" fit="fill"
                                @click="changeChoice(i)"></el-image>
                            <el-image class="choice" v-else :src="unCheckImg" fit="fill" @click="changeChoice(i)"></el-image>
                            <span class="label">{{ i.label }}</span>
                        </div>
                        <!-- 手机与操作 -->
                        <div class="bottom flex-no-wrap">
                            <!-- 手机显示区域 -->
                            <div class="box-out">
                                <!-- 手机壳 -->
                                <el-image class="bg" :src="require('../../../assets/images/iphone1.png')" fit="fill"></el-image>
                                <!-- 此处设置宽高 -->
                                <div :style="{ width: `${rectangle.width}px`, height: `${rectangle.height}px` }" class="box">
                                    <div class="video" style="opacity: 1;">
                                        <video :id="`videoElement${j}`" class="main" autoplay muted></video>
                                    </div>
                                    <div class="canvas">
                                        <canvas :id="`canvas${j}`" :ref="`canvas${j}`"></canvas>
                                    </div>
                                </div>
                            </div>
                            <!-- 右侧功能栏 -->
                            <ul class="mobile-feature" :style="{ height: `${rectangle.height}px` }">
                                <li class="one" v-for="i in icon_arr" :key="i.label">
                                    <el-tooltip class="item" effect="dark" :content="i.label" placement="top">
                                        <el-image class="icon-common" :src="i.url" fit="fill"></el-image>
                                    </el-tooltip>
                                </li>
                                <li class="one">
                                    <el-image class="icon-common" :src="rightImg" fit="fill"></el-image>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 鼠标跟随 -->
                <div class="around" v-if="isDragging" :style="{ top: `${page.y + 10}px`, left: `${page.x + 10}px` }">
                    <p>x: {{ position.x }}</p>
                    <p>y: {{ position.y }}</p>
                </div>
            </div>
        </div>
        <!-- http://172.16.253.198/live?port=1935&app=demo&stream=robot1-1 -->
    </div>
</template>
<script>
import { clickDeviceApi } from '@/api/device/control'
import Progress from '@/views/components/progress/index.vue'
import flvjs from 'flv.js'
export default {
    name: 'more',
    components: {
        Progress
    },
    data() {
        return {
            checkImg: require('@/assets/images/checked.png'),
            unCheckImg: require('@/assets/images/unchecked.png'),
            leftImg: require('@/assets/images/left.png'),
            rightImg: require('@/assets/images/right.png'),

            precent: 0,
            icon_arr: [
                { url: require('@/assets/images/desktop.png'), label: '桌面', method: 'a' },
                { url: require('@/assets/images/calibrate.png'), label: '效准', method: 'a' },
                { url: require('@/assets/images/open.png'), label: '启动代理', method: 'a' },
                { url: require('@/assets/images/wathc.png'), label: '切换投屏模式', method: 'a' },
                { url: require('@/assets/images/list.png'), label: '应用列表', method: 'a' },
                { url: require('@/assets/images/recognition.png'), label: '文字识别', method: 'a' },
                { url: require('@/assets/images/copyText.png'), label: '复制屏幕文字', method: 'a' },
                { url: require('@/assets/images/copy.png'), label: '复制到剪贴板', method: 'a' },
                { url: require('@/assets/images/send.png'), label: '发送剪贴板', method: 'a' },
            ],
            name: '',
            position: { x: 0, y: 0 },
            page: { x: 0, y: 0 },
            isDragging: false,
            rectangle: {
                width: '253',
                height: '543'
            },
            checkAll: false,
            device_arr: [
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
                { deviceId: 102, label: '设备1', value: false },
            ],
            beforePosition: {
                x: 0,
                y: 0
            },
            afterPosition: {
                x: 0,
                y: 0
            },
            flvPlayerArr: [null, null, null, null, null, null, null, null]
        }
    },
    watch: {
        precent: function (val) {
            let value = 1 + (val / 100)
            this.rectangle.width = value * 253
            this.rectangle.height = value * 543
        }
    },
    mounted() {
        this.device_arr.forEach((i, j) => {
            this.$nextTick(() => {
                this.init(j)
                this.createVideo(j)
            })
        })

    },
    beforeDestroy() {
        this.device_arr.forEach((i, j) => {
            this.destoryVideo(j)
        })
    },
    methods: {
        // 选择
        changeChoice(i) {
            i.value = !i.value
            this.checkAll = this.device_arr.every((x) => {
                return x.value
            })
        },
        changeAllChoice() {
            let checkAll = !this.checkAll
            this.device_arr.forEach((x) => {
                x.value = checkAll
            })
            this.checkAll = checkAll
        },
        // 画图相关
        init(num) {
            // 1.轻点 2. 双轻点 3.轻点滑动 4.按压 5.闪动 6.缩放 7.转动
            // onclick ondblclick  mouseenter   onmousemove  onmouseleave   onmouseover  onmouseout   onmousedown   onmouseup 
            var canvas = this.$refs[`canvas${num}`][0]
            console.log(canvas, '111', num);
            var that = this
            // 进入坐标显示
            canvas.addEventListener('mouseenter', function (event) {
                that.isDragging = true
                // console.log('进入了');
            })
            // 移动显示坐标
            canvas.addEventListener('mousemove', function (event) {
                that.position.x = event?.offsetX || 0
                that.position.y = event?.offsetY || 0
                that.page.x = event?.pageX || 0
                that.page.y = event?.pageY || 0
                // console.log(that.page, that.position)
            })
            // 离开停止坐标显示
            canvas.addEventListener('mouseout', function (event) {
                that.isDragging = false
                // console.log('离开了');
            })
            // 点击
            canvas.addEventListener('click', function (event) {
                // console.log(111, '单击需要去传送坐标事件');
                let x = event?.offsetX || 0
                let y = event?.offsetY || 0
                that.clickDevice(x, y, num)
            })
            // 双击
            canvas.addEventListener('dblclick', function (event) {
                // console.log(2222, '双击需要去传送坐标事件 此处可能要清除单击的事件');
            })
            // 鼠标按下事件
            canvas.addEventListener('mousedown', function (event) {
                that.beforePosition.x = event?.offsetX || 0
                that.beforePosition.y = event?.offsetY || 0
                console.log(3333, '鼠标按下');
            })
            // 鼠标松开事件
            canvas.addEventListener('mouseup', function (event) {
                // 获取按下位置    可能配合按下动作
                that.afterPosition.x = event?.offsetX || 0
                that.afterPosition.y = event?.offsetY || 0
                that.drawArrow(num)
                console.log(4444, '鼠标松开去划线 后清空前');
            })
        },
        // 画箭头
        drawArrow(num) {
            let { x: startX, y: startY } = this.beforePosition
            let { x: endX, y: endY } = this.afterPosition
            console.log(startX, startY, endX, endY);
            try {
                var c = this.$refs[`canvas${num}`]
                var ctx = c.getContext('2d')
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                let angle = Math.atan2(endY - startY, endX - startX);
                let headlen = 10;
                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6),
                    endY - headlen * Math.sin(angle - Math.PI / 6));
                ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6),
                    endY - headlen * Math.sin(angle + Math.PI / 6));
                ctx.fill();
            } catch (err) {
                console.log(err, 'err');
            }
        },
        // 视频相关
        createVideo(num) {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById(`videoElement${num}`);
                this.flvPlayerArr[num] = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    url: num > 3 ? 'http://172.16.253.198:81/live?port=1935&app=demo&stream=robot1-1' : 'http://172.16.253.198/live?port=1935&app=demo&stream=robot1-1'		// 自己的flv视频流
                }, {
                    cors: true, // 是否跨域
                    // enableWorker: true, // 是否多线程工作
                    enableStashBuffer: false, // 是否启用缓存
                    stashInitialSize: 128, // 缓存大小(kb)  默认384kb
                    autoCleanupSourceBuffer: true // 是否自动清理缓存
                });
                this.flvPlayerArr[num].attachMediaElement(videoElement);//挂载元素
                this.flvPlayerArr[num].load()//加载流
                this.flvPlayerArr[num].play()//播放流
            }
            // 报错重连
            this.flvPlayerArr[num].on(flvjs.Events.ERROR, (err, errdet) => {
                // 参数 err 是一级异常，errdet 是二级异常
                if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
                    console.log('媒体错误')
                    if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
                        console.log('媒体格式不支持')
                    }
                }
                if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
                    console.log('网络错误')
                    if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
                        console.log('http状态码异常')
                    }
                }
                if (err == flvjs.ErrorTypes.OTHER_ERROR) {
                    console.log('其他异常：', errdet)
                }
                if (this.flvPlayerArr[num]) {
                    this.destoryVideo(num)
                    this.createVideo(num)
                }
            })
        },
        destoryVideo(num) {
            let player = this.flvPlayerArr[num]
            if (player) {
                player.pause()// 暂停播放数据流
                player.unload()// 取消数据流加载
                player.detachMediaElement()// 将播放实例从节点中取出
                player.destroy() // 销毁播放实例
                this.flvPlayerArr[num] = null;
            }
        },
        // 设备命令
        clickDevice(x, y, num) {
            let { width, height } = this.rectangle
            let form = { ids: "102", x: x / width, y: y / height }
            clickDeviceApi(form).then((res) => {
                console.log(res, 'res');
            })
            console.log(this.flvPlayerArr, 'flvPlayerArr');
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~./index.scss'
</style>
  
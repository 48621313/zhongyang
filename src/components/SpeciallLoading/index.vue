<template>
    <div class="shadow">
        <div class="bx">
            <div class="ct">
                <div class="r-fx">
                    <div class="ct-img" :style="{ transform: `translateX(${percent}%)` }">
                        <img v-if="percent === 100" src="../../assets/images/loadt.png" alt="">
                        <img v-else src="../../assets/images/loadr.png" alt="">
                        <div class="fire">
                            <img :class="[percent < 100 && percent > 0 ? 'skew' : '', 'btt']"
                                src="../../assets/images/loadb.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="jdt">
                    <div class="child">
                        <span
                            :style="{ minWidth: '100px', width: `${percent}%`, textAlign: `${percent === 100 ? 'center' : 'right'}` }">{{
                                `${percent}%` }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            percent: 0,
            time: null
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let that = this
            this.time = setInterval(function () {
                if (that.percent + 1 > 100) {
                    clearInterval(this.time)
                } else {
                    that.percent += 1
                }
            }, 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
.shadow {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    // opacity: .5;
    z-index: 1000;

    .bx {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .ct {
            width: 50%;
            margin: 0 auto;
            position: relative;

            .r-fx {
                width: 100%;
                padding-right: 50px;
                box-sizing: border-box;
            }

            .ct-img {
                width: 100%;
                padding-right: 58px;
                box-sizing: border-box;
                transition: all 2s;

            }

            img {
                transition: all 1s;
                width: 54px;
                display: block;
            }

            .fire {
                width: 54px;

                .btt {
                    width: 18px;
                    margin: 0 auto;
                }
            }

            .skew {
                transform: translateX(-9px) rotate(30deg);
                transform-origin: 0 50%;
            }

            .jdt {
                width: 100%;
                background: url('../../assets/images/rj.png');
                background-size: 100% 100%;
                margin-top: 16px;
                height: 46px;
                padding: 8px;
                box-sizing: border-box;
                line-height: 1;

                .child {
                    width: 100%;
                    height: 100%;
                    span {
                        background: url('../../assets/images/rjj.png');
                        background-size: 100% 100%;
                        text-align: right;
                        padding: 0 12px;
                        line-height: 30px;
                        display: inline-block;
                        color: #7F7F7F;
                        font-size: 20px;
                        // background: #fff;
                        transition: all 1s;
                    }
                }

            }
        }


    }
}</style>
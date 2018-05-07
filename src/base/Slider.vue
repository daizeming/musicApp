<template>
    <div class="slider" ref='slider'>
        <div class="slider-group" ref='sliderGroup'>
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot"
                    v-for="(item, index) in dots"
                    :key="index"
                    :class="{active: index === currentPageIndex}">
            </span>
        </div>
    </div>
</template>

<script>
// slider基本逻辑
// slider => 外层容器，固定宽度（每张图片等于该容器宽度）
//             超过容器部分将其隐藏起来
// sliderGroup => 内层容器，用于存放图片的容器，宽度等于总图片的宽度
// 每次滑动改变sliderGroup的position的left值
// 如果是loop模式则需要在sliderGroup容器首尾多放一张图片

import BScroll from "better-scroll";
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 2000
        },
        showDot: {
            type: Boolean,
            default: true
        },
        threshold: {
            type: Number,
            default: 0.3
        },
        speed: {
            type: Number,
            default: 400
        },
        click: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() {
        // 在实例挂载阶段去操作dom
        setTimeout(() => {
            this._setChildrenWidth();
            this._initDot();
            this._initSlider();
        }, 200);

        // 监听浏览器窗口
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return
            }
            this._setChildrenWidth();
            this.slider.refresh();
        })
    },
    activated() {
        this._autoPlay();
    },
    deactivated() {
        clearTimeout(this.timer);
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        _setChildrenWidth() {
            this.children = this.$refs.sliderGroup.children;
            let sliderWidth = this.$refs.slider.clientWidth;
            let width = 0;
            console.log(this.children);

            Array.from(this.children).forEach((item)=>{
                item.style.width = sliderWidth + 'px';
                item.className = 'slider-item';
                width += sliderWidth;
            })

            if (this.loop) {
                width += sliderWidth * 2;
            }
            this.$refs.sliderGroup.style.width = width + 'px';
        },
        _initDot() {
            this.dots = new Array(this.children.length);
        },
        _initSlider() {
            // 实例slider
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: this.threshold,
                    speed: this.speed,
                },
                bounce: false,
                stopPropagation: true,
                click: this.click
            })

            //监听scrollEnd, 当翻页时，改变当前页
            this.slider.on('scrollEnd', () => {
                this.currentPageIndex = this.slider.getCurrentPage().pageX;

                this._autoPlay();
            })

            this.slider.on('beforeScrollStart', () => {
                if (this.autoPlay) {
                    clearTimeout(this.timer);
                }
            })
        },
        _autoPlay() {
            // 初始化自动轮播，当在滑动时停止自动轮播，滑动结束开始自动轮播
            if (!this.autoPlay) {
                return
            }
            this.timer = setTimeout(()=>{
                this.slider.next(1000);
            }, this.interval)
        }
    },




};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

<template>
    <div ref='scroll'>
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: []
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            setTimeout(()=>{
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.scroll, {
                    probeType: this.probeType,
                    click: this.click,
                    pullUpLoad: this.pullUpLoad
                })

                // 当外部监听滚动时，把pos数据emit出去
                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos);
                    })
                }

                // 监听下拉刷新事件
                // 将事件暴露出去，之后触发请求数据完成的方法
                if (this.pullUpLoad) {
                    this.scroll.on('pullingUp', () => {
                        this.$emit('pullingUp');
                        this.scroll.finishPullUp();
                    })
                }
            },
            // 代理this.scroll的事件
            enable() {
                this.scroll && this.scroll.enable();
            },
            disable() {
                this.scroll && this.scroll.disable();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            }
        },
        watch: {
            // 监听data数据，当数据发生变化更新this.scroll
            data() {
                setTimeout(() => {
                    this.refresh();
                    console.log('更新better-scroll');

                }, 20);
            }
        }

    }
</script>

<style>

</style>

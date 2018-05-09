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
            data: {
                type: Array,
                default: []
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
                    click: this.click
                })
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
                }, 20);
            }
        }

    }
</script>

<style>

</style>

<template>
<div class="alert-wrapper">
    <div class="alert">
        <div class="title">
            <p>{{ title }}</p>
        </div>
        <div class="btn">
            <span class="operate-btn left" @click='cancle'>取消</span>
            <span class="operate-btn" @click='sure'>确定</span>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '标题'
            }
        },
        data() {
            return {
                isSure: false
            }
        },
        methods: {
            sure() {
                this.isSure = true;
                console.log('sure');
                this.$emit('operateResult', this.isSure);
            },
            cancle() {
                this.isSure = false;
                console.log('cancle');
                this.$emit('operateResult', this.isSure);
            }
        },
    }
</script>

<style lang='stylus' scoped rel="stylesheet/stylus">
@import './../../common/stylus/variable'
.alert-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 998
    display: flex
    justify-content: center
    align-items: center
    background: $color-background-d
    .alert
        width: 270px
        border-radius: 13px
        background: $color-highlight-background
        z-index: 999
        .title
            padding: 19px 15px
            text-align: center
            color: $color-text-ll
            border-bottom: 1px solid $color-background-d
        .btn
            display: flex
            .operate-btn
                flex: 1
                padding: 10px 0
                text-align: center
            .left
                border-right: 1px solid $color-background-d
</style>

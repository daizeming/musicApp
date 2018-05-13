<template>
    <div class="load-wrapper">
        <img :width="size" :height="size" src="./loading.gif">
        <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '加载中…'
            },
            size: {
                default: 30
            }
        }
    }
</script>

<style lang='stylus'>
    @import "./../../common/stylus/variable.styl"

    .load-wrapper
        width: 100%
        text-align: center
        p
            font-size: $font-size-small
            color: $color-text-l

</style>

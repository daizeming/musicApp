<template>
    <div class="load-wrapper">
        <img width="30" height="30" src="./loading.gif">
        <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '加载中…'
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

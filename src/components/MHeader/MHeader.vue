<template>
    <header>
        <div class="icon"></div>
        <h1 class="text">m-music</h1>
        <div class="mine">
            <i class="icon-mine"></i>
        </div>
    </header>

</template>

<script>
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./../../common/stylus/variable.styl"
    @import "./../../common/stylus/mixin.styl"

    header
        position: relative
        height: 44px
        line-height: 44px
        text-align: center
        color: $color-theme
        font-size: 0
        .icon
            display: inline-block
            vertical-align: top
            margin-top: 6px
            width: 30px
            height: 32px
            margin-right: 9px
            bg-image('logo')
            background-size: 30px 32px
        .text
            display: inline-block
            vertical-align: top
            line-height: 44px
            font-size: $font-size-large
        .mine
            position: absolute
            top: 0
            right: 0
            .icon-mine
                display: block
                padding: 12px
                font-size: 20px
                color: $color-theme
</style>

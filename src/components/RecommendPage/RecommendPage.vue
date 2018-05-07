<template>
    <div class="recommend">
        RecommendPage
        <div class="recommend-content">
            <div class="slider-wrapper">
                <slider>
                    <div v-for="item in slider"
                            :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list"></div>
            <div class="loading-contaniner"></div>
        </div>

    </div>
</template>

<script>
    import { getRecommend } from '@/api/recommend'
    import { ERR_OK } from '@/api/config'
    import Slider from '@/base/Slider'
    export default {
        created() {
            this._getRecommend()
        },
        components: {
            Slider
        },
        data() {
            return {
                slider: []
            }
        },
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    // 每次请求资源的时候，后端会返回一个状态码，根据状态码判断是否请求成功
                        if (res.code === ERR_OK) {
                            this.slider = res.data.slider;
                            console.log(this.slider);

                        }
                    })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./../../common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
            .list-title
                height: 65px
                line-height: 65px
                text-align: center
                font-size: $font-size-medium
                color: $color-theme
            .item
                display: flex
                box-sizing: border-box
                align-items: center
                padding: 0 20px 20px 20px
                .icon
                    flex: 0 0 60px
                    width: 60px
                    padding-right: 20px
                .text
                    display: flex
                    flex-direction: column
                    justify-content: center
                    flex: 1
                    line-height: 20px
                    overflow: hidden
                    font-size: $font-size-medium
                .name
                    margin-bottom: 10px
                    color: $color-text
                .desc
                    color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>

<template>
    <div class="recommend">
        <scroll class="recommend-content"
                :data = "SongMenuList">
            <div>
                <div class="slider-wrapper">
                    <slider v-if="slider.length">
                        <div v-for="item in slider"
                                :key="item.id">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单</h1>
                    <ul>
                        <li class="item"
                            v-for="item in SongMenuList"
                            :key="item.dissid"
                            @click="selSongMenu(item.dissid)">
                            <div class="icon">
                                <img width="60" height="60"
                                    v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name">{{ item.creator.name }}</h2>
                                <p class="desc">{{ item.dissname }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <Loading class="loading-contaniner"
                        v-show='!SongMenuList.length'></Loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import { getRecommend, getSongMenuList } from '@/api/recommend'
    import { ERR_OK, commonParams } from '@/api/config'
    import Slider from '@/base/Slider'
    import Scroll from '@/base/Scroll'
    import Loading from '@/base/Loading/Loading'
    export default {
        created() {
            this._getRecommend()
            setTimeout(() => {
                this._getSongMenuList()
            }, 1000);
        },
        components: {
            Slider,
            Scroll,
            Loading
        },
        data() {
            return {
                slider: [],
                SongMenuList: []
            }
        },
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    // 每次请求资源的时候，后端会返回一个状态码，根据状态码判断是否请求成功
                        if (res.code === ERR_OK) {
                            this.slider = res.data.slider;
                        }
                    })
            },
            _getSongMenuList() {
                getSongMenuList().then((res) => {
                    if (res.data.code === ERR_OK) {
                        this.SongMenuList = res.data.data.list;
                    }
                })
            },
            // 点击歌单时跳转路由
            selSongMenu(id) {
                this.$router.push({
                    name: 'musicList',
                    params: { id }
                })
            }

        }
    }
    </script>
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

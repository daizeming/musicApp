<template>
    <div class="playlist" ref='playList' v-show='isShowList'>
        <div class="list-wrapper">
            <div class="list-header">
                <h1 class="title">
                    <i class="icon" :class="modeIcon" @click='changeMode'></i>
                    <span class="text">{{ modeText }}</span>
                    <span class="clear" @click="showBox">
                        <i class="icon-clear"></i>
                    </span>
                </h1>
            </div>
            <scroll class="list-content" :data='playList'>
                <ul>
                    <li class="item"
                        v-for='(item, index) in playList'
                        :key='item.id'
                        @click='setIndex(index)'>
                        <i class="current" :class="{ 'icon-play': index === currentIndex}"></i>
                        <span class="text">{{item.songName}}</span>
                        <span class="like">
                            <i class="icon-not-favorite"></i>
                        </span>
                        <span class="delect" @click.stop='delSong({index})'>
                            <i class="icon-delete"></i>
                        </span>
                    </li>
                </ul>
            </scroll>
            <div class="list-operate">
                <div class="add">
                    <i class="icon-add"></i>
                    <span class="text">添加歌曲到队列</span>
                </div>
            </div>
            <div class="list-close" @click='closeList'>关闭</div>
        </div>
        <alert-box v-show='isShowBox' title='是否清除播放列表？' @operateResult='clearList'></alert-box>
    </div>
</template>


<script>
    import {playMode} from '@/common/js/config'
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import Scroll from '@/base/Scroll';
    import AlertBox from '@/base/AlertBox/AlertBox';


// 点击选中播放
// 点击删除选中歌曲、并切换下一首
// 清空所有
    export default {
        components: {
            Scroll,
            AlertBox
        },
        data() {
            return {
                isShowList: true,
                isShowBox: false
            }
        },
        computed: {
            modeIcon() {
                return {
                    "icon-sequence": playMode.sequence === this.playMode,
                    "icon-loop": playMode.loop === this.playMode,
                    "icon-random": playMode.random === this.playMode
                }
            },
            modeText() {
                let text = '';

                switch (this.playMode) {
                    case playMode.sequence:
                        text = '顺序播放';
                        break;
                    case playMode.loop:
                        text = '单曲播放';
                        break;
                    case playMode.random:
                        text = '随机播放';
                        break;
                }
                return text;
            },
            ...mapGetters([
                'playList',
                'currentIndex',
                'playMode'
            ])
        },
        methods: {
            showlist() {
                this.isShowList = true;
            },
            closeList() {
                this.isShowList = false;
            },
            showBox() {
                this.isShowBox = true;
            },
            clearList(res) {
                this.isShowBox = false;
                if (res) {
                    this.delAllSong();
                }
            },
            ...mapMutations([
                'setIndex',
            ]),
            ...mapActions([
                'delSong',
                'delAllSong',
                'changeMode'
            ])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/stylus/variable"
  @import "./../../common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>

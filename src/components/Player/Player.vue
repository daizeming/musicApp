<template>
    <div class="player" v-show="playList.length">
        <div class="normal-player" v-show='fullScreen'>
            <div class="background">
                <img :src="currentSong.imgUrl" alt="">
            </div>
            <div class="top">
                <div class="back" @click='goBack'>
                    <i class="icon-back"></i>
                </div>
                <h1 class="title">{{ currentSong.songName }}</h1>
                <h2 class="subtitle">{{ currentSong.singer }}</h2>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="image play" :src="currentSong.imgUrl">
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="playing-lyric">这里是歌词</div>
                    </div>
                </div>
                <div class="middle-r">
                    <div class="lyric-wrapper">
                        <div class="pure-music">
                            <p>这里是歌词</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="dot-wrapper">
                    <span class="dot"></span>
                    <span class="dot active"></span>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l">{{ currentTime }}</span>
                    <div class="progress-bar-wrapper">
                    </div>
                    <span class="time time-r">{{ duration }}</span>
                </div>
                <div class="operators">
                    <div class="icon i-left" @click="changePlayMode">
                        <i :class="modeIcon"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev"
                            @click="prev"></i>
                    </div>
                    <div class="icon i-center"
                        @click="play">
                        <i class="needsclick" :class="playIcon"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-next"
                            @click="next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="mini-player" v-show='!fullScreen'>
            <div class="icon" @click="showNomalPlayer">
                <img class="cdCls"
                     width="40" height="40"
                     :src="currentSong.imgUrl">
            </div>
            <div class="text">
                <h2 class="name">{{ currentSong.songName }}</h2>
                <p class="desc">{{ currentSong.singer }}</p>
            </div>
            <div class="control" @click="play">
                    <i class="icon-mini" :class="playIconMini"></i>
            </div>
            <div class="control" @click='showPlayList'>
                <i class="icon-playlist"></i>
            </div>
        </div>
        <play-list ref='list'></play-list>
        <audio  ref='audio'
                loop='loop'
                :src='currentSong.url'
                @timeupdate='setTime'
                autoplay="autoplay"></audio>
    </div>
</template>

<script>
    import {playMode} from '@/common/js/config'
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import PlayList from '@/components/PlayList/PlayList'
    export default {
        data() {
            return {
                currentTime: 0,
                duration: 0,
                current:0
            }
        },
        watch: {
            currentSong() {
                let audio = this.$refs.audio;
                audio.load();
                audio.oncanplay = () => {
                    let sec = parseInt(audio.duration);
                    console.log(sec, 'sec');

                    this.duration = this.toMinute(sec);
                    console.log(this.duration, 'duration');

                }
            }
        },
        components: {
            PlayList
        },
        computed: {
            playIcon() {
                return {
                    "icon-play": !this.playing,
                    "icon-pause": this.playing
                }
            },
            playIconMini() {
                return {
                    "icon-play-mini": !this.playing,
                    "icon-pause-mini": this.playing
                }
            },
            modeIcon() {
                return {
                    "icon-sequence": playMode.sequence === this.playMode,
                    "icon-loop": playMode.loop === this.playMode,
                    "icon-random": playMode.random === this.playMode
                }
            },
            ...mapGetters([
                'playList',
                'currentIndex',
                'currentSong',
                'playing',
                'fullScreen',
                'playMode',
                'indexList'
            ])
        },
        methods: {
            goBack() {
                this.setScreen(false);
            },
            showNomalPlayer() {
                this.setScreen(true);
            },
            play() {
                this.setPlaying(!this.playing);
                let audio = this.$refs.audio;

                if (this.playing) {
                    // console.log('播放');
                    audio.play();
                }else {
                    // console.log('播放关闭');
                    audio.pause();
                }
            },
            next() {
                let index = this.currentIndex;
                if (index === this.playList.length - 1) {
                    index = 0;
                }else {
                    index ++;
                }
                this.changeSong({index});
            },
            prev() {
                let index = this.currentIndex;
                if (index === 0) {
                    index = this.playList.length - 1;
                }else {
                    index --;
                }
                this.changeSong({index});
            },
            showPlayList() {
                this.$refs.list.showlist();
            },
            changePlayMode() {
                this.changeMode();
                if (this.playMode === playMode.loop ) {
                    this.$refs.audio.setAttribute('loop', 'loop')
                }else {
                    this.$refs.audio.removeAttribute('loop')
                }
            },
            setTime() {

                let sec = parseInt(this.$refs.audio.currentTime);
                this.currentTime = this.toMinute(sec);

                // console.log('当前时间', this.currentTime);
                // console.log('总时间', this.duration);
            },
            toMinute(sec) {
                // 将秒转为格式化时间 00:00
                let min = this.autoZero(parseInt(sec/60), 2);
                sec = this.autoZero(sec%60, 2);
                return `${min}:${sec}`;
            },
            autoZero(num, count) {
                let arr = String(num).split('');
                let res = '';

                if (arr.length > count) {
                    return arr.join('')
                }

                for (let i = 0; i < count; i++) {
                    if (i < arr.length) {
                        res = res + arr[i];
                    }else {
                        res = '0' + res;
                    }
                }
                return res;
            },
            ...mapMutations([
                'setScreen',
                'setPlaying'
            ]),
            ...mapActions([
                'changeSong',
                'changeMode',
                'setSongTime'
            ])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/stylus/variable"
  @import "./../../common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
        //   position: absolute
        //   left: 0
        //   top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

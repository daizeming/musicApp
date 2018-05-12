<template>
    <div class="music-list">
        <div class="back"
            @click="goBack">
            <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ title }}</h1>
        <div class="bg-image" :style='bgImage()' ref='bgImage'>
            <div class="play-wrapper">
            <div class="play" ref='playBtn'>
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            </div>
            <div class="filter"></div>
        </div>
        <div class="bg-layer" ref='bgLayer'></div>
        <scroll class="list"
                ref='list'
                :data="songList"
                :probeType="probeType"
                :listen-scroll="listenScroll"
                @scroll="scrollFn">
                <div class="song-list-wrapper">
                    <song-list :songList='songList'
                                @selSong='selSong'>
                    </song-list>
                </div>
        </scroll>
    </div>
</template>

<script>
    import { getMusicList } from '@/api/recommend';
    import { getSong } from '@/api/song';
    import { createSong } from '@/common/js/song'
    import { mapActions } from 'vuex'
    import SongList from '@/base/SongList/SongList';
    import Scroll from '@/base/Scroll';

    const TOP_HEIGHT = 40;
    export default {
        props: {
            id: {
                type: String,
            }
        },
        data() {
            return {
                title: '',
                imgUrl: '',
                songList: [],     //歌单信息
                songs: [],         //歌曲信息
                probeType: 3,
                listenScroll: true
            }
        },
        created() {
            this._getMusicList();
        },
        mounted() {
            this.$nextTick(()=>{
                this.setListHieght();
            })
        },
        components: {
            SongList,
            Scroll
        },
        methods: {
            _getMusicList() {
                // 获取歌单信息和歌曲数据
                getMusicList(this.id)
                    .then( (res) => {
                        let { logo, songlist, dissname } = res.data.cdlist[0];
                        let songmids = [];
                        let songtypes = [];
                        // 过来songlist 有albummid才留下来，albummid用于获取图片
                        songlist = songlist.filter( (item)=> {
                            return item.albummid
                        } )
                        this.setData(logo, dissname, songlist);


                        // 获取songmids songtypes
                        songlist.forEach((item)=>{
                            songmids.push(item.songmid);
                            songtypes.push(item.type);
                        })

                        // 根据歌单信息去请求该歌单歌曲数据
                        return getSong(songmids, songtypes);
                    } )
                    .then( (res)=> {
                        // 将请求到的歌单信息与歌曲信息合并成一个新对象中
                        // 并扔到store中
                        let songUrlList = res.data.url_mid.data.midurlinfo;
                        this.songs = songUrlList.map((item, index) => {
                                return createSong(this.songList[index], item);
                        })
                    } )
            },
            setData(imgUrl, title, songList) {
                this.title = title;
                this.imgUrl = imgUrl;
                this.songList = songList;
            },
            bgImage() {
                return `background-image: url(${this.imgUrl})`;
            },
            setListHieght() {
                this.imgHeight = this.$refs.bgImage.clientHeight;
                this.$refs.list.$el.style.top = this.imgHeight + 'px';
            },

            //监听事件：滚动 回退上一个路由 选中歌曲
            scrollUp(posY) {
                // bgLayer是上滚的一个遮罩
                // 滚动时候，修改bgLayer的top值,内容有padding撑开
                // 当滚到最小值时,同时设置img高度，并且提高img层级,盖住list
                let minTop = -(this.imgHeight - TOP_HEIGHT);
                let zIndex = 0;

                this.$refs.bgLayer.style.top = posY + 'px';
                if (posY >= minTop ) {
                    this.$refs.bgImage.style.height = 0;
                    this.$refs.playBtn.style.display = '';
                    this.$refs.bgImage.style.paddingTop = '70%';
                }else {
                    zIndex = 10;
                    this.$refs.bgImage.style.paddingTop = 0;
                    this.$refs.playBtn.style.display = 'none';
                    this.$refs.bgImage.style.height = TOP_HEIGHT + 'px';
                }
                    this.$refs.bgImage.style.zIndex = zIndex;
            },
            scrollDown(posY) {
                // 下拉图片放大效果
                let imgHeight = this.$refs.bgImage.clientHeight;
                let scale = (imgHeight + posY)/imgHeight;

                if (posY > 0) {
                    this.$refs.bgLayer.style.top = posY + 'px';
                    this.$refs.bgImage.style.transform = `scale(${scale})`;
                    this.$refs.bgImage.style.zIndex = 10;
                }
            },
            scrollFn(pos) {
                this.scrollUp(pos.y);
                this.scrollDown(pos.y);
            },
            goBack() {
                this.$router.go(-1);
            },
            selSong(item, index) {
                //当我点击歌单，应该获取这个歌单的信息和歌曲信息
                // 当点击歌曲时候，根据歌曲id去请求对应歌曲数据
                this.playSong({list: this.songs, index})
            },
            ...mapActions([
                'playSong'
            ])
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/stylus/variable"
  @import "./../../common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

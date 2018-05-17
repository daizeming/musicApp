import { playMode } from '@/common/js/config'

export default {
    playList: [],
    indexList: [],      //该数据存放播放列表的序列, 根据该序列去查找歌曲播放
    currentIndex: -1,
    playing: false,
    fullScreen: false,
    mode: playMode.loop
}

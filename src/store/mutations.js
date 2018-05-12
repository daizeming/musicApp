export default {
    setPlayList: (state, list) => state.playList = list,
    setIndex: (state, index) => state.currentIndex = index,
    setPlaying: (state, isPlay) => state.playing = isPlay,
    setScreen: (state, isFull) => state.fullScreen = isFull,
    setPlatMode: (state, mode) => state.playMode = mode
}

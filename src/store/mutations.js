export default {
    setPlayList: (state, list) => state.playList = list,
    // setNormalList: (state, list) => state.normalList = list,
    setIndex: (state, index) => state.currentIndex = index,
    setPlaying: (state, isPlay) => state.playing = isPlay,
    setScreen: (state, isFull) => state.fullScreen = isFull,
    setMode: (state, mode) => state.mode = mode
}

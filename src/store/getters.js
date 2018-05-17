export default {
    playList: state => state.playList,
    currentIndex: state => state.currentIndex,
    playing: state => state.playing,
    fullScreen: state => state.fullScreen,
    playMode: state => state.mode,
    indexList: state => state.indexList,
    currentSong(state) {
        if (state.currentIndex !== -1) {
            return state.playList[state.currentIndex]
        }else {
            return {};
        }
    },
}

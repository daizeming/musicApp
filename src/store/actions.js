export default {
    // 点击歌曲播放
    playSong({ commit, state }, { list, index }) {
        commit('setPlayList', list);
        commit('setIndex', index);
        commit('setPlaying', true);
        commit('setScreen', true);
    },
    changeSong({ commit, state }, { index }) {
        commit('setIndex', index);
        commit('setPlaying', true);
    }
}

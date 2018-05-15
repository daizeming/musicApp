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
    },
    delSong({commit, state}, { index }) {
        let playList = state.playList.filter((item, i) => i !== index);
        commit('setPlayList', playList);

        // 如果删除的歌曲为当前播放则自动切换下一曲
        if (index < state.currentIndex) {
            let currentIndex = state.currentIndex - 1;
            commit('setIndex', currentIndex);
        }
    },
    delAllSong({commit, state}) {
        commit('setPlayList', []);
        commit('setIndex', -1);
        commit('setPlaying', false);
        commit('setScreen', false);
    },
    changeMode({commit, state}) {
        let nextMode = (state.mode + 1) % 3;
        console.log('模式', nextMode);

        commit('setMode', nextMode);
    }
}

import {playMode} from '@/common/js/config'

// 产生随机数
function randomArr(arr) {
    arr.sort((a, b) => 0.5 - Math.random());
    return arr;
}

export default {
    setPlayList: (state, list) => state.playList = list,
    // 根据切换的index去indexList列表中去查找当前播放的index
    setIndex: (state, index) => state.currentIndex = state.indexList[index],
    // 点击时的index即是当前播放的index
    selIndex: (state, index) => state.currentIndex = index,
    setPlaying: (state, isPlay) => state.playing = isPlay,
    setScreen: (state, isFull) => state.fullScreen = isFull,
    setMode: (state, mode) => state.mode = mode,
    setIndexList(state) {
        let indexList = state.playList.map( (item, index) => index );

        if (state.mode === playMode.random) {
            indexList = randomArr(indexList);
        }
        state.indexList = indexList;
    },
    delIndexList(state, index) {
        let newIndexList = [];
        state.indexList.forEach((item) => {
            if (item === index) {
                return
            }
            if (item > index) {
                newIndexList.push(item - 1);
            }else {
                newIndexList.push(item);
            }
        });
        state.indexList = newIndexList;
    },
    addsong: (state, song) => state.playList.unshift(song),
}

// filter
// map
// foreach

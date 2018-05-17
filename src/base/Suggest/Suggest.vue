<template>
    <scroll class="suggest"
            ref="scroll"
            :data='suggestList'
            :pull-up-load='pullUpLoad'
            @pullingUp='pullingUpFn'>
        <ul class="suggest-list">
            <li class="suggest-item"
                v-for="(item, index) in suggestList"
                :key="index"
                @click='addsong({song:item})'>
                <div class="icon">
                    <i class="icon-music"></i>
                </div>
                <div class="name">
                    <p class="text">{{ item.songName }}-{{item.singer}}</p>
                </div>
            </li>
            <loading size="15" title=""></loading>
        </ul>
        <!-- <div class="no-result-wrapper">
            没有搜索结果
        </div> -->
    </scroll>
</template>

<script>
import { search } from "@/api/search";
import { getSong } from "@/api/song";
import { createSong } from '@/common/js/song';
import { ERR_OK } from '@/api/config';
import Scroll from '@/base/Scroll';
import Loading from '@/base/Loading/Loading';
import { mapActions } from 'vuex'

export default {
    created() {
        this._getSearch(1);
    },
    components: {
        Scroll,
        Loading
    },
    props: {
        query: {
            type: String,
            default: '流'
        }
    },
    data() {
        return {
            suggestList: [],   // 渲染到视图的搜索列表
            // query: "周",
            page: 1,
            searchList: [],   //每次搜索的列表
            pullUpLoad: true,
            // isLoading: false
        };
    },
    methods: {
        _getSearch(page) {
            search(this.query, page).then(res => {
                this.searchList = res.data.song.list;
                let songmidArr = [];
                let songtypeArr = [];

                this.searchList.forEach(item => {
                if (item.albummid) {
                    songmidArr.push(item.songmid);
                    songtypeArr.push(item.type);
                }
                });

                return getSong(songmidArr, songtypeArr);
            })
            .then((res) => {
                // 将搜索列表和歌曲播放数据合成一个新的song对象
                let songUrlArr = res.data.url_mid.data.midurlinfo;
                let songArr = songUrlArr.map((item, index) => {
                    return createSong(this.searchList[index], item);
                })

                this.suggestList = this.suggestList.concat(songArr);
                // console.log('歌曲信息', songArr);
            })
        },
        _firstSearch() {
            // 每次搜索新内容时初始化数据
            this.suggestList = [];
            this.page = 1;
            this._getSearch(this.page);
        },
        _moreSearch() {
            this.page ++;
            this._getSearch(this.page);
        },
        pullingUpFn() {
            this._moreSearch();
            // console.log('正在请求资源中');
        },
        ...mapActions([
            'addsong'
        ])
    },
    watch: {
        query() {
            this._firstSearch();
        }
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './../../common/stylus/variable';
@import './../../common/stylus/mixin';

.suggest {
    height: 100%;
    overflow: hidden;

    .suggest-list {
        padding: 0 30px;

        .suggest-item {
            display: flex;
            align-items: center;
            padding-bottom: 20px;
        }

        .icon {
            flex: 0 0 30px;
            width: 30px;

            [class^='icon-'] {
                font-size: 14px;
                color: $color-text-d;
            }
        }

        .name {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-d;
            overflow: hidden;

            .text {
                no-wrap();
            }
        }
    }

    .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>

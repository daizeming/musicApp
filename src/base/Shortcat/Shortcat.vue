<template>
    <div class="shortcut">
        <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
                <li class="item"
                    v-for="(item, index) in hotKeyList"
                    :key='index'
                    @click='selKey(item.k)'>{{ item.k }}</li>
            </ul>
        </div>
        <div class="search-history">
            搜索历史

        </div>
        <!-- shortCat -->
    </div>
</template>

<script>
    import { hotKey } from '@/api/search';
    export default {
        created() {
            this._getHotKey();
        },
        data() {
            return {
                hotKeyList: []
            }
        },
        methods: {
            _getHotKey() {
                hotKey().then((res) => {
                    this.hotKeyList = res.data.hotkey.slice(0,10)
                })
            },
            selKey(key) {
                console.log('点击了');
                this.$emit('selKey', key)
            },
        }
    }
</script>

<style lang='stylus' rel="stylesheet/stylus">
@import "./../../common/stylus/variable"
@import "./../../common/stylus/mixin"

      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
</style>

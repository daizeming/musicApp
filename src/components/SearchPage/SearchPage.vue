<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref='box' @query='queryFn'></search-box>
        </div>
        <div class="shortcut-wrapper" v-show='!query'>
            <shortcat @selKey='setKey'></shortcat>
        </div>
        <div class="search-result" v-show='query'>
            <suggest :query='query'></suggest>
        </div>
    </div>
</template>

<script>
    import SearchBox from '@/base/SearchBox';
    import Shortcat from '@/base/Shortcat/Shortcat';
    import Suggest from '@/base/Suggest/Suggest';

    export default {
        components: {
            SearchBox,
            Suggest,
            Shortcat
        },
        data() {
            return {
                query: '',
                hotKey: ''
            }
        },
        methods: {
            queryFn(newQuery) {
                this.query = newQuery
            },
            setKey(key) {
                // setQuery方法为search-box组件里的方法
                this.$refs.box.setQuery(key);
            }
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./../../common/stylus/variable"
  @import "./../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

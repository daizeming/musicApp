<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" class="box"
                :placeholder="placeholder"
                v-model="query">
        <i class="icon-dismiss" @click="clear"></i>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '输入搜索歌曲…'
            }
        },
        data() {
            return {
                query: ''
            }
        },
        methods: {
            clear() {
                this.query = ''
            },
            blur() {
                this.$refs.query.blur();
            },
            // 可以在外部调用该方法，去修改query的值
            setQuery(key) {
                this.query = key;
            },
            // 函数节流
            // 在指定时间内只触发一次，防止频繁触发
            // 如scroll事件
            throttle(fn, delay) {
                let active = true;

                return function(...params) {
                    if (!active) {
                        return
                    }
                    active = false;
                    setTimeout(function() {
                        fn.apply(this, params);
                        active = true;
                    }, delay);
                }
            }
        },
        created() {
            this.$watch('query', this.throttle((newQuery) => {
                this.$emit('query', newQuery);
            }, 300))
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./../common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      outline: 0
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>

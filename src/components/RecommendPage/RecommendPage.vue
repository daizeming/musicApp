<template>
    <div>
        this is RecommendPage
    </div>
</template>

<script>
    import { getRecommend } from '@/api/recommend'
    export default {
        created() {
            this._getRecommend()
        },
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                        console.log(res.data);
                    })
            }
        }
    }
</script>

<style>

</style>

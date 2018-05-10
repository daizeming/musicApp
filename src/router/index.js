import Vue from 'vue'
import Router from 'vue-router'
import RecommendPage from '@/components/RecommendPage/RecommendPage'
import SingerPage from '@/components/SingerPage/SingerPage'
import RankPage from '@/components/RankPage/RankPage'
import SearchPage from '@/components/SearchPage/SearchPage'
import MusicList from '@/components/MusicList/MusicList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend',
    },
    {
        path: '/recommend',
        name: 'recommend',
        component: RecommendPage,
        children: [
            {
                path: ':id',
                name: 'musicList',
                component: MusicList,
                props: true
            }
        ]
    },
    {
        path: '/singer',
        name: 'singer',
        component: SingerPage
    },
    {
        path: '/rank',
        name: 'rank',
        component: RankPage
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage
    }
  ]
})

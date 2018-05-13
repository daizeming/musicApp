import jsonp from '@/common/js/jsonp'
import { commonParams, options } from '@/api/config'
// 1. 根据搜索内容，请求歌曲信息
// 2. 根据歌曲信息，请求歌曲数据
// 3. 合并为一个新的歌曲对象
// 4. 根据歌曲对象渲染到视图中

export function search(query, page) {
    let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    let data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        perpage: 20,
        n: 20,
        catZhida: 1,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    });

    return jsonp({url, data, options});
}


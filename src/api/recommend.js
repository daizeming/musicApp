import jsonp from '@/common/js/jsonp'
import axios from 'axios'

import { commonParams, options } from '@/api/config'

// 获取轮播图数据
export function getRecommend() {
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    return jsonp({url, data, options});
};

// 获取所有歌单列表数据
export function getSongMenuList() {
    let url = 'api/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.18784503255492258';
    // let data = Object.assign({}, commonParams, {
    //     platform: 'yqq',
    //     hostUin: 0,
    //     sin: 0,
    //     ein: 29,
    //     sortId: 5,
    //     needNewCode: 0,
    //     categoryId: 10000000,
    //     rnd: 0.30357356101590605
    // })
    return axios.get(url);
}

// 根据id获取单个歌单信息
export function getMusicList(disstid) {
    const url = 'api/api/getCdInfo';
    let data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    return axios.get(url, {
            params: data
        })
}


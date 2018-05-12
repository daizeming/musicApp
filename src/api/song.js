import jsonp from '@/common/js/jsonp'
import axios from 'axios'

import { commonParams, options } from '@/api/config'

// 获取歌曲数据

export function getSong(songIdArr, songtypeArr) {

    return axios({
        method: 'post',
        url: 'api/api/getPurlUrl',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        data: {
            comm: {
                format: "json",
                g_tk: 5381,
                inCharset: "utf-8",
                needNewCode: 1,
                notice: 0,
                outCharset: "utf-8",
                platform: "h5",
                uin: 0
            },
            url_mid: {
                method:"CgiGetVkey",
                module:"vkey.GetVkeyServer",
                param: {
                    guid: "154502760",
                    loginflag: 0,
                    platform: "23",
                    songmid: songIdArr,
                    songtype: songtypeArr,
                    uin: "0"
                }
            },
        }
    })
}

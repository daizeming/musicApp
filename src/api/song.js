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
                    guid: "3108154375",
                    loginflag: 0,
                    platform: "23",
                    songmid: [
                        "0047MZMS4Rgs5q",
                        "003oSHqU13lmJn",
                        "003vJXx622qpAO",
                        "002vT1cp4028hi",
                        "001y7C2n4aEbL2",
                        "003Fd84h2Vyl46",
                        "004IJh7J04vajf",
                        "002mwMJB06105S",
                        "002eqEBK0WLswh",
                        "001TZq0s4W36Y9",
                        "004SAzCY0awvJX",
                        "000e5W3h2yaHyi",
                        "0000X54b4LQIm2",
                        "0027v3Wr1OZSvy",
                        "002vJ9R920JtvP",
                        "0037geqo2cpzcD",
                        "000in2YA493wBR",
                        "000ZwMJ81CDU3E",
                        "003eWVoY0GX4Lh",
                        "0003DrBj1ilD5V",
                        "000X8Fkx2y790T"
                    ],
                    songtype: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    uin: "0"
                }
            },
        }
    })
}

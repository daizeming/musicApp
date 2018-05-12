// 将歌曲的信息整合到一个新的对象上
// 通new的方式创建新song信息
export class Song {
    constructor(songInfo, songUrl) {
        this.songName = songInfo.songname;
        this.singer = songInfo.singer[0].name;
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.albummid}.jpg?max_age=2592000`
        this.url = songUrl.purl;
    }
}

export function createSong(songInfo, songUrl) {
    return new Song(songInfo, songUrl);
}

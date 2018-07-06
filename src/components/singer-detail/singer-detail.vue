<!--  -->
<template>
<transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import { Song,createSong } from '../../common/js/song'
import MusicList from '../music-llist/music-list'
export default {
  data () {
    return {
        songs: []
    };
  },

  components: {
    MusicList,
    
  },
  created() {
      this._GetDetail()
      
  },
  computed: {
      //mutation
      ...mapGetters([
          'singer'
      ]),
      title(){
          return this.singer.name
      },
      bgImage(){
          return this.singer.avatar
      }
  },
  mounted(){
     console.log('====================================');
     console.log(this.songs);
     console.log('====================================');
  },
  methods: {
      _GetDetail() {
          if(!this.singer.id){
              this.$router.push('/singer')
              return false
          }
          //jsonp数据
          getSingerDetail(this.singer.id).then( (res) => {
              if(res.code === ERR_OK) {
                  //调用_normalizeSongs 获取列表歌曲
                 this.songs = this._normalizeSongs(res.data.list) 
              }
          } )
      },
      _normalizeSongs(list) {
          let ret = []
          //对象取值
          list.forEach( (item) => {
              let { musicData } = item
              //必须传2个id过去
              if( musicData.songid && musicData.albummid ) {
                  ret.push(createSong(musicData))
              }
          })
          //返回数据
          return ret
      }
  }
}

</script>
<style lang='stylus' scoped>
  @import "../../common/stylus/variable"
  .singermain
   position: fixed
   z-index: 100
   top: 0
   left: 0
   right: 0
   bottom: 0
   background: $color-background  
.slide-enter-active, .slide-leave-active
 transition: all 0.3s
.slide-enter, .slide-leave-to
 transform: translate3d(100%,0,0)
</style>
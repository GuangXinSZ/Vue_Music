<!--  -->
<template>
<transition name="slide">
  <div class="singermain">22222</div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    };
  },

  components: {
    
  },

  computed: {
      ...mapGetters([
          'singer'
      ])
  },
  mounted(){
      console.log(this.singer)
  },
  methods: {}
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
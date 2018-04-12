<template>
<!--初始化-->
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
          
      </div>
      <div class="dots">
        <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex==index}"></span>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from '../../common/js/dom'
export default{
  props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data(){
        return{
          dots: [],
          currentPageIndex: 0
        }
    },
    created(){
      setTimeout(()=>{
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if(this.autoPlay){
          this._play()
        }
      },20);
      window.addEventListener('resize',()=>{
        if(!this.slider) {
          return
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      })
    },
    methods: {
      _setSliderWidth (isRsize) {
        /* 初始化函数 */
         this.children = this.$refs.sliderGroup.children
         console.log(this.children.length);
         let width = 0
         /* 获取宽度 */
         let sliderWidth = this.$refs.slider.clientWidth
         /* 循环得到每一个子元素 */
         for(var i=0;i<this.children.length;i++){
           /* 得到每一个子元素 */
           let child = this.children[i]
           /* 调用addClass方法 */
           addClass(child,'slider-item')
           /*设置每个宽度 */
           child.style.width = sliderWidth + 'px'
           /*整个宽度 */
           width +=sliderWidth

         }
         /*实现滚动轮播需要克隆 2个宽度 */
         if(this.loop && !isRsize){
           /* 且跟非的意思 */
           width +=2 * sliderWidth
         } 
         this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
          this.slider = new BScroll(this.$refs.slider,{
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: this.loop,
            snapThreshold: 0.3,
            snapSeep:400
            //click: true
          })
          this.slider.on('scrollEnd',() => {
            /*获取pageindex */
            let pageIndex = this.slider.getCurrentPage().pageX
            if(this.loop){
              pageIndex -=1;
            }
            this.currentPageIndex = pageIndex

            if(this.autoPlay){
              clearTimeout(this.timer);
              this._play();
            }
          })
      },
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      _play(){
        let pageIndex = this.currentPageIndex + 1;
        if(this.loop){
          pageIndex +=1;
        }
        this.timer = setTimeout(()=>{
          this.slider.goToPage(pageIndex,0,400)
        },this.interval)
      }
    },
    destroyed(){
      /* 清除最后的一些时间差 */
      clearInterval(this.timer);
    }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .slider
     min-height: 1px
     position: relative
    .slider-group
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
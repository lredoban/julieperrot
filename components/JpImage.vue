<template>
  <figure
    class="jp-img-container"
    :class="[{loaded}, svgType ? 'svg-url-' + svgType : '', svgType ? 'svg-' + svgType : '', getSvgTop]">
    <div v-if="svgTop" class="top-icon">
      <img :src="`/images/svg/${svgType}.svg`" :alt="svgType">
    </div>
    <div v-if="!video" class="thumbnail">
      <img
        :src="thumbnailSrc"
        :alt="imgSrc + '-thumb'">
    </div>
    <lazy-component :class="{image: !video}">
      <video ref="video" v-if="video" autoplay="" muted="" loop="" playsinline="" tabindex="-1">
        <source :src="imgSrc" type="video/mp4">
      </video>
      <img v-else :src="customSrc"
          @load="loaded = true"
          :alt="imgSrc"
          class="jp-main-img">
    </lazy-component>
    <span class="border-right" :class="'gradient' + rightGradient"></span>
    <span class="border-bottom" :class="'gradient' + bottomGradient"></span>
  </figure>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    svgType: String,
    svgTop: String,
    'right-gradient': Number,
    'bottom-gradient': Number,
    imgSize: Object,
    video: Boolean
  },
  data () {
    return {
      loaded: false,
      thumbnailSrc: "",
      customSrc: ""
    } 
  },
  created () {
    this.$_ratio = this.imgSize.width / this.imgSize.height
    this.$_baseUrl = this.imgSrc + '?w=%width%&h=%height%'
  },
  mounted () {
    if (this.video) {
      this.$nextTick(() => this.$emit('load'))
      return
    }

    const img = new Image()
    const width = 64
    const height = parseInt(width / this.$_ratio)
    
    img.onload = () => { 
      const computedWidth = window.getComputedStyle(this.$el.querySelector('.thumbnail img')).width
      const widthWithRatio = parseInt(computedWidth.replace('px', '') * window.devicePixelRatio)
      this.customSrc = this.imgSrc + '?w=' + widthWithRatio
      this.$emit('load')
    }
    img.src = this.imgSrc + '?w=' + width + '&h=' + height + '&fm=jpg&q=42'
    this.thumbnailSrc = img.src
  },
  computed: {
    getSvgTop: function () {
      if ( this.svgTop !== 'right' && this.svgTop !== 'left') return false
      return 'svg-' + this.svgTop
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/helpers"
  @import "../assets/sass/cursor"

  .jp-img-container
    position: relative
    line-height: 0
    margin: 0
    padding-right: var(--gradient-border-right)
    padding-bottom: var(--gradient-border-bottom)
    &.spread
      @media #{$small-up}
        grid-column: span 2  
    .top-icon
      position: absolute
      top: -21px
      z-index: 27
      transition: opacity .3s ease
      opacity: 1
    &.svg-left .top-icon
      left: 14%
    &.svg-right .top-icon
      right: 14%
    &:hover .top-icon
      opacity: 0
    .border-right
      top: 0
      right: 0
      --gradient-angle: to top
      position: absolute
      height: calc(100% - var(--gradient-border-bottom))
      width: var(--gradient-border-right)
      transform-origin: left
      transform: skewY(37deg)
    .border-bottom
      --gradient-angle: to right
      position: absolute
      bottom: 0
      left: 0
      height: var(--gradient-border-bottom)
      width: calc(100% - var(--gradient-border-right))
      transform-origin: top
      transform: skewX(53deg)
    .image
      position: absolute
      top: 0
      bottom: var(--gradient-border-bottom)
      left: 0
      right: var(--gradient-border-right)
      overflow: hidden
      img
        opacity: 0
    .thumbnail
      overflow: hidden
      img
        opacity: 0.4
        filter: blur(7px)
    &.loaded .image img
      opacity: 1
      transition: opacity .6s ease-out
    video
      width: 100%
</style>

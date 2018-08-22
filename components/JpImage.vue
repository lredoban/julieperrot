<template>
  <figure
    class="jp-img-container"
    :class="[{loaded}, svgType ? 'svg-url-' + svgType : '', svgType ? 'svg-' + svgType : '', getSvgTop]">
    <div v-if="!video" class="thumbnail">
      <img
        :src="thumbnailSrc"
        :alt="imgSrc + '-thumb'">
    </div>
    <lazy-component class="image">
      <video v-if="video" autoplay="" loop="" playsinline="" tabindex="-1">
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
    const height = parseInt(16 / this.$_ratio) - 1
    
    img.addEventListener('load', () => { 
      const computedWidth = window.getComputedStyle(this.$el.querySelector('.thumbnail img')).width
      const widthWithRatio = parseInt(computedWidth.replace('px', '') * window.devicePixelRatio)
      this.customSrc = this.imgSrc + '?w=' + widthWithRatio
      this.$emit('load')
    }, false)
    img.src = this.imgSrc + '?w=16&h=' + height + '&fm=jpg&q=42'
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
    display: grid
    &.spread
      @media #{$small-up}
        grid-column: span 2  
    &.svg-right::after
      content: var(--svg-url, url("/images/svg/avocat.svg"))
      position: absolute
      top: -21px
      right: 14%
      display: block
      opacity: 1
      transition: opacity .3s ease
    &.svg-left::before
      content: var(--svg-url, url("/images/svg/avocat.svg"))
      position: absolute
      top: -21px
      left: 14%
      display: block
      opacity: 1
      transition: opacity .3s ease
    &:hover::after, &:hover::before
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
      grid-row: 1  
      grid-column: 1
    .thumbnail
      opacity: 1
      transition-delay: .4s
      overflow: hidden
      top: 0
      bottom: var(--gradient-border-bottom)
      left: 0
      right: var(--gradient-border-right)
      grid-row: 1  
      grid-column: 1
      img
        filter: blur(8px)
    &.loaded .thumbnail
      opacity: 0
    video
      width: 100%
</style>

<style lang="sass">
  .jp-img-container.loaded
    .jp-main-img
      opacity: 1
  .jp-main-img
    transition: opacity .4s ease
    opacity: 0
</style>

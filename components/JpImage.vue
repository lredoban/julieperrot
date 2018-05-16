<template>
  <figure
    class="jp-img-container"
    :class="[{loaded}, svgType ? 'svg-url-' + svgType : '', getSvgTop]">
    <div class="thumbnail">
      <img
        @load="$emit('load')"
        :src="imgSrc + '?w=16'"
        :alt="imgSrc + '-thumb'">
    </div>
    <vue-responsive-image
      :image-url="baseUrl"
      :image-ratio="ratio"
      :alt="imgSrc"
      :class="['jp-main-img', svgType ? 'svg-' + svgType : '']"
      @load="loaded = true"
      :width-on-screen="desktopSize"
      :width-on-screen-tablet="tabletSize"
      :width-on-screen-smartphone="phoneSize"
      ></vue-responsive-image>
    <span class="border-right" :class="'gradient' + rightGradient"></span>
    <span class="border-bottom" :class="'gradient' + bottomGradient"></span>
  </figure>
</template>

<script>
import VueResponsiveImage from '~/components/VueResponsiveImage.vue'

export default {
  components: { VueResponsiveImage },
  props: {
    imgSrc: String,
    svgType: String,
    svgTop: String,
    'right-gradient': Number,
    'bottom-gradient': Number,
    imgSize: Object,
    desktopSize: {
      type: Number,
      default: 100
    },
    tabletSize: {
      type: Number,
      default: 100
    },
    phoneSize: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      loaded: false
    } 
  }, 
  computed: {
    getSvgTop: function () {
      if ( this.svgTop !== 'right' && this.svgTop !== 'left') return false
      return 'svg-' + this.svgTop
    },
    baseUrl () {
      return this.imgSrc + '?w=%width%&h=%height%'
    },
    ratio () {
      return this.imgSize.width / this.imgSize.height
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/helpers"
  @import "../assets/sass/cursor"

  .jp-img-container
    position: relative
    height: fit-content
    line-height: 0
    margin: 0
    padding-right: var(--gradient-border-right)
    padding-bottom: var(--gradient-border-bottom)
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
    .thumbnail
      opacity: 1
      transition: opacity .6s ease
      overflow: hidden
      position: absolute
      top: 0
      bottom: var(--gradient-border-bottom)
      left: 0
      right: var(--gradient-border-right)
      img
        filter: blur(8px)
        /* this is needed so Safari keeps sharp edges */
        transform: scale(1)
    &.loaded .thumbnail
      opacity: 0
</style>

<style lang="sass">
  .jp-img-container.loaded
    .jp-main-img
      opacity: 1
  .jp-main-img
    transition: opacity .4s ease
    opacity: 0
</style>

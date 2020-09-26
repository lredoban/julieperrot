<template>
  <figure
    class="jp-img-container"
    :class="[{loaded}, svgType ? 'svg-url-' + svgType : '', svgType ? 'svg-' + svgType : '', getSvgTop]">
    <div v-if="svgTop" class="top-icon">
      <img :src="`/images/svg/${svgType}.svg`" :alt="svgType">
    </div>
    <lazy-component v-if="video">
      <video ref="video" v-if="video" autoplay="" muted="" loop="" playsinline="" tabindex="-1">
        <source :src="imgSrc" type="video/mp4">
      </video>
    </lazy-component>
    <div v-else>
      <img
        class="twic"
        width=""
        height=""
        :src="thumb"
        :data-src="imgSrc"
        :alt="imgSrc"
        @load="loaded">
    </div>
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
      nLoad: 0
    }
  },
  computed: {
    getSvgTop: function () {
      if ( this.svgTop !== 'right' && this.svgTop !== 'left') return false
      return 'svg-' + this.svgTop
    },
    thumb() {
      const url = this.imgSrc.split('image:').join('https://dz11y8g2.twic.pics/')
      return url + '?twic=v1/resize=2p'
    }
  },
  mounted () {
    if (this.video) {
      this.$nextTick(() => this.$emit('load'))
    }
  },
  methods: {
    loaded() {
      if (++this.nLoad === 1) {
        this.$emit('load')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/helpers"
  @import "../assets/sass/cursor"

  .twic
    opacity: 0.4
    filter: blur(7px)
    &.twic-done
      opacity: 1
      filter: blur(0)
      transition: opacity .6s ease-out
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
    video
      width: 100%
</style>

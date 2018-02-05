<template>
  <div class="jp-img-container" :class="['svg-url-' + svgType, getSvgTop]">
    <img :src="imgSrc" :alt="imgSrc" :class="'svg-' + svgType">
    <span class="border-right" :class="'gradient' + rightGradient"></span>
    <span class="border-bottom" :class="'gradient' + bottomGradient"></span>
  </div>
</template>

<script>
export default {
  props: ['imgSrc', 'svgType', 'svgTop', 'border-right', 'border-bottom', 'right-gradient', 'bottom-gradient'],
  computed: {
    getSvgTop () {
      return this.svgTop === 'right' ? "svg-right" :
              this.svgTop === 'left' ? "svg-left" : false
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  .jp-img-container
    position: relative
    width: fit-content
    line-height: 0
    box-sizing: border-box
    padding-right: 21px
    padding-bottom: 16px
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
      --gradient-angle: to top
      position: absolute
      height: calc(100% - 16px)
      width: 21px
      transform-origin: left
      transform: skewY(37deg)
    .border-bottom
      position: absolute
      bottom: 0
      left: 0
      height: 16px
      width: calc(100% - 21px)
      transform-origin: top
      transform: skewX(53deg)
</style>


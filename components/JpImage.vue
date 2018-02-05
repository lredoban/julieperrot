<template>
  <div class="img-container" :class="['svg-url-' + svgType, getSvgTop]">
    <img :src="imgSrc" :alt="imgSrc" :class="'svg-' + svgType">
  </div>
</template>

<script>
export default {
  props: ['imgSrc', 'svgType', 'svgTop'],
  computed: {
    getSvgTop () {
      return this.svgTop === 'right' ? "svg-right" :
              this.svgTop === 'left' ? "svg-left" : false
    }
  }
}
</script>

<style lang="sass" scoped>
  .img-container
    position: relative
    width: fit-content
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
</style>


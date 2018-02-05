<template>
  <div id="hero">
    <h1>
      <slot>The h1 title</slot>
    </h1>
  </div>
</template>

<script>
export default {
  props: ['bgUrl'],
  beforeMount () {
    document.body.style.setProperty('--bg-image', `url(${this.bgUrl})`);
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  #hero
    --gradient-angle: 123deg
    position: relative
    margin-top: 50px
    width: 100vw
    box-sizing: border-box
    background-size: cover
    display: grid
    align-items: end
    height: 154px
    padding: 20px
    padding-bottom: 32px
    background-image: var(--bg-image, none)
    @media #{$xsmall-up}
      padding: 36px
      padding-bottom: 52px
      height: 235px
    @media #{$small-up}
      padding: 66px
      padding-bottom: 82px
      height: 375px
    @media #{$medium-up}
      padding: 96px
      padding-bottom: 102px
      height: 454px
    @media #{$large-up}
      padding: 126px
      padding-bottom: 162px
      height: 704px
    @media #{$xlarge-up}
      padding: 206px
      padding-bottom: 219px
      height: 939px
    h1
      margin: 0
      line-height: 1em
</style>

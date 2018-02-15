<template>
  <div id="hero">
    <img :src="bgUrl" alt="Julie Perrot Hero">
    <h1>
      <slot>The h1 title</slot>
    </h1>
  </div>
</template>

<script>
export default {
  props: ['bgUrl'],
 /* beforeMount () {
    document.body.style.setProperty('--bg-image', `url(${this.bgUrl})`);
  }*/
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  #hero
    position: relative
    margin-top: 50px
    width: 100vw
    background-size: cover
    display: grid
    //background-image: var(--bg-image, none)
    h1
      position: absolute
      margin: 0
      line-height: 1
      left: 7vw
      bottom: calc(23.8636364% - 5px)
      @media #{$small-up}
        left: 17vw
        bottom: calc(23.8636364% - 8px)
</style>

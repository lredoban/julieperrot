<template>
  <div id="hero">
    <img :src="url" alt="Julie Perrot Hero">
    <h1>
      <slot>The h1 title</slot>
    </h1>
    <div class="subtitle">
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['background'],
 /* beforeMount () {
    document.body.style.setProperty('--bg-image', `url(${this.bgUrl})`);
  }*/
  data () {
    return {
      url: ''
    }
  },
  mounted () {
    this.url = this.background.url + '?fm=jpg&q=70&w=' + window.outerWidth
  }
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
    @media only screen and (min-width: 1175px)
      margin-top: calc(-2vw)
    h1
      margin: 0
      line-height: 1
    h1, .subtitle
      position: absolute
      left: 7vw
      bottom: calc(23.8636364% - 3px)
      @media #{$small-up}
        left: 17vw
        bottom: calc(23.8636364% - 6px)
    .subtitle
      transform: translateY(100%)
</style>

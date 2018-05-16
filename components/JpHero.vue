<template>
  <div id="hero">
    <vue-responsive-image
      :image-url="baseUrl"
      :image-ratio="ratio"
      alt="Julie Perrot Hero"
      ></vue-responsive-image>
    <h1>
      <slot>The h1 title</slot>
    </h1>
    <div class="subtitle">
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<script>
import VueResponsiveImage from '~/components/VueResponsiveImage.vue'

export default {
  components: { VueResponsiveImage },
  props: ['background'],
 /* beforeMount () {
    document.body.style.setProperty('--bg-image', `url(${this.bgUrl})`);
  }*/
  computed: {
    baseUrl () {
      return this.background.url + '?w=%width%&h=%height%&fm=jpg&q=70'
    },
    ratio () {
      return this.background.size.width / this.background.size.height
    }
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

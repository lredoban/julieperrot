<template>
  <main class="container">
    <section id="home-hero">
      <nav>
        <div class="h2">julie perrot</div>
        <ul class="doted">
          <nuxt-link tag="li" to="/charte">Charte</nuxt-link>
          <nuxt-link tag="li" to="/commissioned">Commissioned</nuxt-link>
          <nuxt-link tag="li" to="/escape">Escape</nuxt-link>
          <nuxt-link tag="li" to="/faces">Faces</nuxt-link>
          <nuxt-link tag="li" to="/stills">Stills</nuxt-link>
          <nuxt-link tag="li" to="/stories">Stories</nuxt-link>
          <nuxt-link tag="li" to="/video">Video</nuxt-link>
        </ul>
      </nav>
      <div class="presentation">
        <h2>French Photo- grapher</h2>
        <p>Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?</p>
      </div>
    </section>
    <section>
      <jp-gallery :images="homePage.featured">
        <h2>Last Pro- jects</h2>
      </jp-gallery>
      <div class="more">
        <button class="btn">View More</button>
      </div>
    </section>
    <section>About Me.</section>
    <section>
      <h4>Contact Form</h4>
    </section>
    <section>Follow Me</section>
  </main>
</template>

<script>
const contentful = require('~/plugins/contentful.js')
import JpGallery from '~/components/JpGallery.vue'

export default {
  async asyncData () {
    let raw = await contentful.getCMSData()
    return raw ? {...raw} : {}
  },
  components: {
    JpGallery
  }
}
</script>


<style lang="sass" scoped>
  @import '~assets/sass/helpers'

  .container
    margin-top: 50px

  #home-hero
    background: url(/images/bg-home-bleu.jpg)
    background-size: cover
    position: relative
    height: calc(90vh - 50px)
    display: grid
    justify-items: center
    align-items: center
    &::before
      content: ""
      position: absolute
      top: -50%
      left: 30%
      right: 0
      bottom: 50%
      background: url(/images/bg-home-jaune.jpg)
      background-size: cover
    &::after
      content: ""
      position: absolute
      top: 0
      left: 50%
      right: 0
      bottom: 0
      background: url(/images/bg-home-trame.jpg)
      background-size: cover
      background-repeat: no-repeat
      background-position: 50%
    .presentation
      z-index: 2
      padding: 0 10vw
      background: url(/images/bg-home-rond.jpg)
      background-position: -50% 0%
      background-repeat: no-repeat
      background-size: auto 80%
      h2
        margin-top: 1.5em
        margin-bottom: 0
        max-width: 260px
      p
        margin-bottom: 1em
    nav
      display: none
    ul.doted > li
      text-transform: uppercase
      grid-column-gap: 20px
    @media #{$xsmall-up}
      .presentation
        background-position: -10% 0%
    @media #{$small-up}
      grid-template-columns: 1fr 1fr
      padding: 5vh 0
      height: calc(100vh - 50px)
      &::after
        left: 35%
        top: 5%
      &::before
        left: 18%
        right: 0
        top: 5%
        bottom: 0
        background-size: auto 70%
        background-repeat: no-repeat
        z-index: 1
      .presentation
        background-position: 0% 0%
      nav
        display: block
        z-index: 2
        align-self: start
        .h2
          text-transform: lowercase
  
  .more
    margin: 4em
    text-align: center
</style>

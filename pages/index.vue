<template>
  <main class="container">
    <section id="home-hero" v-basicscroll="$_scrollOptions">
      <nav class="desktop">
        <div class="h2">julie perrot</div>
        <ul class="navigation doted">
          <li><a href="https://julieperrot.bigcartel.com"><span>Prints</span></a></li>
          <nuxt-link to="/work" title="Work" tag="li"><span>Work</span></nuxt-link>
          <nuxt-link to="/escape/escape" title="Escape" tag="li"><span>Escape</span></nuxt-link>
          <nuxt-link to="/film" title="Film" tag="li"><span>Film</span></nuxt-link>
          <nuxt-link to="/digital" title="Digital" tag="li"><span>Digital</span></nuxt-link>
          <nuxt-link to="/video" title="Video" tag="li"><span>Video</span></nuxt-link>
        </ul>
      </nav>
      <div class="presentation">
        <h1 class="h2">I<br>shoot Wild souls</h1>
        <div v-html="homePage.heroText"></div>
      </div>
    </section>
    <section>
      <jp-gallery :images="homePage.featured">
        <h2 class="h1">Last Pro- jects</h2>
      </jp-gallery>
        <div class="more">
          <nuxt-link tag="button" class="btn" to="/digital">View More</nuxt-link>
        </div>
    </section>
    <section class="about-container">
      <div class="about">
        <div class="about-text" v-html="homePage.about.presentation"></div>
        <div class="about-image">
          <jp-image
            :key="homePage.about.image.url"
            :svg-type="homePage.about.image.icon"
            :svg-top="homePage.about.image.iconPosition"
            :img-src="homePage.about.image.url"
            :img-size="homePage.about.image.size"
            :desktopSize="42"
            :tabletSize="42"
            :phoneSize="42"
            :right-gradient="homePage.about.image.rightBorder"
            :bottom-gradient="homePage.about.image.bottomBorder"/>
        </div>
      </div>
    </section>
    <jp-contact></jp-contact>
    <jp-instagram :posts="instagramPosts"></jp-instagram>
  </main>
</template>

<script>
const contentful = require('~/plugins/contentful.js')
import JpGallery from '~/components/JpGallery.vue'
import JpImage from '~/components/JpImage.vue'
import JpInstagram from '~/components/JpInstagram.vue'
import JpContact from '~/components/JpContact.vue'
import { homePage, instagramPosts} from '~/static/data/contentful.json'

export default {
  async asyncData () {
    return { homePage, instagramPosts }
  },
  components: {
    JpGallery,
    JpImage,
    JpInstagram,
    JpContact
  },
  created () {
    this.$_scrollOptions = {
      from: 'bottom-middle',
      to: 'bottom-top',
      props: {
        '--header-opacity': {
          from: 0,
          to: 1
        }
      }
    }
  },
  mounted () {
    document.querySelector('html').style.setProperty('--header-opacity', '0')
  },
  beforeDestroy () {
    document.querySelector('html').style.setProperty('--header-opacity', '1')
  },
  head() {
    return {
      meta: [
      { hid: 'description', hid: 'description', name: 'description', content: homePage.seoDescription },
      { hid: 'socialDescription', property: 'og:description', content: homePage.socialDescription },
      { hid: 'socialImage', property: 'og:image', content: 'https:' + homePage.socialImage + '?fm=jpg&w=1200&h=627&fit=fill' },
      ]
    }
  }
}
</script>


<style lang="sass" scoped>
  @import '~assets/sass/helpers'
  
  #home-hero
    background: #ccc7fd
    background-image: url(/images/noise98op5.png)
    background-image: url(/images/noise98op5.png), linear-gradient(135deg, #b0e7d6, #ccc7fd)
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
      background: url(/images/bg-home-jaune.png) no-repeat
    &::after
      content: ""
      position: absolute
      top: 0
      left: 50%
      right: 0
      bottom: 0
      background: url(/images/bg-home-trame.png)
      background-size: contain
      background-repeat: repeat-y
      background-position: 50%
    .presentation
      z-index: 2
      padding: 0 10vw
      background: url(/images/bg-home-rond.jpg)
      background-position: -50% 0%
      background-repeat: no-repeat
      background-size: auto 80%
      h1
        margin-top: 1.5em
        margin-bottom: 0
        max-width: 260px
      p
        margin-bottom: 1em
    nav
      display: none
      &.desktop
        margin-left: 2em
    ul.doted > li
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
    @media #{$medium-up}
      nav.desktop
        margin-left: 0
  .more
    margin: 4em
    text-align: center
  
  .about-container
    background: $gradientBeta
    margin-top: 150px
  .about
    margin: 0 auto
    max-width: var(--max-width)
    padding: 0 30px 60px
    display: grid
    justify-items: center
    align-items: center
    grid-auto-flow: dense
    grid-row-gap: 50px
    .about-image
      width: 100%
    @media #{$xsmall-up}
      grid-column-gap: 20px
      grid-template-columns: 1fr 1fr
      padding-bottom: 0
      .about-text
        grid-column-start: 2
        align-self: start
      .about-image
        padding: 15% 0
    @media #{$small-up}
      grid-column-gap: 100px
      padding: 0 60px
</style>

<style lang="sass">
  @import '~assets/sass/helpers'

  .about h2
    max-width: 42px
    margin-top: -36px
    @media #{$small-up}
      margin-top: -65px
</style>

<template>
  <main class="container">
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
import { homePage, instagramPosts} from '~/static/data/contentful.json'

export default {
  async asyncData () {
    return { homePage, instagramPosts }
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

  .container > section
    margin-top: 2em
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

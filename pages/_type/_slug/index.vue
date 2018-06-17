<template>
  <main>
    <jp-hero :background="hero">
      <nuxt-link v-if="type.slug !== slug" :to="'/' + type.slug">{{ type.title }}</nuxt-link>
      <span v-else>{{ type.title }}</span>
      <div slot="subtitle" v-if="type.slug !== slug">
        <div class="category-nav">
          <nuxt-link v-if="prev" :to="prev" class="category-prev"></nuxt-link>
          <div v-else></div>
          <h3>{{ title }}</h3>
          <nuxt-link v-if="next" :to="next" class="category-next"></nuxt-link>
        </div>
      </div>
    </jp-hero>
    <div class="description" v-html="description || ''"></div>
    <div class="images">
      <jp-image v-for="img in images"
        :class="{spread: isPowtrait(img.size)}"
        :key="img.url"
        :svg-type="img.icon"
        :svg-top="img.iconPosition"
        :img-src="img.url"
        :img-size="img.size"
        :desktopSize="isPowtrait(img.size) ? 100 : 50"
        :tabletSize="isPowtrait(img.size) ? 100 : 50"
        :phoneSize="100"
        :right-gradient="img.rightBorder"
        :bottom-gradient="img.bottomBorder"/>
    </div>
  </main>
</template>

<script>
import JpImage from '~/components/JpImage.vue'
import JpHero from '~/components/JpHero.vue'
const contentful = require('~/plugins/contentful.js')
import data from '~/static/data/contentful.json'

export default {
  async asyncData ({ params, error }) {
    const currentType = contentful.getIndexOfType(data, params.type)
    if (typeof currentType === 'undefined'){
      return error({ statusCode: 404, message: 'Collection Type not found' })
    }
    const currentIndex = contentful.getSideColllections(currentType.collections, params.slug)
    if (currentIndex === false){
      return error({ statusCode: 404, message: 'Album not found' })
    }
    return {
      ...currentType.collections[currentIndex],
      prev: currentIndex === 0 ? false : '/' + currentType.slug + '/' + currentType.collections[currentIndex - 1].slug,
      next: currentType.collections[currentIndex + 1] ? '/' + currentType.slug + '/' + currentType.collections[currentIndex + 1].slug : false,
      hero: currentType.hero,
      type: { title: currentType.title, slug: currentType.slug }
    }
  },
  components: {
    JpImage,
    JpHero
  },
  head () {
    const meta = [
        { hid: 'socialTitle', property: 'og:title', content: 'Julie Perrot - ' + this.title },
        { hid: 'socialImage', property: 'og:image', content: 'https:' + this.images[0].url + '?fm=jpg&w=1200&h=627&fit=fill' },
        { hid: 'url', property: 'og:url', content: 'https://juliperrot.com' + this.$route.path }
      ]
    if (this.description) {
      meta.push(
        { hid: 'description', hid: 'description', name: 'description', content: this.description },
        { hid: 'socialDescription', property: 'og:description', content: this.description }
      )
    }
    return {
      title: 'Julie Perrot - ' + this.title,
      meta
    }
  },
  mounted () {
    document.querySelector('html').style.setProperty('--header-opacity', '1')
    const gallery = document.querySelector('.images') // if there is multiple galleries?
    const images = [...gallery.children]

    images.map(img => {
      const randNum = Math.floor(Math.random() * 5) + 1
      const randNum2 = Math.floor(Math.random() * 5) + 1

      const alignement = randNum % 3 === 0 ? 'center' :
                          randNum % 3 === 1 ? 'left' : 'right'
      const translation = randNum2 % 3 === 0 ? '0' :
                          randNum2 % 3 === 1 ? '20px' : '-20px'
      img.style.setProperty('--random-alignement', alignement)
      img.style.setProperty('--random-translation', translation)
    })
  },
  methods: {
    isPowtrait(size) {
      return size.width > size.height
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  .description
    margin: 5rem 10px 3rem 20%
  .images
    max-width: var(--max-width)
    padding-left: 10px
    padding-right: 3px
    display: grid
    grid-row-gap: 2rem
    grid-column-gap: 10px
    margin: 0 auto
    @media #{$small-up}
      grid-template-columns: 1fr 1fr
      grid-row-gap: 4rem
      > *
        transform: translateY(var(--random-translation, 0))
    > *
      width: 80%
      justify-self: var(--random-alignement, center)

  .category-nav
    display: grid
    align-items: center
    grid-template-columns: 1fr auto 1fr
  .category-prev, .category-next
    position: relative
    height: 36px
    width: 36px
    border: 1px solid $black
    border-radius: 18px
    box-shadow: 1px 1px
    &::before, &::after
      content: ""
      position: absolute
      height: 3px
      width: 16px
      background-color: $black
      top: 50%
      transform: translateY(var(--translation, -50%)) rotate(var(--rotation, 0))
      border-radius: 2px
  .category-prev
    margin-right: 1rem
    &::before, &::after
      left: 27%
      transform-origin: left
    &::before
      --rotation: -45deg
      --translation: 0
    &::after
      --rotation: 45deg
  .category-next
    margin-left: .7rem
    margin-right: .3rem
    &::before, &::after
      right: 27%
      transform-origin: right
    &::before
      --rotation: -45deg
    &::after
      --translation: 0
      --rotation: 45deg
</style>

<style lang="sass">
  .description > p
    text-transform: uppercase
    font-weight: 400
</style>

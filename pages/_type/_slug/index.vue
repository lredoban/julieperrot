<template>
  <main>
    <jp-hero :background="hero">
      {{ type }}
      <div slot="subtitle">
        <div class="category-nav">
          <nuxt-link v-if="prev" :to="prev" class="category-prev"></nuxt-link>
          <h3>{{ title }}</h3>
          <nuxt-link v-if="next" :to="next" class="category-next"></nuxt-link>
        </div>
      </div>
    </jp-hero>
    <div class="description" v-if="description" v-html="description"></div>
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

export default {
  async asyncData ({ params, error, payload }) {
    if (payload) return payload
    else {
      let data = await contentful.getCMSData()
      const currentType = contentful.getIndexOfType(data, params.type)
      const currentIndex = contentful.getSideColllections(currentType.collections, params.slug)
      return {
        ...currentType.collections[currentIndex],
        prev: currentIndex === 0 ? false : currentType.collections[currentIndex - 1].slug,
        next: currentType.collections[currentIndex + 1] ? currentType.collections[currentIndex + 1].slug : false,
        hero: currentType.hero,
        type: currentType.title
      }
    }
  },
  components: {
    JpImage,
    JpHero
  },
  head () {
    return {
      title: 'Julie Perrot - ' + this.title
    }
  },
  mounted () {
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
    &::before, &::after
      right: 27%
      transform-origin: right
    &::before
      --rotation: -45deg
    &::after
      --translation: 0
      --rotation: 45deg
</style>

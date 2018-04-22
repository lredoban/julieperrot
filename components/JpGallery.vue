<template>
  <section class="gallery" :class="{'gallery-blank': !$slots.default}">
    <slot></slot>
    <div class="gallery__dummy" v-if="$slots.default"></div>
    <div class="gallery__dummy" v-if="$slots.default"></div>
    <div class="gallery__dummy" v-if="$slots.default"></div>
    <div class="gallery__item" v-for="{ slug, image, title, type } in images" :key="title">
      <nuxt-link :to="`/${type}/${slug}`">
        <jp-image
        :key="image.url"
        :svg-type="image.icon"
        :svg-top="image.iconPosition"
        :img-src="image.url"
        :right-gradient="image.rightBorder"
        :bottom-gradient="image.bottomBorder"/>
      </nuxt-link>
      <div class="gallery__item__info">
        <h4>{{title}}</h4>
        <em v-if="$slots.default">{{type}}</em>
      </div>
    </div>
  </section>
</template>

<script>
import JpImage from '~/components/JpImage.vue'

export default {
  name: 'JpGallery',
  components: { JpImage },
  props: ['images'],
  mounted (){
    const gallery = document.querySelector('.gallery') // if there is multiple galleries?
    const fractionHeight = window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows').replace('px', '')
    const galleryItems = [...gallery.children]
    const nbCol = Math.floor(this.getWidth(gallery) / this.getWidth(galleryItems[0]))
    const nbRowsByColumn = []

    galleryItems.map((item, i) => {
      console.warn();
      const image = item.getElementsByTagName('img')[0] || false
      const nbRow = image ? Math.floor(image.height / fractionHeight) + 4 : Math.floor(this.getHeight(item) / fractionHeight)
      const colIndex = Math.floor((item.getBoundingClientRect().x - gallery.getBoundingClientRect().x) / item.getBoundingClientRect().width)
      if (image) {
        item.style.gridRowEnd = `span ${nbRow}`
      }
      if (typeof nbRowsByColumn[colIndex] === 'undefined') {
        nbRowsByColumn[colIndex] = 0
      }
      nbRowsByColumn[colIndex] += nbRow
    })
    if (!this.$slots.default) return
    const gradientAngle = ['to right', 'to left', 'to top', 'to bottom']
    const NMax = Math.max(...nbRowsByColumn)
    nbRowsByColumn.sort().map((n, i) => {
      gallery.insertAdjacentHTML('beforeend', `
        <div class="gallery__filling" 
          style="
            grid-row: span ${NMax - n + 2};
            --gradient-angle: ${gradientAngle[i % 4]}
          "></div>
      `)
    })
  },
  methods: {
    getWidth (el) {
      return parseInt(window.getComputedStyle(el).width.replace('px', ''))
    },
    getHeight (el) {
      return parseInt(window.getComputedStyle(el).height.replace('px', ''))
    }
  }
}
</script>

<style lang="sass">
  @import "~assets/sass/helpers"
  // shout out to https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb

  .gallery
    padding: 0 5px
    margin: -1em auto 0
    max-width: var(--max-width)
    display: grid
    grid-auto-rows: 27px
    grid-gap: 0 10px
    grid-template-columns: 1fr 1fr
    @media #{$small-up}
      grid-template-columns: repeat(auto-fit, minmax(236px, 1fr))
      grid-gap: 0 40px
      padding: 0 60px
      .gallery__dummy
        grid-row-end: span 4
    h2
      margin-top: calc(-#{$h2LineHeight} / 2) 
      z-index: 1
      grid-row-end: span 8
      max-width: 200px
    .gallery__dummy
      grid-row-end: span 1
    .gallery__item
      opacity: var(--opacity, 1)
      will-change: opacity
      transition: opacity .1s
      h4
        margin: 5px 0
    .gallery__filling
      background: $gradientBeta
    &.gallery-blank
      padding-top: 2em
      padding-bottom: 4em

</style>

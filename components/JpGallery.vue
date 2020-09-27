<template>
  <section ref="gallery" class="gallery" :class="{'gallery-blank': !$slots.default}">
    <slot></slot>
    <div class="gallery__dummy" v-if="$slots.default"></div>
    <div class="gallery__dummy" v-if="$slots.default"></div>
    <div class="gallery__item twic-view"
      v-for="{ slug, image, title, type, rowEnd } in gImages"
      :style="{gridRowEnd: rowEnd}"
      :key="title">
      <nuxt-link :to="`/${type.slug}/${slug}`">
        <jp-image
          :key="image.url"
          :svg-type="image.icon"
          :svg-top="image.iconPosition"
          :img-src="image.url"
          :img-size="image.size"
          :right-gradient="image.rightBorder"
          :bottom-gradient="image.bottomBorder"
          :video="image.video"
          @load="addLoad"/>
      </nuxt-link>
      <div class="gallery__item__info">
        <h4>{{title}}</h4>
        <small v-if="$slots.default">{{type.title}}</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JpGallery',
  props: ['images'],
  data () {
    return {
      gImages: [],
      load: 0
    }
  },
  created() {
    this.gImages = this.images.map(img => {
      return {...img, rowEnd: 'span 17'}
    })
  },
  mounted() {
    this.$_fractionHeight = 27 //not dynamic, same value as in the css grid-auto-rows
    this.$_gallery = this.$refs.gallery
    this.$_galleryItems = [...this.$_gallery.children]
  },
  methods: {
    doTheMasonry () {
      const nbRowsByColumn = []

      this.$_galleryItems.map((item, i) => {
        const media = item.getElementsByTagName('img')[0] || item.getElementsByTagName('video')[0] || false
        const nbRow = this.getRowEnd(item)
        const colIndex = Math.floor((item.getBoundingClientRect().x - this.$_gallery.getBoundingClientRect().x) / item.getBoundingClientRect().width)

        if (!media) {
        // this ugly Kid handle the double column title
          const colSpan = window.getComputedStyle(item).getPropertyValue('grid-column-end')
          if (colSpan === 'span 2') {
            if (typeof nbRowsByColumn[colIndex + 1] === 'undefined') {
              nbRowsByColumn[colIndex + 1] = 0
            }
            nbRowsByColumn[colIndex + 1] += nbRow
          }
        }
        // End of Ugly Kid
        if (typeof nbRowsByColumn[colIndex] === 'undefined') {
          nbRowsByColumn[colIndex] = 0
        }
        nbRowsByColumn[colIndex] += nbRow
      })
      const gradientAngle = ['to right', 'to left', 'to top', 'to bottom']
      const NMax = Math.max(...nbRowsByColumn)
      nbRowsByColumn.sort((a, b) => a - b).map((n, i) => {
        this.$_gallery.insertAdjacentHTML('beforeend', `
          <div class="gallery__filling"
            style="
              grid-row: span ${NMax - n + 2};
              --gradient-angle: ${gradientAngle[i % 4]}
            "></div>
        `)
      })
    },
    setImagesRowEnd () {
      const colWidth = this.$_galleryItems[1].getBoundingClientRect().width

      this.gImages.map((item) => {
        const nbRow = Math.floor(item.image.size.height * colWidth / item.image.size.width / this.$_fractionHeight) + 4
        item.rowEnd = `span ${nbRow}`
      })
    },
    addLoad () {
      this.load ++

      if (this.load === 1) {
        this.setImagesRowEnd()
      }
      if (this.$slots.default && this.images && this.images.length === this.load) {
        this.doTheMasonry()
      }
    },
    getRowEnd (el) {
      const str = window.getComputedStyle(el).getPropertyValue('grid-row-end')
      return parseInt(str.substr(5,2))
    }
  }
}
</script>

<style lang="sass">
  @import "~assets/sass/helpers"
  // shout out to https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb

  .gallery
    padding: 0 5px
    margin: -0.8em auto 0
    max-width: var(--max-width)
    display: grid
    grid-auto-rows: 27px
    grid-gap: 0 10px
    grid-template-columns: 1fr 1fr
    @media #{$small-up}
      grid-template-columns: repeat(auto-fit, minmax(236px, 1fr))
      grid-gap: 0 40px
      padding: 0 60px
    h2
      margin-top: calc(-1.4em / 2)
      z-index: 1
      grid-row-end: span 6
      grid-column-end: span 1
      max-width: 200px
      @media #{$small-up}
        grid-row-end: span 9
        margin-top: calc(-1.7em / 2)
      @media only screen and (min-width: 1184px) // when gallery grid add one column
        margin-left: 1.3em
        grid-column-end: span 2
    .gallery__dummy
      grid-row-end: span 1
      @media only screen and (min-width: 908px) // when gallery grid add one column
        grid-row-end: span 4
    .gallery__item
      opacity: var(--opacity, 1)
      will-change: opacity
      transition: opacity .1s
      h4
        margin: 5px 0
    .gallery__filling
      background: $gradientAlpha
      margin-right: var(--gradient-border-right)
      margin-bottom: var(--gradient-border-bottom)
    &.gallery-blank
      padding-top: 2em
      padding-bottom: 4em

</style>

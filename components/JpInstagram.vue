<template>
  <section id="instagram">
    <h2>Follow Me!</h2>
    <a
      v-for="img in IGImages"
      :href="img.link"
      :key="img.id"
      :style="translateImages(img.transform, img.offset)"
      target="_blank">
      <img :src="img.src" :alt="img.alt" @load="loaded">
    </a>
  </section>
</template>

<script>
export default {
  data (){
    return {
      IGImages: [],
      loadedImgs: 0
    }
  },
  created () {
    this.$_token = '446368.a5974e1.797debbb016841079b532e868adfe97f'
    this.$_baseUri = 'https://api.instagram.com/v1/users/self/media/recent?access_token='
    this.$_instance = null
  },
  mounted () {
    if (process.browser) {
      const scrElement = document.createElement( 'script' )
      window.jsonpCallback = this.jsonpCallback
      scrElement.setAttribute( 'src', `${this.$_baseUri}${this.$_token}&callback=jsonpCallback&count=11`)
      document.body.appendChild( scrElement )
    }
  },
  methods: {
    jsonpCallback(data) {
      data.data.map((item, i) => {
        const randomTranslation = i === 0 ? 0 : Math.floor(Math.random() * 21 ) + 5
         this.IGImages.push({
          id: item.id,
          src: item.images.standard_resolution.url,
          alt: item.caption ? item.caption.text : "No caption image",
          link: item.link,
          transform: i % 2 ? randomTranslation : -randomTranslation,
          offset: 0
        })
      })
    },
    translateImages(percentage, offset = 0) {
      const tValue = offset ? `calc(${percentage}% + ${offset}px)` : percentage + '%'
      return `transform: translateY(${tValue})`
    },
    adjustOverlappingImages() {
      const imgs = document.querySelectorAll('#instagram a')
      const positions = this.createPosArray([...imgs])
      Object.keys(positions).map(key => {
        const column = positions[key]
        let columnOffset = 0
        for (let row = 0; row < column.length; row++) {
          if (row === 0) continue
          const diff = column[row - 1].boundings.bottom - column[row].boundings.top
          if (diff >= 0) {
            columnOffset += diff + 10
          }
          if (columnOffset) {
            this.IGImages[column[row].index].offset = columnOffset
          }
        }
      })
    },
    createPosArray(elements) {
      const positions = {}
      elements.map((el, index) => {
        const boundings = el.getBoundingClientRect()
        if (typeof positions[boundings.x] === "undefined") positions[boundings.x] = []
        positions[boundings.x].push({index, boundings})
      })
      return positions
    },
    loaded() {
      this.loadedImgs += 1
      if (this.IGImages.length && this.IGImages.length === this.loadedImgs) {
        this.$nextTick(() => {this.adjustOverlappingImages()})
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  #instagram
    max-width: var(--max-width)
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 10px
    padding: 50px 10px
    @media #{$small-up}
      padding: 100px 10px
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))    
    h2
      align-self: center
      justify-self: center
      width: min-content 
      grid-row-end: span 2
      grid-column: 1 / span 2
      @media #{$medium-up}
        grid-column: 1 / span 3
</style>

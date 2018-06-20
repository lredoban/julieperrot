<template>
  <section id="instagram" ref="instagram" v-basicscroll.selfStart="$_scrollOptions">
    <h2 class="h1"><a href="https://www.instagram.com/julieperrot/" target="_blank">Follow Me!</a></h2>
    <a
      v-for="img in IGImages"
      :href="img.link"
      :key="img.id"
      :style="translateImages(img.transform, img.offset)"
      target="_blank">
      <div :style="`padding-bottom: ${img.height/img.width*100}%`"></div>
      <img v-lazy="img.src" :alt="img.alt" @load="loaded">
    </a>
  </section>
</template>

<script>
export default {
  props: ['posts'],
  data (){
    return {
      IGImages: [],
      loadedImgs: 0
    }
  },
  created () {
    this.$_scrollOptions = {
      from: 'top-bottom',
      to: 'middle-middle',
      direct: true,
      props: {
        '--offsetY' : {
          from: '.3',
          to: '1'
        }
      }
    }
  },
  mounted(){
    this.posts.map((post, i) => {
      const randomTranslation = i === 0 ? 0 : Math.floor(Math.random() * 21 ) + 5
       this.IGImages.push({
        ...post,
        transform: i % 2 ? randomTranslation : -randomTranslation,
        offset: 0
      })
    })
    this.$nextTick(() => {
      this.adjustOverlappingImages()
    })
  },
  methods: {
    translateImages(percentage, offset = 0, height, width) {
      const tValue = offset ? `${percentage}% + ${offset}px` : percentage + '%'
      return `transform: translateY(calc(var(--offsetY) * ${tValue}))`
    },
    adjustOverlappingImages() {
      const imgs = document.querySelectorAll('#instagram > a')
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
      if (this.IGImages.length && this.IGImages.length * 2 === this.loadedImgs) {
        document.getElementById('instagram').classList.add('reveal')
        this.$refs.instagram.$BSInstance.calculate()
        this.$refs.instagram.$BSInstance.start()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  #instagram
    --offsetY: 1
    max-width: 1920px
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 10px
    padding: 50px 10px
    margin: 0 auto
    @media #{$small-up}
      padding: 100px 10px
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))    
    @media only screen and (min-width: 1480px) // when gallery grid add one column
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))    
    h2
      align-self: center
      justify-self: center
      width: min-content 
      grid-row-end: span 2
      grid-column: 1 / span 2
      @media #{$medium-up}
        grid-column: 1 / span 3
    > a
      will-change: transform
      position: relative
      > div
        height: 0
    img
      opacity: 0
      position: absolute
      top: 0
      left: 0
      will-change: opacity
      transition: opacity .7s ease-out
    &.reveal
      img
        opacity: 1
      > a
        transition: transform .3s ease-out
        &:nth-child(3n + 1)
          transition: transform .5s ease-out
        &:nth-child(2n + 1)
          transition: transform .7s ease-out

</style>

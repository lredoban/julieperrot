<template>
  <section id="instagram" v-basicscroll="'test'">
    <h2>Follow Me!</h2>
    <a
      v-for="img in IGImages"
      :href="img.link"
      :key="img.id"
      :style="'transform:' + img.transform"
      target="_blank">
      <img :src="img.src" :alt="img.alt">
    </a>
  </section>
</template>

<script>
export default {
  data (){
    return {
      IGImages: []
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
         this.IGImages.push({
          id: item.id,
          src: item.images.standard_resolution.url,
          alt: item.caption ? item.caption.text : "No caption image",
          link: item.link,
          transform: this.translateImages(i)
        })
      })
    },
    translateImages(index) {
      if (index === 0) { return ''}
      return index % 2 ? 'translateY(25%)' : 'translateY(-25%)'
    }
  }
}
</script>

<style lang="sass" scoped>
  #instagram
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-gap: 10px
    padding: 100px 10px
    h2
      align-self: center
      justify-self: center
      width: min-content 
      grid-row-end: span 2
      grid-column: 1 / span 3
    img
      opacity: var(--opacity, 1)
      will-change: opacity
      transition: opacity .1s
</style>

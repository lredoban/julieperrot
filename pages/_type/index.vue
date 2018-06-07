<template>
  <main>
    <jp-hero :background="hero">{{ title }}</jp-hero>
    <div>
      <jp-gallery :images="convertedCollections"/>
    </div>
  </main>
</template>

<script>
const contentful = require('~/plugins/contentful.js')
import JpImage from '~/components/JpImage.vue'
import JpHero from '~/components/JpHero.vue'
import JpGallery from '~/components/JpGallery.vue'

export default {
  async asyncData ({ params, error, payload }) {
    if (payload) return payload
    else {
      let data = await contentful.getCMSData()
      return data.collectionTypes.filter(type => type.slug === params.type)[0]
    }
  },
  components: {
    JpImage,
    JpHero,
    JpGallery
  },
  head () {
    return {
      title: 'Julie Perrot - ' + this.title
    }
  },
  mounted () {
    document.querySelector('html').style.setProperty('--header-opacity', '1')
  },
  computed: {
    convertedCollections () {
      return this.collections.map(col => {
        return {
          slug: col.slug,
          image: col.images[0],
          title: col.title,
          type: { slug: this.slug, title: this.title }
        }
      })
    }
  }
}
</script>
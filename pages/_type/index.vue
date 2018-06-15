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
import { collectionTypes } from '~/static/data/contentful.json'

export default {
  async asyncData ({ params, error, payload }) {
    const filteredTypes = collectionTypes.filter(type => type.slug === params.type)
    if (filteredTypes.length === 0) {
      return error({ statusCode: 404, message: 'Collection Type not found' })
    }
    return filteredTypes[0]
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
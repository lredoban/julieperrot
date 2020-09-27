<template>
  <main>
    <jp-hero>{{ title }}</jp-hero>
    <div>
      <jp-gallery :images="convertedCollections"/>
    </div>
  </main>
</template>

<script>
import JpHero from '~/components/JpHero.vue'
import JpGallery from '~/components/JpGallery.vue'
import { collectionTypes } from '~/static/data/contentful.json'

export default {
  async asyncData ({ params, error }) {
    const filteredType = collectionTypes.find(type => type.slug === params.type)
    if (!filteredType) {
      return error({ statusCode: 404, message: 'Collection Type not found' })
    }
    return filteredType
  },
  components: {
    JpHero,
    JpGallery
  },
  head () {
    return {
      title: 'Julie Perrot - ' + this.title,
      meta: [
        { hid: 'socialTitle', property: 'og:title', content: 'Julie Perrot - ' + this.title },
        { hid: 'socialImage', property: 'og:image', content: 'https:' + this.collections[0].images[0].url + '?fm=jpg&w=1200&h=627&fit=fill' },
        { hid: 'url', property: 'og:url', content: 'https://juliperrot.com' + this.$route.path }
      ]
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
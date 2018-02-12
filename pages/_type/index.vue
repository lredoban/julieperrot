<template>
  <main>
    <jp-hero :bg-url="hero">{{ title }}</jp-hero>
    <div>
      <nuxt-link v-for="col in collections" :to="`/${slug}/${col.slug}`" :key="col.slug">
        <jp-image 
          :key="col.images[0].url"
          :svg-type="col.images[0].icon"
          :svg-top="col.images[0].iconPosition"
          :img-src="col.images[0].url"
          :right-gradient="col.images[0].rightBorder"
          :bottom-gradient="col.images[0].bottomBorder"/>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
const contentful = require('~/plugins/contentful.js')
import JpImage from '~/components/JpImage.vue'
import JpHero from '~/components/JpHero.vue'

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
    JpHero
  }
}
</script>
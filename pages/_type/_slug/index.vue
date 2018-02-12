<template>
  <main>
    <jp-hero :bg-url="hero">{{ type }}</jp-hero>
    <div>
      <nuxt-link v-if="prev" :to="prev">{{ prev }}</nuxt-link>
      <h3>{{ title }}</h3>
      <nuxt-link v-if="next" :to="next">{{ next }}</nuxt-link>
    </div>
    <div v-if="description" v-html="description"></div>
    <div>
      <jp-image v-for="img in images"
        :key="img.url"
        :svg-type="img.icon"
        :svg-top="img.iconPosition"
        :img-src="img.url"
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
  }
}
</script>

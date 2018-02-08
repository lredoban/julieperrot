<template>
  <main>
    <h1>{{ title }}</h1>
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
import { getCMSData } from '~/plugins/contentful.js'
import JpImage from '~/components/JpImage.vue'

export default {
  async asyncData ({ params, error, payload }) {
    if (payload) return { payload }
    else {
      let data = await getCMSData()
      return { ...data.collections.filter(col => col.slug === params.slug)[0] }
    }
  },
  components: {
    JpImage
  }
}
</script>

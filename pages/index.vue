<template>
  <section class="container">
    <section>
      <h2>Last Projects</h2>
      <div v-html="homePage.presentation"></div>
      <ul>
        <li v-for="{ slug, image, title} in homePage.featured" :key="title">
          <nuxt-link :to="'/collections/' + slug">
            <img :src="image.url" :alt="title">
          </nuxt-link>
        </li>
      </ul>
    </section>
    <section>About Me.</section>
    <section>
      <h4>Contact Form</h4>
    </section>
    <section>Follow Me</section>
  </section>
</template>

<script>
import { getCMSData } from '~/plugins/contentful.js'

export default {
  async asyncData () {
    let raw = await getCMSData()
    return raw ? {...raw} : {}
  },
  mounted: function () {
    console.warn(this.collections, 'shiit')
  }
}
</script>


<style lang="sass" scoped>
  .container
    margin-top: 50px

  ul
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    grid-gap: 20px

</style>

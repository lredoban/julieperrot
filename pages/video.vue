<template>
  <section>
    <h1>Under Construction, Come back soon!</h1>
    <nuxt-link
      to="/"
      class="btn">
      Back to Home
    </nuxt-link>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: '👷🏽‍♀️ Video'
    }
  },
  mounted () {
    document.querySelector('html').style.setProperty('--header-opacity', '1')
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  section
    background: url(/images/under_construction.jpg) no-repeat
    background-size: cover
    height: 80vh
    width: 100vw
    display: grid
    justify-items: center
    align-content: center
    margin-top: 3em
    margin-bottom: -3em
    h1
      color: $white
      text-align: center
      text-shadow: 2px 2px $black
</style>

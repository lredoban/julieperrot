<template>
  <section>
    <h1>Nothing to see here!</h1>
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
      title: '404 - Not Found'
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  section
    background: url(https://images.ctfassets.net/bkf4htdwrnir/6ol7zMjxM4mWKeCAkcUEC2/da29e8badf87f0f802366825c158764a/0034_35.jpg) no-repeat
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

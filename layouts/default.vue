<template>
  <div>
    <jp-header/>
    <nuxt/>
    <jp-footer/>
  </div>
</template>

<script>
import JpHeader from '~/components/JpHeader.vue'
import JpFooter from '~/components/JpFooter.vue'

export default {
  components: {
    JpHeader,
    JpFooter
  }
}
</script>

<style lang="sass">
  @import ~assets/sass/style
</style>

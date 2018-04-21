<template>
  <img :src="getSrc" :alt="type" width="32px" @click="changeClass(type)" :class="{active: isCurrent}">
</template>

<script>
export default {
  props: ['type', 'changeClass', 'currentSvg'],
  computed: {
    getSrc: function () {
      return '/images/svg/' + this.type + '.svg'
    },
    isCurrent: function () {
      return this.currentSvg === this.type
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "../assets/sass/helpers"

  img
    width: 64px
    max-width: 100%
    cursor: pointer
    &.active
      background: $beige
</style>

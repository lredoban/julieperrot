<template>
  <div>
    <jp-header/>
    <nuxt/>
    <transition name="reveal">
      <jp-contact v-if="showContact"/>
    </transition>
    <jp-footer @toggle-contact="showContact = !showContact"/>
  </div>
</template>

<script>
import JpHeader from '~/components/JpHeader.vue'
import JpFooter from '~/components/JpFooter.vue'
import JpContact from '~/components/JpContact.vue'

export default {
  components: {
    JpHeader,
    JpFooter,
    JpContact
  },
  data () {
    return {
      showContact: false
    }
  }
}
</script>

<style lang="sass">
  .reveal-enter-active, .reveal-leave-active
    transition: transform .5s ease-in
  .reveal-enter, .reveal-leave-to
    transform: translateX(100%) scaleY(0.3)
</style>

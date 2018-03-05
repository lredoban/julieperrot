<template>
  <section id="contact">
    <form action="contact">
      <textarea v-model="message"></textarea>
      <button type="submit" class="btn" @click.prevent="'dummy'">Send My message</button>
    </form>
  </section>
</template>

<script>
export default {
  data (){
    return {
      message: 'Write me your message here'
    }
  }
}
</script>


<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  input, textarea, ::placeholder
    color: $black
    text-transform: uppercase
    font-size: 1.5rem
    text-decoration: underline
    font-weight: 600
    text-align: center
    line-height: 1.5
    letter-spacing: 0.2rem

  #contact
    max-width: var(--max-width)
    text-align: center
    padding: 50px 0
</style>

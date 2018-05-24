<template>
  <section id="contact">
    <form @submit.prevent="submit" rel="form">
      <div class="step" v-show="step === 1">
        <textarea name="message" v-model="message" placeholder="Any message?"></textarea>
        <button class="btn" @click.prevent="step = 2">Next</button>
      </div>
      <div class="step" v-show="step === 2">
        <input type="textarea" name="name" id="name" placeholder="Ok. What is your name?" v-model="name">
        <button class="btn" @click.prevent="step = 3">Next</button>
      </div>
      <div class="step" v-show="step === 3">
        <input type="email" name="email" id="email" placeholder="Your email?" v-model="email">
        <button type="submit" class="btn">Submit!</button>
      </div>
    </form>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data (){
    return {
      message: '',
      name: '',
      email: '',
      step: 1
    }
  },
  methods: {
    encode (data){
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    },  
    submit (){
      const {step, ...formData} = this.$data
      fetch("/thank-you", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({'form-name': 'contact', ...formData})
      })
      .then(rep => {
        console.log('good', rep)
      })
      .catch(err => {
        console.log('ugly', err)
      })
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
    border: none
    resize: none
  ::placeholder
    color: rgba($black, .3)

  #contact
    max-width: var(--max-width)
    text-align: center
    padding: 50px 0
  form, .step
    display: grid
    justify-items: center
    width: 100%
  .step
    > *:first-child
      width: 100%
  
</style>

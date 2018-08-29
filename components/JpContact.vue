<template>
  <section id="contact">
    <form v-if="step < 4" @submit.prevent="submit" rel="form">
      <transition name="fast-fade" mode="out-in" v-on:enter="onEnter">
        <div class="step" v-if="step === 1" key="message">
          <transition name="fade">
            <div class="error" v-if="$v.message.$dirty && !$v.message.minLength">
              Could you tell me more?
            </div>
          </transition>
          <transition name="fade">          
            <div class="error" v-if="showMeLove">
              Show me Some Love
            </div>
          </transition>
          <textarea 
            required 
            name="message"
            ref="message"
            aria-label="message"
            v-model="message" 
            rows="1" 
            minlength="15" 
            maxlength="276" 
            placeholder="Any message?"
            @input='resizeTextarea'></textarea>
          <button 
            class="btn" 
            @click.prevent="handleMessage"
            :disabled="message!== '' && $v.message.$invalid">Next</button>
          <button class="btn-prev btn-prev-dummy" disabled aria-hidden="true"></button>
        </div>
        <div class="step" v-if="step === 2" key="name">
          <transition name="fade">
            <div class="error" v-if="$v.name.$dirty && !$v.name.minLength">
              Your name is that short?
            </div>
          </transition>
          <input
            required
            type="text"
            maxlength="27"
            name="name"
            id="name"
            ref="name"
            placeholder="Ok. What is your name?"
            @input='delayedTouch($v.name)'
            v-model.trim="name">
          <button class="btn" 
            @click.prevent="step = 3" 
            :disabled="$v.name.$invalid">Next</button>
          <button class="btn-prev" @click.prevent="step = 1"><span>back</span></button>
        </div>
        <div class="step" v-if="step === 3" key="email">
          <transition name="fade">
            <div class="error" v-if="$v.email.$error">
              Please enter a valid email
            </div>
          </transition>
          <input
            required
            type="email"
            name="email"
            id="email"
            ref="email"
            placeholder="Your email?"
            @input="delayedTouch($v.email, 2000)"
            v-model="email">
          <button type="submit" 
            class="btn"
            :disabled="$v.email.$invalid">Submit!</button>
          <button class="btn-prev" @click.prevent="step = 2"><span>back</span></button>
        </div>
      </transition>
    </form>
    <div v-else>
      <img :src="responseGif" alt="contact gif" style="max-width: 500px">
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data (){
    return {
      message: '',
      name: '',
      email: '',
      step: 1,
      showMeLove: false
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(15),
      maxLength: maxLength(276)
    },
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    email: {
      required,
      email
    }
  },
  created () {
    this.$_touchMap = new WeakMap()
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
        this.step = 4
        console.log('good', rep)
      })
      .catch(err => {
        this.step = 5
        console.log('ugly', err)
      })
    },
    resizeTextarea () {
      const target = this.$refs.message
      target.style.height = 'auto';
      target.style.height = (target.scrollHeight) + 'px';
      this.delayedTouch(this.$v.message)
    },
    delayedTouch($v, delay = 1000) {
      $v.$reset()
      if (this.$_touchMap.has($v)) {
        clearTimeout(this.$_touchMap.get($v))
      }
      this.$_touchMap.set($v, setTimeout($v.$touch, delay))
    },
    handleMessage () {
      if (this.message === "") {
        this.showMeLove = true
        setTimeout(() => { this.showMeLove = false}, 3000)
      } else {
        this.step = 2
      }
    },
    onEnter() {
      if (this.step === 1) {
        this.resizeTextarea()
        this.$refs.message.focus()
      } else if (this.step === 2) {
        this.$refs.name.focus()
      } else if (this.step === 3) {
        this.$refs.email.focus()
      }
    }
  },
  computed: {
    responseGif() {
      if (this.step < 4) {
        return ''
      }
      return this.step === 4 ? 'https://media.giphy.com/media/YcMs3OGd89Pxu/giphy.gif'
        : 'https://media.giphy.com/media/nLhdSinRtaL2E/giphy.gif'
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
    width: 100%
    transition:height 1s ease
  ::placeholder
    color: rgba($black, .3)

  #contact
    max-width: var(--max-width)
    min-height: 220px
    margin: 3rem auto 2rem
    display: grid
    grid-auto-rows: min-content
    align-content: end
    text-align: center
  form, .step
    display: grid
    justify-items: center
    width: 100%
  .step
    > *.error:first-child
      width: auto
    > *:first-child
      width: 100%

  .btn-prev
    background: none
    border: none
    text-transform: lowercase
    cursor: pointer
    text-align: left
    font-weight: 800
    font-style: italic
    font-size: 13px
    letter-spacing: 2px
    &.btn-prev-dummy
      cursor: initial
      &::before
        content: " "
    &::before
      content: "< "
    span
      text-decoration: underline

  .error
    position: relative
    color: $white
    background: $black
    padding: 0.4rem 0.6rem 0.3rem
    font-size: 11.5px
    letter-spacing: 3px
    margin-bottom: 1rem
    text-transform: uppercase
    &::after
      position: absolute
      content: ""
      width: 0
      height: 0
      bottom: -10px
      right: 22%
      border-left: 10px solid transparent
      border-right: 10px solid transparent
      border-top: 10px solid $black

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fast-fade-enter-active, .fast-fade-leave-active
    transition: opacity .2s
  .fade-enter, .fade-leave-to, .fast-fade-enter, .fast-fade-leave-to
    opacity: 0
</style>

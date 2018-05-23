<template>
  <header>
    <div id="top">
      <nuxt-link to="/"><img class="svg-avocat" src="/images/logo.png" alt="Julie Perrot Logo"></nuxt-link>
      <nav class="desktop">
        <ul>
          <nuxt-link to="/charte" title="Charte" tag="li">Charte</nuxt-link>
          <nuxt-link to="/commissioned" title="Commissioned" tag="li">Commissioned</nuxt-link>
          <nuxt-link to="/escape/escape" title="Escape" tag="li">Escape</nuxt-link>
          <nuxt-link to="/films" title="Films" tag="li">Films</nuxt-link>
          <nuxt-link to="/stills" title="Stills" tag="li">Stills</nuxt-link>
          <nuxt-link to="/stories" title="Stories" tag="li">Stories</nuxt-link>
          <nuxt-link to="/video" title="Video" tag="li">Video</nuxt-link>
        </ul>
      </nav>
      <div class="menu-trigger" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <nav class="mobile" :class="{open: showMenu}">
      <ul>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/charte">Charte</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/commissioned">Commissioned</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/escape/escape">Escape</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/films">Films</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/stills">Stills</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/stories">Stories</nuxt-link>
        <nuxt-link tag="li" v-on:click.native="toggleMenu" to="/video">Video</nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
      document.querySelector('body').style.overflow = this.showMenu ? 'hidden' : ''
    }
  }
}
</script>


<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  header #top
    z-index: 27
    position: fixed
    opacity: 1
    top: 0
    background: $white
    height: 50px
    padding: 5px 15px
    display: grid
    grid-template-columns: auto 1fr
    align-items: center
    justify-items: end
    width: 100vw
    @media #{$small-up}
      opacity: var(--header-opacity)      
    a
      height: 40px
    img
      height: 100%
      width: auto
      justify-self: start
    .menu-trigger
      display: grid
      grid-gap: 3px
      grid-template-columns: 10px 10px
      grid-template-rows: 10px 10px
      cursor: pointer
      @media #{$medium-up}
        display: none
      > div
        height: 8px
        width: 8px
        border: 1px solid $black
        box-shadow: 1px 1px

  nav.mobile
    position: fixed
    height: calc(100vh - 42px)
    width: calc(80vw)
    color: $white
    background: $black
    padding: 42px 30px
    top: 50px
    left: 100%
    font-weight: 100
    font-size: 15px
    text-transform: uppercase
    letter-spacing: 0.5em
    transition: all 0.4s ease-out
    z-index: 27
    li
      margin-bottom: 2em
    &.open
      transform: translateX(-100%)

  nav.desktop
    display: none
    margin-top: 4px
    @media #{$medium-up}
      display: block
    li
      cursor: pointer
      display: inline-block
      font-weight: 300
      font-size: 13px
      letter-spacing: 0.3em
      text-transform: uppercase
      margin-left: 2em
      &:hover, &.nuxt-link-active
        font-weight: 700
        text-decoration: underline
      &::after
        display: block
        content: attr(title)
        font-weight: 700
        height: 0
        overflow: hidden
        visibility: hidden
</style>

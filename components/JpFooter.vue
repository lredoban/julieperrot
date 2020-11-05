<template>
  <footer>
    <div class="main">
      <h3>julie perrot</h3>
      <nav>
        <div>
          <h4>More ...</h4>
          <ul class="doted">
            <li><nuxt-link to="/mom-n-kidz">Mom & kidz</nuxt-link></li>
            <li><nuxt-link to="/wedding">Wedding</nuxt-link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul class="doted">
            <li @click="$emit('toggle-contact')" class="click"> Write me</li>
            <li><a href="https://www.instagram.com/julieperrot/" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="copyright">
      <span>© Juie Perrot tous droits réservés</span>
      <span> - <a href="https://heyoo.fr/" target="_blank">Designed by Anne-Sophie</a> - </span>
      <span><a href="https://lovasoa.fr/" target="_blank">Powered by Lovasoa 🐯</a><nuxt-link to="/charte">💻</nuxt-link></span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'JpFooter'
}
</script>

<style lang="sass" scoped>
  @import '~assets/sass/helpers'

  footer
    margin-top: 3em
    background: $beige
    .main
      padding: 2em 4em
      display: grid
      grid-row-gap: 40px
      @media #{$xsmall-up}
        padding: 2em 6em
      @media #{$small-up}
        padding: 2em 8em
      @media #{$medium-up}
        padding: 4em 4em
        grid-template-columns: auto 1fr
        justify-items: center
        align-items: start
    h3
      text-transform: none
      margin: 0 0 2rem 0
    h4
      margin-top: 0
    ul
      margin-top: 1.5rem
    nav
      width: 100%
      > * + *
        margin-top: 2em
        @media #{$medium-up}
          margin-top: 0
      @media #{$medium-up}
        display: flex
        padding: 0 6em
        justify-content: space-around
      @media #{$large-up}
        padding: 0 12em


    .copyright
      border-top: 1px solid rgba($black, .5)
      text-align: center
      padding: 10px
      font-weight: 100
      display: grid
      grid-template-columns: 1fr
      @media #{$small-up}
        display: block

    .click
      cursor: pointer
</style>

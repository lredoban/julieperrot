<template>
  <footer>
    <div class="main">
      <h3>julie perrot</h3>
      <div>
        <h4>More ...</h4>
        <ul>
          <li><nuxt-link to="/mariage">Mariage</nuxt-link></li>
          <li><nuxt-link to="/mom-n-kidz">Mom & kidz</nuxt-link></li>
        </ul>
      </div>
      <div>
        <h4>Follow</h4>
        <ul>
          <li><a href="https://www.instagram.com/julieperrot/" target="_blank">Instagram</a></li>
          <li><a href="https://twitter.com/JuliePerrot" target="_blank">Twitter</a></li>
          <li><a href="https://www.facebook.com/julieperrotphotography" target="_blank">Facebook</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>Write me</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      © Juie Perrot tous droits réservés
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
        grid-template-columns: auto 1fr 1fr 1fr
        justify-items: center
        align-items: start
    h3
      text-transform: none
      margin: 0 0 2rem 0
    h4
      margin-top: 0
    ul
      margin-top: 1.5rem
      li
        margin-top: 1rem
        font-weight: 100
        display: grid
        grid-template-columns: auto 1fr
        grid-column-gap: 9px
        align-items: center
        &::before
          content: ''
          height: 8px
          width: 8px
          border-radius: 4px
          background: $black
    .copyright
      border-top: 1px solid rgba($black, .5)
      text-align: center
      padding: 10px
      font-weight: 100
</style>

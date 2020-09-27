<template functional>
  <div id="hero">
    <h1>
      <slot>The h1 title</slot>
    </h1>
    <div class="subtitle">
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  #hero
    position: relative
    margin-top: 50px
    width: 100vw
    h1
      margin: 0
    h1, .subtitle
      margin: 0 7vw
      @media #{$small-up}
        margin: 0 17vw
</style>

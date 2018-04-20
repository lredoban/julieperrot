<template>
  <div id="app">
    <jp-image imgSrc="https://source.unsplash.com/featured/?cat,sport" svgType="levres" svgTop="left" rightGradient="1" bottomGradient="3"></jp-image>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import JpImage from '../../components/JpImage'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome Smile!'
    }
  },
  components: {
    JpImage
  }
}
</script>

<style lang="scss">
  #app {
    max-width: 600px;
    padding-top: 3em;
    margin: 0 auto
  }
</style>

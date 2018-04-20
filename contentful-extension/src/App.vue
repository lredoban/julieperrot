<template>
  <div id="app">
    <jp-image
      v-if="imgSrc"
      :imgSrc="imgSrc"
      :svgType="svgType"
      :svgTop="svgTop"
      :rightGradient="rightGradient"
      :bottomGradient="bottomGradient"/>
  </div>
</template>

<script>
import JpImage from '../../components/JpImage'
//import cfExtension from 'contentful-ui-extensions-sdk'
const cfExtension = require('contentful-ui-extensions-sdk')

export default {
  name: 'app',
  data () {
    return {
      imgSrc: false,
      svgType: false,
      svgTop: false,
      rightGradient: false,
      bottomGradient: false
    }
  },
  components: {
    JpImage
  },
  created () {
    cfExtension.init((api) => {
      console.warn('init')
      const imageLink = api.entry.fields.image
      const imageId = imageLink.getValue().sys.id
      api.space.getAsset(imageId).then((data) => {
        console.warn('yo', data)
        this.imgSrc = data.fields.file['fr-FR'].url + '?w=270'
      })

      const {svgType, svgTop, rightGradient, bottomGradient} = api.field.getValue()
      this.svgType = svgType
      this.svgTop = svgTop
      this.rightGradient = rightGradient
      this.bottomGradient = bottomGradient

      setTimeout(() => api.window.updateHeight(), 2000) //lancer après le chargement de l'image
    })
    // this.svgType = "levres"
    // this.svgTop = "left"
    // this.rightGradient = 5
    // this.bottomGradient = 5
  }
}
</script>

<style lang="scss">
  #app {
    max-width: 270px;
    padding-top: 3em;
    margin: 0 auto
  }
</style>

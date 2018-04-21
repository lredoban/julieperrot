<template>
  <div id="app">
    <jp-image
      v-if="imgSrc"
      :imgSrc="imgSrc"
      :svgType="svgType"
      :svgTop="svgTop"
      :rightGradient="rightGradient"
      :bottomGradient="bottomGradient"
      @load="updateHeight"/>
    <h3 v-else>You must select an image first</h3>
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
      imgSrc: null,
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
    this.$_api = null

    cfExtension.init((api) => {
      console.warn('init')
      this.$_api = api
      const link = api.entry.fields.image

      this.setJpImageSrc(link.getValue())
      link.onValueChanged(this.setJpImageSrc)

      const {svgType, svgTop, rightGradient, bottomGradient} = api.field.getValue()
      this.svgType = svgType
      this.svgTop = svgTop
      this.rightGradient = rightGradient
      this.bottomGradient = bottomGradient
    })
  },
  methods: {
    setJpImageSrc (imageLink) {
      if (!imageLink) {
        this.imgSrc = null
        this.$nextTick(() => {
          this.$_api.window.updateHeight()
        })
        return
      }
      console.warn('image param', imageLink)
      const imageId = imageLink.sys.id
      this.$_api.space.getAsset(imageId).then((data) => {
        console.warn('yo', data)
        this.imgSrc = data.fields.file['fr-FR'].url + '?w=270'
      })
    },
    updateHeight() {
      console.warn('LOADED')
      this.$_api.window.updateHeight()
    }
  }
}
</script>

<style lang="sass">
  body
    overflow: hidden
  #app
    max-width: 270px
    padding-top: 3em
    margin: 0 auto
</style>

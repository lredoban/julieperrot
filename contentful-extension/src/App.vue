<template>
  <div id="app">
    <div id="edit-JpImage" v-if="imgSrc">
      <div class="btn-list">
        <button class="btn btn-small" :class="['svg-' + svgType, svgTop === 'left' ? 'btn-active' : '']" @click="svgTop = 'left'">Left</button>
        <button class="btn btn-small" :class="['svg-' + svgType, svgTop === 'right' ? 'btn-active' : '']" @click="svgTop = 'right'">Right</button>
        <button class="btn btn-small" :class="{'btn-active': svgTop !== 'right' && svgTop !== 'left' }" @click="svgTop = false">X</button>
      </div>
      <div class="gradient-selector">
        <jp-image
          :imgSrc="imgSrc"
          :svgType="svgType"
          :svgTop="svgTop"
          :rightGradient="rightGradient"
          :bottomGradient="bottomGradient"
          @load="updateHeight"/>
        <ul class="gradient-selector-right">
          <li class="gradient1" @click="rightGradient = 1" aria-hidden="true"></li>
          <li class="gradient2" @click="rightGradient = 2" aria-hidden="true"></li>
          <li class="gradient3" @click="rightGradient = 3" aria-hidden="true"></li>
          <li class="gradient4" @click="rightGradient = 4" aria-hidden="true"></li>
          <li class="gradient5" @click="rightGradient = 5" aria-hidden="true"></li>
          <li class="gradient6" @click="rightGradient = 6" aria-hidden="true"></li>
          <li class="gradient7" @click="rightGradient = 7" aria-hidden="true"></li>
          <li class="gradient8" @click="rightGradient = 8" aria-hidden="true"></li>
          <li class="gradient9" @click="rightGradient = 9" aria-hidden="true"></li>
          <li class="gradient10" @click="rightGradient = 10" aria-hidden="true"></li>
          <li class="gradientNull" @click="rightGradient = null" aria-hidden="true"></li>
        </ul>
        <ul class="gradient-selector-bottom">
          <li class="gradient1" @click="bottomGradient = 1" aria-hidden="true"></li>
          <li class="gradient2" @click="bottomGradient = 2" aria-hidden="true"></li>
          <li class="gradient3" @click="bottomGradient = 3" aria-hidden="true"></li>
          <li class="gradient4" @click="bottomGradient = 4" aria-hidden="true"></li>
          <li class="gradient5" @click="bottomGradient = 5" aria-hidden="true"></li>
          <li class="gradient6" @click="bottomGradient = 6" aria-hidden="true"></li>
          <li class="gradient7" @click="bottomGradient = 7" aria-hidden="true"></li>
          <li class="gradient8" @click="bottomGradient = 8" aria-hidden="true"></li>
          <li class="gradient9" @click="bottomGradient = 9" aria-hidden="true"></li>
          <li class="gradient10" @click="bottomGradient = 10" aria-hidden="true"></li>
          <li class="gradientNull" @click="bottomGradient = null" aria-hidden="true"></li>
        </ul>
      </div>
    </div>
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
      imgSrc: 'https://source.unsplash.com/featured/270',
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
  @import "../../assets/sass/style"

  body
    overflow: hidden
    height: auto
  #app
    max-width: 600px
    padding-top: 3em
    margin: 0 auto

  .gradient-selector
    display: grid
    grid-row-gap: 36px
    grid-template-columns: 1fr 68px
    margin: 0 auto

  ul.gradient-selector-right
    display: grid
    justify-items: end
    --gradient-angle: to top
    li
      cursor: crosshair
      width: 20px
      height: 100%
  ul.gradient-selector-bottom
    grid-column: span 2
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr))
    li
      cursor: crosshair
      height: 20px
      width: 100%
  .gradientNull
    background-color: #fcfcfc
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23a7a7a7' fill-opacity='0.27' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")
</style>

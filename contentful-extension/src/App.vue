<template>
  <div id="app">
    <button v-if="imgSrc" class="btn btn-small" @click="showtime">{{ show ? 'Hide' : 'Show'}} Image features</button>
    <div id="edit-JpImage" v-if="imgSrc" :class="{show}">
      <div class="svgContainer">
        <category-svg v-for="svgItem in $_svgList" :type="svgItem" :changeClass="changeSvgHover" :currentSvg="svgType"/>
        <div :type="false" :class="{active: !svgType, gradientNull: true}" @click="svgType = false">
          <img src="/images/svg/tshirt.svg" alt="dummy">
        </div>
      </div>
      <div>
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
    </div>
    <h3 v-else>You must select an image first</h3>
  </div>
</template>

<script>
import JpImage from '../../components/JpImage'
import CategorySvg from '../../components/CategorySvg'
const cfExtension = require('contentful-ui-extensions-sdk')

const svgList = [
  'appareil',
  'avion',
  'avocat',
  'bagues',
  'balle',
  'ballon',
  'ballon_1',
  'berceau',
  'biberon',
  'bobine',
  'boussole',
  'bouton',
  'branche',
  'bulles',
  'cactus',
  'camera',
  'chaussette',
  'chaussure',
  'coco',
  'coquillage',
  'croissant',
  'diamant',
  'dodo',
  'donut',
  'drink',
  'epingle',
  'etoiles',
  'feather',
  'gateau',
  'gobelet',
  'guirelande',
  'hochet',
  'levres',
  'lune',
  'lunettes',
  'main',
  'mascara',
  'menu',
  'miroir',
  'movie',
  'nuage',
  'oeil',
  'ouverture',
  'parfum',
  'pinceau',
  'poudre',
  'rougealevre',
  'sac',
  'scooter',
  'slop',
  'telephone',
  'tetine',
  'top',
  'tshirt'
]

export default {
  name: 'app',
  data () {
    return {
      imgSrc: 'https://source.unsplash.com/featured/270',
      svgType: false,
      svgTop: false,
      rightGradient: false,
      bottomGradient: false,
      show: false
    }
  },
  components: {
    JpImage,
    CategorySvg
  },
  created () {
    this.$_api = null
    this.$_svgList = svgList

    cfExtension.init((api) => {
      this.$_api = api
      const link = api.entry.fields.image

      this.setJpImageSrc(link.getValue())
      link.onValueChanged(this.setJpImageSrc)

      const fieldValue = api.field.getValue()
      if (fieldValue) {
        const {svgType, svgTop, rightGradient, bottomGradient} = fieldValue
        this.svgType = svgType
        this.svgTop = svgTop
        this.rightGradient = rightGradient
        this.bottomGradient = bottomGradient
      }
    })
  },
  methods: {
    setJpImageSrc (imageLink) {
      if (!imageLink) {
        this.imgSrc = null
        this.$nextTick(() => {
          if (this.$_api){
            this.$_api.window.updateHeight()
          }
        })
        return
      }
      const imageId = imageLink.sys.id
      this.$_api.space.getAsset(imageId).then((data) => {
        this.imgSrc = data.fields.file['fr-FR'].url + '?w=270'
      })
    },
    updateHeight() {
      if (this.$_api) {
        this.$_api.window.updateHeight()
      }
    },
    setFeatures() {
      if (this.$_api) {
        this.$_api.field.setValue({
          svgType: this.svgType,
          svgTop: this.svgTop,
          rightGradient: this.rightGradient,
          bottomGradient: this.bottomGradient 
        })
      }
    },
    changeSvgHover(type) {
      this.svgType = type
    },
    showtime() {
      this.show = !this.show
      this.$nextTick(() => {
        if (this.$_api){
          this.$_api.window.updateHeight()
        }
      })
    }
  },
  watch: {
    svgType () { this.setFeatures() },
    svgTop () { this.setFeatures() },
    rightGradient () { this.setFeatures() },
    bottomGradient () { this.setFeatures() }
  }
}
</script>

<style lang="sass">
  @import "../../assets/sass/style"
  @import "../assets/sass/helpers"

  body
    overflow: hidden
    height: auto
  #app
    max-width: 1200px
    margin: 0 auto

  #edit-JpImage
    display: grid
    grid-gap: 20px
    grid-template-columns: 1fr 1fr
    height: auto
    max-height: 0
    overflow: hidden
    &.show
      max-height: 1200px

  .svgContainer
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(42px, 1fr))
    grid-auto-rows: min-content
    align-content: center
    div
      line-height: 0
      img
        opacity: 0
      &.active
        background-color: $beige

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

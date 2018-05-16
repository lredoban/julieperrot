<template>
  <main>
    <jp-hero :background="{url: '/images/stills.jpg', size: {widht: 1920, height: 704}}">Charte</jp-hero>
    <section class="typo">
      <h2>Typo</h2>
      <hr>
      <div>
        <h3>h1</h3>
        <h1 class="narrow">Last Pro- Jets</h1>
        <h3>h2</h3>
        <h2 class="narrow">Julie Perrot Redobana</h2>
        <h3>h3</h3>
        <h3>Autumn Lights</h3>
        <h3>h4</h3>
        <h4>Mister Lova Lova</h4>
        <h3>Para gra phe</h3>
        <div>
          <p>
            Well, the way they make shows is, they make one show. That show's called a pilot. 
          </p>
          <p>
            Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.
          </p>
        </div>
        <h3>Emph asis</h3>
        <p><em>Photo description</em></p>
      </div>
    </section>
    <section class="colors">
      <h2>Colors</h2>
      <hr>
      <div>
        <h3>Home gradient</h3>
        <div class="gradient-figure">
          <div class="gradientAlpha-1"></div>
          <div class="gradientAlpha"></div>
          <div class="gradientAlpha-2"></div>
        </div>
      </div>
      <div>
        <h3>About gradient</h3>
        <div class="gradient-figure">
          <div class="gradientBeta-1"></div>
          <div class="gradientBeta"></div>
          <div class="gradientBeta-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 1</h3>
        <div class="gradient-figure">
          <div class="gradient1-1"></div>
          <div class="gradient1"></div>
          <div class="gradient1-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 2</h3>
        <div class="gradient-figure">
          <div class="gradient2-1"></div>
          <div class="gradient2"></div>
          <div class="gradient2-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 3</h3>
        <div class="gradient-figure">
          <div class="gradient3-1"></div>
          <div class="gradient3"></div>
          <div class="gradient3-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 4</h3>
        <div class="gradient-figure">
          <div class="gradient4-1"></div>
          <div class="gradient4"></div>
          <div class="gradient4-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 5</h3>
        <div class="gradient-figure">
          <div class="gradient5-1"></div>
          <div class="gradient5"></div>
          <div class="gradient5-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 6</h3>
        <div class="gradient-figure">
          <div class="gradient6-1"></div>
          <div class="gradient6"></div>
          <div class="gradient6-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 7</h3>
        <div class="gradient-figure">
          <div class="gradient7-1"></div>
          <div class="gradient7"></div>
          <div class="gradient7-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 8</h3>
        <div class="gradient-figure">
          <div class="gradient8-1"></div>
          <div class="gradient8"></div>
          <div class="gradient8-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 9</h3>
        <div class="gradient-figure">
          <div class="gradient9-1"></div>
          <div class="gradient9"></div>
          <div class="gradient9-2"></div>
        </div>
      </div>
      <div>
        <h3>Gradient 10</h3>
        <div class="gradient-figure">
          <div class="gradient10-1"></div>
          <div class="gradient10"></div>
          <div class="gradient10-2"></div>
        </div>
      </div>
    </section>
    <section id="buttons">
      <h2>Buttons</h2>
      <hr>
      <div>
        <a href="#buttons" class="btn">View more</a>
        <button class="btn">Real button</button>
        <button class="btn btn-small">Small</button>
        <button class="btn btn-small btn-active">Active</button>
      </div>
    </section>
    <section id="svg-hover">
      <h2>Icons</h2>
      <hr>
      <div class="showroom">
        <button class="btn" :class="'svg-' + svgClass" @click="randomSvgHover">Random hover</button>
        <div class="btn-list">
          <button class="btn btn-small" :class="['svg-' + svgClass, svgTop === 'left' ? 'btn-active' : '']" @click="svgTop = 'left'">Left</button>
          <button class="btn btn-small" :class="['svg-' + svgClass, svgTop === 'right' ? 'btn-active' : '']" @click="svgTop = 'right'">Right</button>
          <button class="btn btn-small" :class="{'btn-active': svgTop !== 'right' && svgTop !== 'left' }" @click="svgTop = false">X</button>
        </div>
        <jp-image class="showroom-img" :svg-type="svgClass" :img-size="{width: 827, height: 1240}" :svg-top="svgTop" img-src="/Audrey.jpg"/>
      </div>
      <h3>Pick an icon</h3>
      <div class="category">
        <div class="category-title">
          <h5>Commissioned</h5><span></span>
        </div>
        <category-svg type="chaussure" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="top" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="sac" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="tshirt" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="rougealevre" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="parfum" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="oeil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="ouverture" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Escape</h5><span></span>
        </div>
        <category-svg type="nuage" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="scooter" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="sac" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="avion" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="chaussure" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="telephone" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="boussole" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="ouverture" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Faces</h5><span></span>
        </div>
        <category-svg type="oeil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="levres" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="poudre" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="lunettes" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="miroir" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="pinceau" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="mascara" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="ouverture" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Mom & Kids</h5><span></span>
        </div>
        <category-svg type="ballon" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="lune" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="biberon" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="chaussette" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="dodo" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="slop" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="tetine" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="berceau" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="hochet" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Stills</h5><span></span>
        </div>
        <category-svg type="etoiles" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="coquillage" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="cactus" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="branche" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="avion" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="feather" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="main" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="avocat" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="ouverture" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Stories</h5><span></span>
        </div>
        <category-svg type="donut" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="oeil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="levres" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="etoiles" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="gobelet" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="avocat" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="croissant" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="lunettes" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="tshirt" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Videos</h5><span></span>
        </div>
        <category-svg type="movie" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="camera" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
      <div class="category">
        <div class="category-title">
          <h5>Mariage</h5><span></span>
        </div>
        <category-svg type="ballon" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="appareil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="guirelande" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="bagues" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="gateau" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="diamant" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="drink" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
        <category-svg type="oeil" :changeClass="changeSvgHover" :currentSvg="svgClass"/>
      </div>
    </section>
    <section id="img-gradient">
      <h2>Image border gradient</h2>
      <hr>
      <div class="gradient-selector">
        <jp-image :svg-type="svgClass" :svg-top="svgTop" img-src="/Audrey.jpg" :img-size="{width: 827, height: 1240}" :right-gradient="rightGradient" :bottom-gradient="bottomGradient"/>
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
        </ul>

      </div>
    </section>
  </main>
</template>

<script>
import JpHero from '~/components/JpHero.vue'
import CategorySvg from '~/components/CategorySvg.vue'
import JpImage from '~/components/JpImage.vue'

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
  data () {
    return {
      svgClass: 'nuage',
      svgTop: 'right',
      rightGradient: 3,
      bottomGradient: 4,
    }
  },
  components: {
    JpHero,
    CategorySvg,
    JpImage
  },
  mounted () {
    const gradients = document.querySelectorAll('.gradient-figure > div')
    Object.keys(gradients).map(key => {
      const rgb = window.getComputedStyle(gradients[key], null).getPropertyValue('background-color')
      gradients[key].setAttribute('data-bg-color', this.hex(rgb))
    })
  },
  methods: {
    randomSvgHover() {
      const randNum =  Math.floor(Math.random() * svgList.length)
      this.svgClass = svgList[randNum]
    },
    changeSvgHover(type) {
      this.svgClass = type
    },
    hex: function (orig){
      let rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i)
      return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig
    }
  },
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  section
    max-width: 1100px
    padding: 0 50px
    width: 100%
    > h2
      line-height: 1
      margin-bottom: 0
      margin-top: 2em

  .colors h3
      margin: 3rem 0 0.7rem

  .gradient-figure
    --grad-height: 30px
    display: grid
    grid-template-columns: var(--grad-height) 1fr var(--grad-height)
    grid-gap: 20px
    @media #{$small-up}
      --grad-height: 50px
      grid-gap: 80px
    > div
      height: var(--grad-height)
      &:nth-child(odd)
        position: relative
        &::before
          content: attr(data-bg-color)
          color: rgba($black, 0.8)
          bottom: -15px
          position: absolute
          font-weight: 600
          font-size: 10px
          text-transform: uppercase
          @media #{$small-up}
            font-weight: 800
            font-size: 11px

  .typo > div
    display: grid
    grid-template-columns: 100px 1fr
    grid-gap: 10px
    align-items: center
    @media #{$small-up}
      grid-template-columns: 140px 1fr
      grid-column-gap: 40px

  #buttons > div
    justify-items: center
    align-items: center
    display: grid
    grid-template-columns: 1fr 1fr

  #svg-hover > div.showroom
    display: grid
    justify-items: center
    img
      max-width: 360px
      display: block
      margin: 0 auto

  .category-title
    display: grid
    grid-template-columns: auto 1fr
    grid-gap: 15px
    align-items: center
    span::after
      content: ""
      display: block
      background: $black
      height: 2px
      width: 100%
    h5
      margin: 5px 0

  .showroom-img
    max-width: 320px
    margin: 0 auto

  #img-gradient .gradient-selector
    max-width: 500px
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

  .btn-list
    margin-bottom: 1em

  hr
    margin-bottom: 2em

  .narrow
    width: 80px
</style>

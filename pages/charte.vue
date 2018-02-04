<template>
  <main>
    <jp-hero bg-url="/images/stills.jpg">Charte</jp-hero>
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
      </div>
    </section>
    <section id="svg-hover">
      <h2>Icons</h2>
      <hr>
      <div class="showroom">
        <button class="btn" :class="svgClass" @click="randomSvgHover">Random hover</button>
        <img src="/Audrey.jpg" alt="Audrey" :class="svgClass">
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
  </main>
</template>

<script>
import JpHero from '~/components/JpHero.vue'
import CategorySvg from '~/components/CategorySvg.vue'

const svgList = [
  'svg-appareil',
  'svg-avion',
  'svg-avocat',
  'svg-bagues',
  'svg-balle',
  'svg-ballon',
  'svg-ballon_1',
  'svg-berceau',
  'svg-biberon',
  'svg-bobine',
  'svg-boussole',
  'svg-bouton',
  'svg-branche',
  'svg-bulles',
  'svg-cactus',
  'svg-camera',
  'svg-chaussette',
  'svg-chaussure',
  'svg-coco',
  'svg-coquillage',
  'svg-croissant',
  'svg-diamant',
  'svg-dodo',
  'svg-donut',
  'svg-drink',
  'svg-epingle',
  'svg-etoiles',
  'svg-feather',
  'svg-gateau',
  'svg-gobelet',
  'svg-guirelande',
  'svg-hochet',
  'svg-levres',
  'svg-lune',
  'svg-lunettes',
  'svg-main',
  'svg-mascara',
  'svg-menu',
  'svg-miroir',
  'svg-movie',
  'svg-nuage',
  'svg-oeil',
  'svg-ouverture',
  'svg-parfum',
  'svg-pinceau',
  'svg-poudre',
  'svg-rougealevre',
  'svg-sac',
  'svg-scooter',
  'svg-slop',
  'svg-telephone',
  'svg-tetine',
  'svg-top',
  'svg-tshirt'
]

export default {
  data () {
    return {
      svgClass: 'svg-nuage'
    }
  },
  components: {
    JpHero,
    CategorySvg
  },
  methods: {
    randomSvgHover() {
      const randNum =  Math.floor(Math.random() * svgList.length)
      this.svgClass = svgList[randNum]
    },
    changeSvgHover(type) {
      this.svgClass = 'svg-' + type
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~assets/sass/helpers"

  main
    padding-top: 0
    margin: 0 auto
    display: grid
    justify-items: center
    section
      max-width: 1100px
      padding: 0 50px
      box-sizing: border-box
      width: 100%
      > h2
        line-height: 1
        margin-bottom: 0
        margin-top: 3em

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
    display: grid
    grid-template-columns: 1fr 1fr

  #svg-hover > div.showroom
    text-align: center
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

  hr
    margin-bottom: 2em

  .narrow
    width: 80px
</style>

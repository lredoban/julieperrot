const fs = require('fs-extra')
const contentful = require('../plugins/contentful.js')

module.exports = function scraper() {
  const writeData = (data) => {
    return new Promise((resolve, reject) => {
      try {
        fs.ensureFileSync('static/data/contentful.json')
        fs.writeJson('static/data/contentful.json', data, resolve(`Write Successful`) )
      } catch (e) {
        console.error(`Write Failed. ${e}`)
        reject(`Write Failed. ${e}`)  
      }
    })
  }

  this.nuxt.hook('build:before', async builder => {
    fs.remove('static/data/contentful.json')
    const scraper = writeData(await contentful.getCMSData())

    return scraper.then(() => {
      console.log('JSON Build Complete!')
    }).catch(err => {
      console.log(console.error(err))
    })
  })
}
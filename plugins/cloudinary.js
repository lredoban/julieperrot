const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'lova',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const getImages = () => {
  let images
  return new Promise(async (yay, nay) => {
    await cloudinary.search
      .expression('folder:julieperrotIG')
      .sort_by('created_at','desc')
      .max_results(11)
      .execute().then(result=> images = result.resources)

    yay(
      images.map(i => {
          const src = i.secure_url.split('https://res.cloudinary.com/lova/image/upload/').join('image:jp-cloudinary/')
          const thumbnail = src.split('image:').join('https://dz11y8g2.twic.pics/') + '?twic=v1/resize=2p'

          return {
            id: i.public_id,
            link: `https://www.instagram.com/p/${i.filename}/`,
            alt: `https://www.instagram.com/p/${i.filename}/`,
            width: i.width,
            height: i.height,
            src,
            thumbnail
          }
        }
      )
    )
  })
}

exports.getImages = getImages

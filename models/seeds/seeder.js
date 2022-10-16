const db = require('../../config/mongoose')
const restaurants = require('../../restaurant.json')
const Resto = require('../restaurant') // 載入 restaurant model

db.once('open', () => {
  Resto.deleteMany({})
    .then(() => {
      for (resto of restaurants.results) {
        Resto.create({
          name: resto.name,
          name_en: resto.name_en,
          category: resto.category,
          image: resto.image,
          location: resto.location,
          phone: resto.phone,
          google_map: resto.google_map,
          rating: resto.rating,
          description: resto.description
        })
      }
    })
    .then(console.log('seeds created successfully'))
    .catch((err) => console.log(err))
})

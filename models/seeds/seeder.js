const mongoose = require('mongoose')
const restaurants = require('../../restaurant.json')
const Resto = require('../restaurant') // 載入 todo model

mongoose.connect(process.env.MONGODB2_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Resto.deleteMany({}).then(() => console.log('clear data'))
  .catch((err) => console.log(err))
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